import React, {useEffect, useRef, useState} from "react"
import {StoreType} from "mst-gql/dist/MSTGQLStore";
import {
  ArgumentNode,
  DocumentNode,
  FieldNode,
  IntValueNode,
  OperationDefinitionNode,
  print,
  SelectionNode
} from "graphql"
import {getEnv} from "mobx-state-tree";
import {SubscriptionClient} from "subscriptions-transport-ws";

// https://github.com/hasura/graphql-engine/issues/2735

export type QueryConfig = {
  // Name if the ID field to have in the selection set
  idField?: string;
  // Name of the field to check for changes
  timestampField?: string;

  // Date value to start checking changes at
  startDate?: string;

  // Name of variable with the date value to start checking changes at
  startDateVariable?: string;
}

enum PrepareTarget {
  Subscription,
  Delta
}

/**
 * Given a query to be used in the subscription this functions modifies it
 * so that:
 * 1. The where condition in the top level is AND-ed with a updatedAt>startDate
 *    condition
 * @param query
 */
function prepareDeltaQuery(
  query: DocumentNode,
  config : QueryConfig = {
    idField:"id",
    timestampField:"updatedAt",
    startDateVariable: "startDate"
  })
{
  return prepareQuery(PrepareTarget.Delta, query, config);
}

/**
 * Given a query to be used in the subscription this functions modifies it
 * so that:
 * 1. It only returns a single item (limit:1)
 * 2. The where condition in the top level is AND-ed with a updatedAt>startDate
 *    condition
 * 3. The selection set is limited to __typename and id
 * @param query
 */
function prepareSubscriptionQuery(
  query: DocumentNode,
  config : QueryConfig = {
    idField:"id",
    timestampField:"updatedAt",
    startDateVariable: "startDate"
  })
{
  return prepareQuery(PrepareTarget.Subscription, query, config);
}

/**
 * Common logic for `prepareSubscriptionQuery` and `prepareDeltaQuery`
 * @param target
 * @param query
 * @param config
 */
function prepareQuery(
  target: PrepareTarget,
  query: DocumentNode,
  config : QueryConfig = {
    idField:"id",
    timestampField:"updatedAt",
    startDateVariable: "startDate"
  })
{
  var queryCopy = JSON.parse(JSON.stringify(query))

  if (queryCopy.definitions[0].kind == "OperationDefinition") {
    const node : OperationDefinitionNode = queryCopy.definitions[0];

    if (target == PrepareTarget.Subscription) {
      (node.operation as any) = "subscription"
    }

    //console.log("node.selectionSet", node.selectionSet.selections[0]);
    if (node.selectionSet.selections[0].kind == "Field") {
      const fieldNode : FieldNode = node.selectionSet.selections[0];
      // Everything in a DocumentNode is readonly by TS types, but we hack it
      // around so that we can update values in the AST directly
      const fieldNodeAny : any = fieldNode
      // If there are no arguments yet, add an empty arra
      if (!fieldNode.arguments) {
        fieldNodeAny.arguments = new Array()
      }
      const argumentNodes : Array<ArgumentNode> = fieldNodeAny.arguments
      let hasLimit : boolean = false;
      let hasWhere : boolean = false;
      for (const arg of argumentNodes) {
        // In case of subscription query target set limit to 1
        if (target == PrepareTarget.Subscription && arg.name.value == "limit") {
          ((arg.value as IntValueNode).value as any) = "1"
          hasLimit = true;
          //console.log("limit node", JSON.stringify(arg, null, 2));
        }
        if (arg.name.value == "where") {
          prepareWhereClause(arg, config)
          hasWhere = true
        }
      }

      // if the query doesn't have any where conditions add a dummy now, which will
      // then be replaced with an actual startDate condition by prepareWhereClause
      if (!hasWhere) {
        const whereWithNullValue : ArgumentNode = {
          kind: 'Argument',
          name: {
            kind: 'Name',
            value: "where"
          },
          value: {
            kind: 'NullValue'
          }
        }
        argumentNodes.push(whereWithNullValue);
        prepareWhereClause(whereWithNullValue, config);
      }

      // Make sure there's a limit:1 in case of subscription query
      if (target == PrepareTarget.Subscription && !hasLimit) {
        const limitEquals1 = {
          kind: 'Argument',
          name: {
            kind: 'Name',
            value: "limit"
          },
          value: {
            kind: 'IntValue',
            value: "1"
          }
        }
        argumentNodes.push(limitEquals1 as any);
      }

      // Result selection set should only contain __typename and id
      if (target == PrepareTarget.Subscription) {
        (fieldNode.selectionSet!.selections as Array<SelectionNode>) = [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "__typename"
            },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: `${config.idField}`
            },
            arguments: [],
            directives: []
          }
        ]
      }

      return queryCopy;

    }
    else {
      throw new Error(`Query is not well formed: queryCopy.definitions[0].selectionSet.selections[0].kind != "Field"`);
    }
  }
  else {
    throw new Error(`Query is not well formed: queryCopy.definitions[0].kind != "OperationDefinition"`);
  }
}

/**
 * Adds a updatedAt>startDate condition to the current where conditions by AND-ing it with current
 * conditions
 * @param where an actual or NullValue ArgumentNode
 * @param config query config
 */
function prepareWhereClause(where: ArgumentNode, config: QueryConfig)
{
  // If startDate specified, than have a static StringValue node,
  // otherwise a Variable node with config.startDateVariable
  console.log("prepareWhereClause config.startDate", config.startDate)
  const greaterThanValue = (config.startDate
    ?
    {
      kind: "StringValue",
      value: config.startDate,
      block: false
    }
    :
    {
      kind: "Variable",
      name: {
        kind: "Name",
        value: `${config.startDateVariable}`
      }
    })

  // The start date expression
  const startDateCond = {
    kind: "ObjectValue",
    fields: [
      {
        kind: "ObjectField",
        name: {
          kind: "Name",
          value: `${config.timestampField}`
        },
        value: {
          kind: "ObjectValue",
          fields: [
            {
              kind: "ObjectField",
              name: {
                kind: "Name",
                value: "_gt"
              },
              value: greaterThanValue
            }
          ]
        }
      }
    ]
  };

  // Start date expression AND-ed with other where conditions
  const ands = {
    kind: "ObjectValue",
    fields: [
      {
        kind: "ObjectField",
        name: {
          kind: "Name",
          value: "_and"
        },
        value: {
          kind: "ListValue",
          values: (where.value.kind != "NullValue" ? [where.value, startDateCond] : [startDateCond])
        }
      }
    ]
  };

  // where.value is readonly, use any cast hack
  (where.value as any) = ands;
  console.log("ands", ands)
}

function getFirstValue(data: any) {
  const keys = Object.keys(data)
  if (keys.length !== 1)
    throw new Error(
      `Expected exactly one response key, got: ${keys.join(", ")}`
    )
  return data[keys[0]]
}

export type SubscriptionParams<T> = {
  store: StoreType;
  query: DocumentNode;
  config?: QueryConfig;
  variables?: {
    startDate: string;
    [k: string]: any;
  };
  onData?: (item: T) => void;
  dependencies?: Array<string>;
}

export function useSubscription<T>(params: SubscriptionParams<T>)
{
  const {store, variables, query, onData,
    config={
      idField:"id",
      timestampField:"updatedAt",
      startDateVariable: "startDate",
    },
    dependencies=[]} = params;

  if (!config.idField) {
    config.idField = "id";
  }
  if (!config.timestampField) {
    config.timestampField = "updatedAt";
  }
  if (!config.startDateVariable) {
    config.startDateVariable = "startDate";
  }

  console.log("config", config);
  // Get the configured WS client from the store
  const {
    gqlWsClient
  }: {
    gqlWsClient: SubscriptionClient
  } = getEnv(store)

  if (!gqlWsClient) {
    throw new Error("No WS client available")
  }

  const subscription = useRef<{unsubscribe?: () => any}>({});
  const lastDate = useRef<{unsubscribe?: () => any}>({});

  useEffect(() => {

    console.log("subscription.current", subscription.current);
    if (subscription.current.unsubscribe) {
      subscription.current.unsubscribe();
      delete (subscription.current.unsubscribe);
    }

    console.log("orig query1", query);
    console.log("orig query1", print(query));
    console.log("subscription query1", print(prepareSubscriptionQuery(query, config)));
    console.log("delta query1", print(prepareDeltaQuery(query, config)));

    const subsQuery = prepareSubscriptionQuery(query, config);

    const sub = gqlWsClient
      .request({
        query: subsQuery,
        variables
      })
      .subscribe({
        next(data) {
          console.log("Got something: ", data)
          if (data.errors) {
            throw new Error(JSON.stringify(data.errors))
          }
          const res = getFirstValue(data.data)
          if (onData) {
            onData(res)
          }
          return res
        }
      })
    subscription.current.unsubscribe = () => sub.unsubscribe()


    // return new Promise((resolve, reject) => {
    //   gqlWsClient
    //     .request({
    //       query,
    //       variables
    //     })
    //     .subscribe({
    //       next(data) {
    //         resolve(data.data)
    //       },
    //       error: reject
    //     })
    // })


    // subscription.current.unsubscribe = store.subscribe<T[]>(
    //   query,
    //   variables,
    //   (res: T[]) => {
    //     console.log("received: ", res);
    //     for (const item of res) {
    //       onData(item);
    //     }
    //   }
    // )
  }, dependencies)

  return subscription;
}

//
// // console.log("query1 hacked", JSON.stringify(query1.definitions[0], null, 2));
//
// console.log("orig query2", print(query2));
// console.log("subscription query2", print(prepareSubscriptionQuery(query2)));
// console.log("deltsa query2", print(prepareDeltaQuery(query2)));

/**
 * 1.
 *
 * @param store an MST-GQL store
 * @param query query to run in the subscription
 * @param variables variables to pass to the subscription including a mandatory startDate parameter
 * @param onData callback called when new data is received via the subscription
 * @param dependencies dependent variables which when change cause the
 */
// function useSubscription2<T>(
//   store: StoreType,
//   query: DocumentNode,
//   variables: {
//     startDate: string;
//     [k: string]: any;
//   },
//   onData?: (item: T) => void,
//   dependencies = [])
// {
//   const subscription = useRef<{unsubscribe?: () => any}>({});
//   const lastDate = useRef<{unsubscribe?: () => any}>({});
//
//   useEffect(() => {
//
//     console.log("subscription.current", subscription.current);
//     if (subscription.current.unsubscribe) {
//       subscription.current.unsubscribe();
//       delete (subscription.current.unsubscribe);
//     }
//
//     subscription.current.unsubscribe = store.subscribe<T[]>(
//       query,
//       variables,
//       (res: T[]) => {
//         console.log("received: ", res);
//         for (const item of res) {
//           onData(item);
//         }
//       }
//     )
//   }, dependencies)
//
//   return subscription;
// }

import React, {useEffect, useRef, useState} from "react"
import {
  ArgumentNode,
  DocumentNode,
  FieldNode,
  IntValueNode,
  OperationDefinitionNode,
  print,
  SelectionNode, VariableDefinitionNode
} from "graphql"
import {SubscriptionClient} from "subscriptions-transport-ws";
import {GraphQLClient} from "graphql-request";
import to from "await-to-js";
import moment from "moment";
import {StoreType} from "mst-gql/dist/MSTGQLStore";
import {getEnv} from "mobx-state-tree";
import gql from "graphql-tag"

// https://github.com/hasura/graphql-engine/issues/2735
// https://github.com/hasura/graphql-engine/issues/3517


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Private API
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  config : QueryConfig
)
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
  config : QueryConfig
)
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
  config : QueryConfig
)
{
  var queryCopy = JSON.parse(JSON.stringify(query))

  if (queryCopy.definitions[0].kind == "OperationDefinition") {
    const node : OperationDefinitionNode = queryCopy.definitions[0];

    if (target == PrepareTarget.Subscription) {
      (node.operation as any) = "subscription"
    }

    (node.variableDefinitions as Array<VariableDefinitionNode>).push(
      {
        kind: "VariableDefinition",
        variable: {
          kind: "Variable",
          name: {
            kind: "Name",
            value: config.startDateVariable
          }
        },
        type: {
          kind: "NamedType",
          name: {
            kind: "Name",
            value: config.timestampFieldType
          }
        },
        "directives": []
      } as any
    )


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
              value: {
                kind: "Variable",
                name: {
                  kind: "Name",
                  value: `${config.startDateVariable}`
                }
              }
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
  //console.log("ands", ands)
}

function getFirstValue(data: any) {
  const keys = Object.keys(data)
  if (keys.length !== 1)
    throw new Error(
      `Expected exactly one response key, got: ${keys.join(", ")}`
    )
  return data[keys[0]]
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Public API
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
      "variableDefinitions": [
        {
          "kind": "VariableDefinition",
          "variable": {
            "kind": "Variable",
            "name": {
              "kind": "Name",
              "value": "someDate"
            }
          },
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "timestamp"
            }
          },
          "directives": []
        }
      ],

 */
export type QueryConfig = {
  // Name if the ID field to have in the selection set
  idField?: string;
  // Name of the field to check for changes
  timestampField?: string;

  // Type of the timestampField
  timestampFieldType?: string;

  // Date value to start checking changes at
  startDate?: string;

  // Name of variable with the date value to start checking changes at
  startDateVariable?: string;
}

export type SubscriptionParams<T> = {
  gqlWsClient: SubscriptionClient;
  gqlHttpClient: GraphQLClient;
  query: DocumentNode | string;
  startDate?: string;
  config?: QueryConfig;
  variables?: {
    [k: string]: any;
  };
  onData?: (item: T) => void;
  debug?: boolean
}

export function useSubscription<T>(params: SubscriptionParams<T>)
{
  const debugLog = (msg: string, obj?: any) =>
  {
    if (params.debug) {
      console.log("-- useSubscription: "+msg, obj);
    }
  }

  debugLog("called", params);

  const {gqlWsClient, gqlHttpClient,  query, variables, onData,
    config={},
    startDate = moment().utc().format()
  } = params;

  // Set default values
  if (!config.idField) {
    config.idField = "id";
  }
  if (!config.timestampField) {
    config.timestampField = "updatedAt";
  }
  if (!config.timestampFieldType) {
    config.timestampFieldType = "timestamp";
  }
  if (!config.startDateVariable) {
    config.startDateVariable = "__startDate";
  }

  const [lastStartDate, setLastStartDate] = useState(startDate)
  const [finished, setFinished] = useState(false)

  // Save a ref to an unsubscribe function which can be called indirectly by the
  // invoker of  useSubscription() to finish subscriptions
  const subscription = useRef<{unsubscribe?: () => any}>({});

  // Make sure config contains the lastStartDate we start from
  config.startDate = lastStartDate;

  debugLog("config:", config);

  if (!gqlWsClient) {
    throw new Error("No WS client available")
  }

  useEffect(() => {

    // console.log("--- useSubscription -- useEffect");

    if (finished) {
      return;
    }

    const queryDoc = typeof query === "string" ? gql(query) : query;
    const subsQuery = prepareSubscriptionQuery(queryDoc, config);

    const varsWithStartDate = Object.assign({}, variables)
    varsWithStartDate[config.startDateVariable!] = config.startDate;

    if (params.debug) {
      debugLog("Subscribe with ", print(subsQuery));
      debugLog("Variables ", varsWithStartDate);
    }
    const sub = gqlWsClient
      .request({
        query: subsQuery,
        variables: varsWithStartDate
      })
      .subscribe({
        next(data) {
          // console.log("Got something: ", data)
          if (data.errors) {
            throw new Error(JSON.stringify(data.errors))
          }
          const res = getFirstValue(data.data)
          if (!res.length) {
            return res;
          }

          // Unsubscribe
          debugLog("Unsubscribe after initial data received");
          sub.unsubscribe()

          // Run delta query for all changed elements since lastStartDate
          const deltaQuery = print(prepareDeltaQuery(queryDoc, config))
          debugLog("Executing delta query: ", deltaQuery)
          gqlHttpClient.request(deltaQuery, varsWithStartDate)
            .then(res => {
              // console.log("Delta result: ", res)
              const list = getFirstValue(res)
              const last = list[list.length - 1]
              if (onData) {
                onData(res)
              }
              // Reset last start date causing unsubscription from current
              debugLog("Reset  lastStartDate: ", last[config.timestampField!])
              setLastStartDate(last[config.timestampField!])
            })
            .catch(err => {
              throw err;
            })
        }
      })

    // Save current sub in ref
    subscription.current = sub;
  }, [lastStartDate, finished])


  // Return info and controls for managing the subscription
  return {
    unsubscribe: () => {
      debugLog("Invoker called unsubscribe()")
      if (!finished && subscription.current.unsubscribe) {
        subscription.current.unsubscribe()
        setFinished(true);
      }
    },
    restart: (startDate?: string) => {
      if (startDate) {
        setLastStartDate(startDate);
      }
      setFinished(false);
    },
    lastStartDate,
    finished,
  };
}

export type SubscriptionParamsWithStore<T> = {
  store: StoreType;
  query: DocumentNode | string;
  startDate?: string;
  config?: QueryConfig;
  variables?: {
    [k: string]: any;
  };
  onData?: (item: T) => void;
  debug?: boolean
}

/**
 * Like useSubscription() but with an MST-GQL store (configured with a WS and HTTP GQL client.
 * The objects received via the subscription is merged in the store and then forwarded to the
 * invoker's onData function
 * @param params
 */
export function useSubscriptionWithStore<T>(params: SubscriptionParamsWithStore<T>)
{
  const debugLog = (msg: string, obj?: any) =>
  {
    if (params.debug) {
      console.log("-- useSubscription: "+msg, obj);
    }
  }

  // Get the configured WS client from the store
  const {
    gqlWsClient,
    gqlHttpClient
  }: {
    gqlWsClient: SubscriptionClient
    gqlHttpClient: GraphQLClient
  } = getEnv(params.store)

  const storeHandler = (data: any) => {
    debugLog("Raw data received: ", data)
    const merged = params.store.merge(getFirstValue(data));
    debugLog("Merged data: ", merged)
    if (params.onData) {
      params.onData(merged)
    }
  }

  const subscriptionInfo = useSubscription({
    gqlWsClient,
    gqlHttpClient,
    query: params.query,
    config: params.config,
    variables: params.variables,
    onData: storeHandler,
    debug: params.debug
  })

  return subscriptionInfo;
}

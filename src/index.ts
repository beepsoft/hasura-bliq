import React, {useEffect, useRef, useState} from "react"
import {StoreType} from "mst-gql/dist/MSTGQLStore";
import {DocumentNode} from "graphql"
import moment = require("moment");

// https://github.com/hasura/graphql-engine/issues/2735

/**
 *
 * @param store an MST-GQL store
 * @param query query to run in the subscription
 * @param variables variables to pass to the subscription including a mandatory startDate parameter
 * @param onData callback called when new data is received via the subscription
 * @param dependencies dependent variables which when change cause the
 */
function useSubscription<T>(
  store: StoreType,
  query: DocumentNode,
  variables: {
    startDate: string;
    [k: string]: any;
  },
  onData?: (item: T) => void,
  dependencies = [])
{
  const subscription = useRef<{unsubscribe?: () => any}>({});
  const lastDate = useRef<{unsubscribe?: () => any}>({});

  useEffect(() => {

    console.log("subscription.current", subscription.current);
    if (subscription.current.unsubscribe) {
      subscription.current.unsubscribe();
      delete (subscription.current.unsubscribe);
    }

    subscription.current.unsubscribe = store.subscribe<T[]>(
      query,
      variables,
      (res: T[]) => {
        console.log("received: ", res);
        for (const item of res) {
          onData(item);
        }
      }
    )
  }, dependencies)

  return subscription;
}

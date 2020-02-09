import React, {useEffect, useState} from 'react'
import {useAppStore} from "./store";
import {observer} from 'mobx-react'
import {useQuery} from './models/reactUtils'
import {getSnapshot} from "mobx-state-tree";
import {useSubscription} from "hasura-hooks";
import gql from 'graphql-tag';
import moment from "moment";
import {
  DocumentNode,
  IntValueNode,
  ObjectFieldNode,
  ObjectValueNode,
  OperationDefinitionNode,
  printSchema, SelectionNode
} from "graphql";
import { print } from 'graphql/language/printer'
import {ArgumentNode, FieldNode} from "graphql/language/ast";



/*
To create  new page:

1. Create a SomePage.tsx functional component

    interface SomePageProps {}

    export const SomePage = observer((props: SomePageProps) => {

        const appStore = useAppStore()

        useEffect(() => {
            let initialSnapshot = appStore.somePage.getInitialSnapshot();
            return () => {
                console.log('SomePage will unmount');
                appStore.somePage.resetStore(initialSnapshot);
            }
        }, [])
    });

The useEffect makes sure the associated store is reset when we move away from page.
Also useAppStore() gives us the MST store anywhere (must be inside an observer()!)


2. Create a matching MST model SomePageModel.ts

    export const SomePageModel = types
        .model('SomePageModel', {
            page: types.optional(types.integer, 1),
            totalPages: types.optional(types.integer, 0),
            objects: types.optional(types.array(types.reference(types.late(() => SomeObjectModel))), []),
            ... other state fields
        })
        .views(self => ({
            get gqlStore(): RootStoreType {
                return getParent<AppStoreType>(self).gqlStore
            },
        }))
        .actions(self => ({
            getInitialSnapshot() {
                return getSnapshot(self)
            },

            resetStore(initialSnapshot: any) {
                console.debug("Resetting '+self.name+' store")
                applySnapshot(self, initialSnapshot) // set store to default
            }

            listSomeObject(paging: Paging) {
                return self.gqlStore.query<{ someObjects: SomeObjectModelType[]}>(gql`...`, paging)
            },

            ... other actions

        }))

Every query, mutation etc, should be implemented as an action of the SomePageModel, see listSomeObject() for an
example. All application logic should be in the store and the view (SomePage.tsx shoudl jsut do what is necessary
to render the view). The view may have local state, but it is better to have all state in the store (SomePageModel.ts).


3. Add the PageModel to the store

//
// AppStore: combination of RouterStore, GqlRootStore, globals and page specific stores
//
const AppStore = types.model('AppStore', {
    routerStore: RouterStore,
    gqlStore: types.late(() => GqlRootStore),
    globals: types.optional(GlobalsModel, {}),
    somePage: types.optional(SomePageModel, {}),
});
...

export const appStore = AppStore.create(
    // Set default from routerModel
    {
        routerStore: {
            router: routerModel,
        },
        gqlStore: {},
        globals: {
            jwt: null,
        },
        somePage: {}
    },
    ...
    });




 */

interface ExamplePageProps {}


const query = gql`
    query findUpdatedMessages {
        message(
            distinct_on: [message]
            limit: 10
        ) {
            __typename
            id
            createdAt
            updatedAt
            message
        }
    }
`


//console.log("query", JSON.stringify(query.definitions, null, 2));
// console.log("quer1", JSON.stringify(query.definitions[0], null, 2));
// console.log("query", JSON.stringify(query1.definitions[0], null, 2));
// console.log("quer", query.definitions[0]);
// console.log("quer1", query1.definitions[0]);







//console.log("query1 hacked", JSON.stringify(query1.definitions[0], null, 2));

export const ExamplePage = observer((props: ExamplePageProps) => {
  const appStore = useAppStore()

  const unsubscribe = useSubscription({
      store: appStore.gqlStore,
      query: query,
      config: {
        startDate: moment.utc().format()
      },
      // variables: {
      //   startDate: moment.utc().format()
      // },
      onData: (data) => {
        console.log("data via subscription", data)
    }
  });

  return (
    <>
      Example
    </>
  );
});

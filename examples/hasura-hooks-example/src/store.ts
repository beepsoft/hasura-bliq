import {RootStore as GqlRootStore} from './models/RootStore'
import {createHttpClient} from 'mst-gql'

// https://www.npmjs.com/package/mst-react-router
import {RouterModel, syncHistoryWithStore} from 'mst-react-router'
import {types, Instance} from 'mobx-state-tree'
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst'
import {asReduxStore, connectReduxDevtools} from 'mst-middlewares'
import {createContext, useContext} from 'react'
import { SubscriptionClient } from "subscriptions-transport-ws"
// import {WorkInstructionListPageModel} from "./pages/WorkInstructionListPage/WorkInstructionListPageModel";
// import {WorkInstructionListPage2Model} from "./pages/WorkInstructionListPage2/WorkInstructionListPage2Model";

//
// RouterStore
//
const routerModel = RouterModel.create();

// Hook up router model to browser history object. Will be passed to Router
export const history = syncHistoryWithStore(require('history').createBrowserHistory(), routerModel);

// Define router store model type
const RouterStore = types
    .model({
        router: RouterModel,
    })
    .actions(self => {
        // Just a dummy to see of how actions get merged. NOTE: we need to somehow "namespace" actions in this case
        function muhaha() {
            console.log('muhaha')
        }

        return {
            muhaha,
        }
    });

const GlobalsModel = types
    .model('GlobalsModel', {
        jwt: types.maybeNull(types.string),
    })
    .views(self => ({}))
    .actions(self => ({
        setJwt(jwt: string) {
            self.jwt = jwt
        },
    }));

//
// AppStore: combination of RouterStore, GqlRootStore, globals and page specific stores
//
const AppStore = types.model('AppStore', {
    routerStore: RouterStore,
    gqlStore: types.late(() => GqlRootStore),
    globals: types.optional(GlobalsModel, {}),
    // workInstructionListPage: types.optional(WorkInstructionListPageModel, {}),
    // workInstructionListPage2: types.optional(WorkInstructionListPage2Model, {}),
});

export interface AppStoreType extends Instance<typeof AppStore.Type> {}

//
//  Main appStore root of all stores.
//
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
        // workInstructionListPage: {}
    },
    // Configure RootStore
    {
        gqlHttpClient: createHttpClient('http://localhost:6001/v1/graphql', {
            headers: {
                'X-Hasura-Admin-Secret': 'hasura-hooks',
            },
        }),
        gqlWsClient: new SubscriptionClient("ws://localhost:6001/v1/graphql", {
            reconnect: true,
            connectionParams: {
                headers: {
                    "X-Hasura-Admin-Secret": 'hasura-hooks'
                }
            }

        })
    });

//
// Various debugging techniques
//
declare global {
    interface Window {
        rootStore: typeof appStore
    }
}
// 1. Make rootStore available globally
window.rootStore = appStore;

// 2. Use the mobx statedevtool
// https://github.com/mobxjs/mobx-devtools
makeInspectable(appStore);

// 3. Use the redux devtools. Timetravel and everything
// https://github.com/mobxjs/mobx-state-tree/blob/master/packages/mst-example-redux-todomvc/src/index.js#L21
const reduxStore = asReduxStore(appStore);
connectReduxDevtools(require('remotedev'), appStore);

// We set appStore as the defaultValue in the context, so AppStoreContext.Provider won't actually
// need to set anything, but we still do, just in case ...
// Setting appStore here also helps with typing of AppStoreContext.
// Alternatively we could have:
// export const AppStoreContext = createContext(<typeof appStore>{});
export const AppStoreContext = createContext(appStore);

// Hook to access the appStore anywhere
export function useAppStore() {
    const store = useContext(AppStoreContext);
    if (!store) {
        throw new Error('useAppStore() can only be used inside the AppStoreContext provider')
    }
    return store
}

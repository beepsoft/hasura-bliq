import { DocumentNode } from "graphql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GraphQLClient } from "graphql-request";
import { StoreType } from "mst-gql/dist/MSTGQLStore";
export declare type QueryConfig = {
    idField?: string;
    timestampField?: string;
    timestampFieldType?: string;
    startDate?: string;
    startDateVariable?: string;
};
export declare type LiveQueryParams<T> = {
    gqlWsClient: SubscriptionClient;
    gqlHttpClient: GraphQLClient;
    query: DocumentNode | string;
    startDate?: string;
    config?: QueryConfig;
    variables?: {
        [k: string]: any;
    };
    onData?: (item: T) => void;
    debug?: boolean;
};
export declare function useLiveQuery<T>(params: LiveQueryParams<T>): {
    unsubscribe: () => void;
    restart: (startDate?: string | undefined) => void;
    lastStartDate: string;
    finished: boolean;
};
export declare type LiveQueryParamsWithStore<T> = {
    store: StoreType;
    query: DocumentNode | string;
    startDate?: string;
    config?: QueryConfig;
    variables?: {
        [k: string]: any;
    };
    onData?: (item: T) => void;
    debug?: boolean;
};
/**
 * Like useLiveQuery() but with an MST-GQL store (configured with a WS and HTTP GQL client.
 * The objects received via the subscription is merged in the store and then forwarded to the
 * invoker's onData function
 * @param params
 */
export declare function useLiveQueryWithStore<T>(params: LiveQueryParamsWithStore<T>): {
    unsubscribe: () => void;
    restart: (startDate?: string | undefined) => void;
    lastStartDate: string;
    finished: boolean;
};

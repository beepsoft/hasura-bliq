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
export declare type SubscriptionParams<T> = {
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
export declare function useSubscription<T>(params: SubscriptionParams<T>): {
    unsubscribe: () => void;
    restart: (startDate?: string | undefined) => void;
    lastStartDate: string;
    finished: boolean;
};
export declare type SubscriptionParamsWithStore<T> = {
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
export declare function useSubscriptionWithStore<T>(params: SubscriptionParamsWithStore<T>): {
    unsubscribe: () => void;
    restart: (startDate?: string | undefined) => void;
    lastStartDate: string;
    finished: boolean;
};

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageAggregate, MessageAggregateModel } from "./MessageAggregateModel"
import { MessageAggregateModelSelector } from "./MessageAggregateModel.base"
import { Message, MessageModel } from "./MessageModel"
import { MessageModelSelector } from "./MessageModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  message: IObservableArray<Message>;
  message_by_pk: Message;
}

/**
 * SubscriptionRootBase
 * auto generated base class for the model SubscriptionRootModel.
 */
export const SubscriptionRootModelBase = withTypedRefs<Refs>()(ModelBase
  .named('SubscriptionRoot')
  .props({
    __typename: types.optional(types.literal("subscription_root"), "subscription_root"),
    message: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => MessageModel)))),
    message_aggregate: types.union(types.undefined, types.late((): any => MessageAggregateModel)),
    message_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => MessageModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class SubscriptionRootModelSelector extends QueryBuilder {
  message(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__child(`message`, MessageModelSelector, builder) }
  message_aggregate(builder?: string | MessageAggregateModelSelector | ((selector: MessageAggregateModelSelector) => MessageAggregateModelSelector)) { return this.__child(`message_aggregate`, MessageAggregateModelSelector, builder) }
  message_by_pk(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__child(`message_by_pk`, MessageModelSelector, builder) }
}
export function selectFromSubscriptionRoot() {
  return new SubscriptionRootModelSelector()
}

export const subscriptionRootModelPrimitives = selectFromSubscriptionRoot()

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageAggregateFields, MessageAggregateFieldsModel } from "./MessageAggregateFieldsModel"
import { MessageAggregateFieldsModelSelector } from "./MessageAggregateFieldsModel.base"
import { Message, MessageModel } from "./MessageModel"
import { MessageModelSelector } from "./MessageModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<Message>;
}

/**
 * MessageAggregateBase
 * auto generated base class for the model MessageAggregateModel.
 */
export const MessageAggregateModelBase = withTypedRefs<Refs>()(ModelBase
  .named('MessageAggregate')
  .props({
    __typename: types.optional(types.literal("message_aggregate"), "message_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => MessageAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => MessageModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class MessageAggregateModelSelector extends QueryBuilder {
  aggregate(builder?: string | MessageAggregateFieldsModelSelector | ((selector: MessageAggregateFieldsModelSelector) => MessageAggregateFieldsModelSelector)) { return this.__child(`aggregate`, MessageAggregateFieldsModelSelector, builder) }
  nodes(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__child(`nodes`, MessageModelSelector, builder) }
}
export function selectFromMessageAggregate() {
  return new MessageAggregateModelSelector()
}

export const messageAggregateModelPrimitives = selectFromMessageAggregate()

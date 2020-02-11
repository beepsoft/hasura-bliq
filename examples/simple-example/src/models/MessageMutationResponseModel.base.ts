/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { Message, MessageModel } from "./MessageModel"
import { MessageModelSelector } from "./MessageModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  returning: IObservableArray<Message>;
}

/**
 * MessageMutationResponseBase
 * auto generated base class for the model MessageMutationResponseModel.
 */
export const MessageMutationResponseModelBase = withTypedRefs<Refs>()(ModelBase
  .named('MessageMutationResponse')
  .props({
    __typename: types.optional(types.literal("message_mutation_response"), "message_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => MessageModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class MessageMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__child(`returning`, MessageModelSelector, builder) }
}
export function selectFromMessageMutationResponse() {
  return new MessageMutationResponseModelSelector()
}

export const messageMutationResponseModelPrimitives = selectFromMessageMutationResponse().affected_rows

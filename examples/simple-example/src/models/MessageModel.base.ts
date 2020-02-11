/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageBase
 * auto generated base class for the model MessageModel.
 */
export const MessageModelBase = ModelBase
  .named('Message')
  .props({
    __typename: types.optional(types.literal("message"), "message"),
    createdAt: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    message: types.union(types.undefined, types.string),
    updatedAt: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get id() { return this.__attr(`id`) }
  get message() { return this.__attr(`message`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
}
export function selectFromMessage() {
  return new MessageModelSelector()
}

export const messageModelPrimitives = selectFromMessage().createdAt.message.updatedAt

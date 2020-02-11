/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageMinFieldsBase
 * auto generated base class for the model MessageMinFieldsModel.
 */
export const MessageMinFieldsModelBase = ModelBase
  .named('MessageMinFields')
  .props({
    __typename: types.optional(types.literal("message_min_fields"), "message_min_fields"),
    id: types.union(types.undefined, types.null, types.integer),
    message: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageMinFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get message() { return this.__attr(`message`) }
}
export function selectFromMessageMinFields() {
  return new MessageMinFieldsModelSelector()
}

export const messageMinFieldsModelPrimitives = selectFromMessageMinFields().message

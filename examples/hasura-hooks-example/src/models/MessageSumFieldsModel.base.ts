/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageSumFieldsBase
 * auto generated base class for the model MessageSumFieldsModel.
 */
export const MessageSumFieldsModelBase = ModelBase
  .named('MessageSumFields')
  .props({
    __typename: types.optional(types.literal("message_sum_fields"), "message_sum_fields"),
    id: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageSumFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageSumFields() {
  return new MessageSumFieldsModelSelector()
}

export const messageSumFieldsModelPrimitives = selectFromMessageSumFields()

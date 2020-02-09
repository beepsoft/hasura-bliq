/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageStddevPopFieldsBase
 * auto generated base class for the model MessageStddevPopFieldsModel.
 */
export const MessageStddevPopFieldsModelBase = ModelBase
  .named('MessageStddevPopFields')
  .props({
    __typename: types.optional(types.literal("message_stddev_pop_fields"), "message_stddev_pop_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageStddevPopFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageStddevPopFields() {
  return new MessageStddevPopFieldsModelSelector()
}

export const messageStddevPopFieldsModelPrimitives = selectFromMessageStddevPopFields()

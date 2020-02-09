/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageStddevFieldsBase
 * auto generated base class for the model MessageStddevFieldsModel.
 */
export const MessageStddevFieldsModelBase = ModelBase
  .named('MessageStddevFields')
  .props({
    __typename: types.optional(types.literal("message_stddev_fields"), "message_stddev_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageStddevFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageStddevFields() {
  return new MessageStddevFieldsModelSelector()
}

export const messageStddevFieldsModelPrimitives = selectFromMessageStddevFields()

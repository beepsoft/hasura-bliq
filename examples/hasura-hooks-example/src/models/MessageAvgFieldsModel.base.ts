/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageAvgFieldsBase
 * auto generated base class for the model MessageAvgFieldsModel.
 */
export const MessageAvgFieldsModelBase = ModelBase
  .named('MessageAvgFields')
  .props({
    __typename: types.optional(types.literal("message_avg_fields"), "message_avg_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageAvgFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageAvgFields() {
  return new MessageAvgFieldsModelSelector()
}

export const messageAvgFieldsModelPrimitives = selectFromMessageAvgFields()

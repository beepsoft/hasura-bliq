/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageVarianceFieldsBase
 * auto generated base class for the model MessageVarianceFieldsModel.
 */
export const MessageVarianceFieldsModelBase = ModelBase
  .named('MessageVarianceFields')
  .props({
    __typename: types.optional(types.literal("message_variance_fields"), "message_variance_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageVarianceFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageVarianceFields() {
  return new MessageVarianceFieldsModelSelector()
}

export const messageVarianceFieldsModelPrimitives = selectFromMessageVarianceFields()

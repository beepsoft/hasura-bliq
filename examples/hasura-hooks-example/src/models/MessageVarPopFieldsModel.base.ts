/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageVarPopFieldsBase
 * auto generated base class for the model MessageVarPopFieldsModel.
 */
export const MessageVarPopFieldsModelBase = ModelBase
  .named('MessageVarPopFields')
  .props({
    __typename: types.optional(types.literal("message_var_pop_fields"), "message_var_pop_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageVarPopFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageVarPopFields() {
  return new MessageVarPopFieldsModelSelector()
}

export const messageVarPopFieldsModelPrimitives = selectFromMessageVarPopFields()

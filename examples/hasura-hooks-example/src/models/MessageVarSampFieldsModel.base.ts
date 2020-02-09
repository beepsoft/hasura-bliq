/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageVarSampFieldsBase
 * auto generated base class for the model MessageVarSampFieldsModel.
 */
export const MessageVarSampFieldsModelBase = ModelBase
  .named('MessageVarSampFields')
  .props({
    __typename: types.optional(types.literal("message_var_samp_fields"), "message_var_samp_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageVarSampFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageVarSampFields() {
  return new MessageVarSampFieldsModelSelector()
}

export const messageVarSampFieldsModelPrimitives = selectFromMessageVarSampFields()

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MessageStddevSampFieldsBase
 * auto generated base class for the model MessageStddevSampFieldsModel.
 */
export const MessageStddevSampFieldsModelBase = ModelBase
  .named('MessageStddevSampFields')
  .props({
    __typename: types.optional(types.literal("message_stddev_samp_fields"), "message_stddev_samp_fields"),
    id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageStddevSampFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
}
export function selectFromMessageStddevSampFields() {
  return new MessageStddevSampFieldsModelSelector()
}

export const messageStddevSampFieldsModelPrimitives = selectFromMessageStddevSampFields()

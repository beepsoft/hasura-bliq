/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageAvgFields, MessageAvgFieldsModel } from "./MessageAvgFieldsModel"
import { MessageAvgFieldsModelSelector } from "./MessageAvgFieldsModel.base"
import { MessageMaxFields, MessageMaxFieldsModel } from "./MessageMaxFieldsModel"
import { MessageMaxFieldsModelSelector } from "./MessageMaxFieldsModel.base"
import { MessageMinFields, MessageMinFieldsModel } from "./MessageMinFieldsModel"
import { MessageMinFieldsModelSelector } from "./MessageMinFieldsModel.base"
import { MessageStddevFields, MessageStddevFieldsModel } from "./MessageStddevFieldsModel"
import { MessageStddevFieldsModelSelector } from "./MessageStddevFieldsModel.base"
import { MessageStddevPopFields, MessageStddevPopFieldsModel } from "./MessageStddevPopFieldsModel"
import { MessageStddevPopFieldsModelSelector } from "./MessageStddevPopFieldsModel.base"
import { MessageStddevSampFields, MessageStddevSampFieldsModel } from "./MessageStddevSampFieldsModel"
import { MessageStddevSampFieldsModelSelector } from "./MessageStddevSampFieldsModel.base"
import { MessageSumFields, MessageSumFieldsModel } from "./MessageSumFieldsModel"
import { MessageSumFieldsModelSelector } from "./MessageSumFieldsModel.base"
import { MessageVarPopFields, MessageVarPopFieldsModel } from "./MessageVarPopFieldsModel"
import { MessageVarPopFieldsModelSelector } from "./MessageVarPopFieldsModel.base"
import { MessageVarSampFields, MessageVarSampFieldsModel } from "./MessageVarSampFieldsModel"
import { MessageVarSampFieldsModelSelector } from "./MessageVarSampFieldsModel.base"
import { MessageVarianceFields, MessageVarianceFieldsModel } from "./MessageVarianceFieldsModel"
import { MessageVarianceFieldsModelSelector } from "./MessageVarianceFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * MessageAggregateFieldsBase
 * auto generated base class for the model MessageAggregateFieldsModel.
 */
export const MessageAggregateFieldsModelBase = ModelBase
  .named('MessageAggregateFields')
  .props({
    __typename: types.optional(types.literal("message_aggregate_fields"), "message_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late((): any => MessageAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => MessageMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => MessageMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late((): any => MessageStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late((): any => MessageStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late((): any => MessageStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late((): any => MessageSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late((): any => MessageVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late((): any => MessageVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late((): any => MessageVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder?: string | MessageAvgFieldsModelSelector | ((selector: MessageAvgFieldsModelSelector) => MessageAvgFieldsModelSelector)) { return this.__child(`avg`, MessageAvgFieldsModelSelector, builder) }
  max(builder?: string | MessageMaxFieldsModelSelector | ((selector: MessageMaxFieldsModelSelector) => MessageMaxFieldsModelSelector)) { return this.__child(`max`, MessageMaxFieldsModelSelector, builder) }
  min(builder?: string | MessageMinFieldsModelSelector | ((selector: MessageMinFieldsModelSelector) => MessageMinFieldsModelSelector)) { return this.__child(`min`, MessageMinFieldsModelSelector, builder) }
  stddev(builder?: string | MessageStddevFieldsModelSelector | ((selector: MessageStddevFieldsModelSelector) => MessageStddevFieldsModelSelector)) { return this.__child(`stddev`, MessageStddevFieldsModelSelector, builder) }
  stddev_pop(builder?: string | MessageStddevPopFieldsModelSelector | ((selector: MessageStddevPopFieldsModelSelector) => MessageStddevPopFieldsModelSelector)) { return this.__child(`stddev_pop`, MessageStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder?: string | MessageStddevSampFieldsModelSelector | ((selector: MessageStddevSampFieldsModelSelector) => MessageStddevSampFieldsModelSelector)) { return this.__child(`stddev_samp`, MessageStddevSampFieldsModelSelector, builder) }
  sum(builder?: string | MessageSumFieldsModelSelector | ((selector: MessageSumFieldsModelSelector) => MessageSumFieldsModelSelector)) { return this.__child(`sum`, MessageSumFieldsModelSelector, builder) }
  var_pop(builder?: string | MessageVarPopFieldsModelSelector | ((selector: MessageVarPopFieldsModelSelector) => MessageVarPopFieldsModelSelector)) { return this.__child(`var_pop`, MessageVarPopFieldsModelSelector, builder) }
  var_samp(builder?: string | MessageVarSampFieldsModelSelector | ((selector: MessageVarSampFieldsModelSelector) => MessageVarSampFieldsModelSelector)) { return this.__child(`var_samp`, MessageVarSampFieldsModelSelector, builder) }
  variance(builder?: string | MessageVarianceFieldsModelSelector | ((selector: MessageVarianceFieldsModelSelector) => MessageVarianceFieldsModelSelector)) { return this.__child(`variance`, MessageVarianceFieldsModelSelector, builder) }
}
export function selectFromMessageAggregateFields() {
  return new MessageAggregateFieldsModelSelector()
}

export const messageAggregateFieldsModelPrimitives = selectFromMessageAggregateFields().count

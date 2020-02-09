/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { QueryRootModel, QueryRoot } from "./QueryRootModel"
import { queryRootModelPrimitives, QueryRootModelSelector } from "./QueryRootModel.base"
import { MessageModel, Message } from "./MessageModel"
import { messageModelPrimitives, MessageModelSelector } from "./MessageModel.base"
import { MessageAggregateModel, MessageAggregate } from "./MessageAggregateModel"
import { messageAggregateModelPrimitives, MessageAggregateModelSelector } from "./MessageAggregateModel.base"
import { MessageAggregateFieldsModel, MessageAggregateFields } from "./MessageAggregateFieldsModel"
import { messageAggregateFieldsModelPrimitives, MessageAggregateFieldsModelSelector } from "./MessageAggregateFieldsModel.base"
import { MessageAvgFieldsModel, MessageAvgFields } from "./MessageAvgFieldsModel"
import { messageAvgFieldsModelPrimitives, MessageAvgFieldsModelSelector } from "./MessageAvgFieldsModel.base"
import { MessageMaxFieldsModel, MessageMaxFields } from "./MessageMaxFieldsModel"
import { messageMaxFieldsModelPrimitives, MessageMaxFieldsModelSelector } from "./MessageMaxFieldsModel.base"
import { MessageMinFieldsModel, MessageMinFields } from "./MessageMinFieldsModel"
import { messageMinFieldsModelPrimitives, MessageMinFieldsModelSelector } from "./MessageMinFieldsModel.base"
import { MessageStddevFieldsModel, MessageStddevFields } from "./MessageStddevFieldsModel"
import { messageStddevFieldsModelPrimitives, MessageStddevFieldsModelSelector } from "./MessageStddevFieldsModel.base"
import { MessageStddevPopFieldsModel, MessageStddevPopFields } from "./MessageStddevPopFieldsModel"
import { messageStddevPopFieldsModelPrimitives, MessageStddevPopFieldsModelSelector } from "./MessageStddevPopFieldsModel.base"
import { MessageStddevSampFieldsModel, MessageStddevSampFields } from "./MessageStddevSampFieldsModel"
import { messageStddevSampFieldsModelPrimitives, MessageStddevSampFieldsModelSelector } from "./MessageStddevSampFieldsModel.base"
import { MessageSumFieldsModel, MessageSumFields } from "./MessageSumFieldsModel"
import { messageSumFieldsModelPrimitives, MessageSumFieldsModelSelector } from "./MessageSumFieldsModel.base"
import { MessageVarPopFieldsModel, MessageVarPopFields } from "./MessageVarPopFieldsModel"
import { messageVarPopFieldsModelPrimitives, MessageVarPopFieldsModelSelector } from "./MessageVarPopFieldsModel.base"
import { MessageVarSampFieldsModel, MessageVarSampFields } from "./MessageVarSampFieldsModel"
import { messageVarSampFieldsModelPrimitives, MessageVarSampFieldsModelSelector } from "./MessageVarSampFieldsModel.base"
import { MessageVarianceFieldsModel, MessageVarianceFields } from "./MessageVarianceFieldsModel"
import { messageVarianceFieldsModelPrimitives, MessageVarianceFieldsModelSelector } from "./MessageVarianceFieldsModel.base"
import { MutationRootModel, MutationRoot } from "./MutationRootModel"
import { mutationRootModelPrimitives, MutationRootModelSelector } from "./MutationRootModel.base"
import { MessageMutationResponseModel, MessageMutationResponse } from "./MessageMutationResponseModel"
import { messageMutationResponseModelPrimitives, MessageMutationResponseModelSelector } from "./MessageMutationResponseModel.base"
import { SubscriptionRootModel, SubscriptionRoot } from "./SubscriptionRootModel"
import { subscriptionRootModelPrimitives, SubscriptionRootModelSelector } from "./SubscriptionRootModel.base"

import { MessageSelectColumn } from "./MessageSelectColumnEnumModel"
import { OrderBy } from "./OrderByEnumModel"
import { MessageConstraint } from "./MessageConstraintEnumModel"
import { MessageUpdateColumn } from "./MessageUpdateColumnEnumModel"

export type MessageOrderBy = {
  createdAt?: OrderBy
  id?: OrderBy
  message?: OrderBy
  updatedAt?: OrderBy
}
export type MessageBoolExp = {
  _and?: MessageBoolExp[]
  _not?: MessageBoolExp
  _or?: MessageBoolExp[]
  createdAt?: TimestampComparisonExp
  id?: IntComparisonExp
  message?: StringComparisonExp
  updatedAt?: TimestampComparisonExp
}
export type TimestampComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin: any[]
}
export type IntComparisonExp = {
  _eq?: number
  _gt?: number
  _gte?: number
  _in: number[]
  _is_null?: boolean
  _lt?: number
  _lte?: number
  _neq?: number
  _nin: number[]
}
export type StringComparisonExp = {
  _eq?: string
  _gt?: string
  _gte?: string
  _ilike?: string
  _in: string[]
  _is_null?: boolean
  _like?: string
  _lt?: string
  _lte?: string
  _neq?: string
  _nilike?: string
  _nin: string[]
  _nlike?: string
  _nsimilar?: string
  _similar?: string
}
export type MessageInsertInput = {
  createdAt?: any
  id?: number
  message?: string
  updatedAt?: any
}
export type MessageOnConflict = {
  constraint: MessageConstraint
  update_columns: MessageUpdateColumn[]
  where?: MessageBoolExp
}
export type MessageIncInput = {
  id?: number
}
export type MessageSetInput = {
  createdAt?: any
  id?: number
  message?: string
  updatedAt?: any
}
export type MessageAggregateOrderBy = {
  avg?: MessageAvgOrderBy
  count?: OrderBy
  max?: MessageMaxOrderBy
  min?: MessageMinOrderBy
  stddev?: MessageStddevOrderBy
  stddev_pop?: MessageStddevPopOrderBy
  stddev_samp?: MessageStddevSampOrderBy
  sum?: MessageSumOrderBy
  var_pop?: MessageVarPopOrderBy
  var_samp?: MessageVarSampOrderBy
  variance?: MessageVarianceOrderBy
}
export type MessageAvgOrderBy = {
  id?: OrderBy
}
export type MessageMaxOrderBy = {
  id?: OrderBy
  message?: OrderBy
}
export type MessageMinOrderBy = {
  id?: OrderBy
  message?: OrderBy
}
export type MessageStddevOrderBy = {
  id?: OrderBy
}
export type MessageStddevPopOrderBy = {
  id?: OrderBy
}
export type MessageStddevSampOrderBy = {
  id?: OrderBy
}
export type MessageSumOrderBy = {
  id?: OrderBy
}
export type MessageVarPopOrderBy = {
  id?: OrderBy
}
export type MessageVarSampOrderBy = {
  id?: OrderBy
}
export type MessageVarianceOrderBy = {
  id?: OrderBy
}
export type MessageArrRelInsertInput = {
  data: MessageInsertInput[]
  on_conflict?: MessageOnConflict
}
export type MessageObjRelInsertInput = {
  data: MessageInsertInput
  on_conflict?: MessageOnConflict
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  messages: ObservableMap<string, Message>
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['query_root', () => QueryRootModel], ['message', () => MessageModel], ['message_aggregate', () => MessageAggregateModel], ['message_aggregate_fields', () => MessageAggregateFieldsModel], ['message_avg_fields', () => MessageAvgFieldsModel], ['message_max_fields', () => MessageMaxFieldsModel], ['message_min_fields', () => MessageMinFieldsModel], ['message_stddev_fields', () => MessageStddevFieldsModel], ['message_stddev_pop_fields', () => MessageStddevPopFieldsModel], ['message_stddev_samp_fields', () => MessageStddevSampFieldsModel], ['message_sum_fields', () => MessageSumFieldsModel], ['message_var_pop_fields', () => MessageVarPopFieldsModel], ['message_var_samp_fields', () => MessageVarSampFieldsModel], ['message_variance_fields', () => MessageVarianceFieldsModel], ['mutation_root', () => MutationRootModel], ['message_mutation_response', () => MessageMutationResponseModel], ['subscription_root', () => SubscriptionRootModel]], ['message'], "js"))
  .props({
    messages: types.optional(types.map(types.late((): any => MessageModel)), {})
  })
  .actions(self => ({
    queryMessage(variables: { distinctOn: MessageSelectColumn[], limit?: number, offset?: number, orderBy: MessageOrderBy[], where?: MessageBoolExp }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ message: Message[]}>(`query message($distinctOn: [message_select_column!], $limit: Int, $offset: Int, $orderBy: [message_order_by!], $where: message_bool_exp) { message(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMessage_aggregate(variables: { distinctOn: MessageSelectColumn[], limit?: number, offset?: number, orderBy: MessageOrderBy[], where?: MessageBoolExp }, resultSelector: string | ((qb: MessageAggregateModelSelector) => MessageAggregateModelSelector) = messageAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ message_aggregate: MessageAggregate}>(`query message_aggregate($distinctOn: [message_select_column!], $limit: Int, $offset: Int, $orderBy: [message_order_by!], $where: message_bool_exp) { message_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMessage_by_pk(variables: { id: number }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ message_by_pk: Message}>(`query message_by_pk($id: Int!) { message_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateDelete_message(variables: { where: MessageBoolExp }, resultSelector: string | ((qb: MessageMutationResponseModelSelector) => MessageMutationResponseModelSelector) = messageMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_message: MessageMutationResponse}>(`mutation delete_message($where: message_bool_exp!) { delete_message(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateInsert_message(variables: { objects: MessageInsertInput[], onConflict?: MessageOnConflict }, resultSelector: string | ((qb: MessageMutationResponseModelSelector) => MessageMutationResponseModelSelector) = messageMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_message: MessageMutationResponse}>(`mutation insert_message($objects: [message_insert_input!]!, $onConflict: message_on_conflict) { insert_message(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdate_message(variables: { inc?: MessageIncInput, set?: MessageSetInput, where: MessageBoolExp }, resultSelector: string | ((qb: MessageMutationResponseModelSelector) => MessageMutationResponseModelSelector) = messageMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_message: MessageMutationResponse}>(`mutation update_message($inc: message_inc_input, $set: message_set_input, $where: message_bool_exp!) { update_message(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    subscribeMessage(variables: { distinctOn: MessageSelectColumn[], limit?: number, offset?: number, orderBy: MessageOrderBy[], where?: MessageBoolExp }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), onData?: (item: any) => void) {
      return self.subscribe<{ message: Message[]}>(`subscription message($distinctOn: [message_select_column!], $limit: Int, $offset: Int, $orderBy: [message_order_by!], $where: message_bool_exp) { message(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    subscribeMessage_aggregate(variables: { distinctOn: MessageSelectColumn[], limit?: number, offset?: number, orderBy: MessageOrderBy[], where?: MessageBoolExp }, resultSelector: string | ((qb: MessageAggregateModelSelector) => MessageAggregateModelSelector) = messageAggregateModelPrimitives.toString(), onData?: (item: any) => void) {
      return self.subscribe<{ message_aggregate: MessageAggregate}>(`subscription message_aggregate($distinctOn: [message_select_column!], $limit: Int, $offset: Int, $orderBy: [message_order_by!], $where: message_bool_exp) { message_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    subscribeMessage_by_pk(variables: { id: number }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), onData?: (item: any) => void) {
      return self.subscribe<{ message_by_pk: Message}>(`subscription message_by_pk($id: Int!) { message_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
  })))

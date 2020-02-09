/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageMutationResponse, MessageMutationResponseModel } from "./MessageMutationResponseModel"
import { MessageMutationResponseModelSelector } from "./MessageMutationResponseModel.base"
import { RootStoreType } from "./index"


/**
 * MutationRootBase
 * auto generated base class for the model MutationRootModel.
 */
export const MutationRootModelBase = ModelBase
  .named('MutationRoot')
  .props({
    __typename: types.optional(types.literal("mutation_root"), "mutation_root"),
    delete_message: types.union(types.undefined, types.null, types.late((): any => MessageMutationResponseModel)),
    insert_message: types.union(types.undefined, types.null, types.late((): any => MessageMutationResponseModel)),
    update_message: types.union(types.undefined, types.null, types.late((): any => MessageMutationResponseModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MutationRootModelSelector extends QueryBuilder {
  delete_message(builder?: string | MessageMutationResponseModelSelector | ((selector: MessageMutationResponseModelSelector) => MessageMutationResponseModelSelector)) { return this.__child(`delete_message`, MessageMutationResponseModelSelector, builder) }
  insert_message(builder?: string | MessageMutationResponseModelSelector | ((selector: MessageMutationResponseModelSelector) => MessageMutationResponseModelSelector)) { return this.__child(`insert_message`, MessageMutationResponseModelSelector, builder) }
  update_message(builder?: string | MessageMutationResponseModelSelector | ((selector: MessageMutationResponseModelSelector) => MessageMutationResponseModelSelector)) { return this.__child(`update_message`, MessageMutationResponseModelSelector, builder) }
}
export function selectFromMutationRoot() {
  return new MutationRootModelSelector()
}

export const mutationRootModelPrimitives = selectFromMutationRoot()

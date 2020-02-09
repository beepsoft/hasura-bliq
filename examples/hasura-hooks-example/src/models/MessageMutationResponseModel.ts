import { Instance } from "mobx-state-tree"
import { MessageMutationResponseModelBase } from "./MessageMutationResponseModel.base"

/* The TypeScript type of an instance of MessageMutationResponseModel */
export interface MessageMutationResponse extends Instance<typeof MessageMutationResponseModel.Type> {}

/* A graphql query fragment builders for MessageMutationResponseModel */
export { selectFromMessageMutationResponse, messageMutationResponseModelPrimitives, MessageMutationResponseModelSelector } from "./MessageMutationResponseModel.base"

/**
 * MessageMutationResponseModel
 */
export const MessageMutationResponseModel = MessageMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

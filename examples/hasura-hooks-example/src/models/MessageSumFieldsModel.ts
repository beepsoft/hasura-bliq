import { Instance } from "mobx-state-tree"
import { MessageSumFieldsModelBase } from "./MessageSumFieldsModel.base"

/* The TypeScript type of an instance of MessageSumFieldsModel */
export interface MessageSumFields extends Instance<typeof MessageSumFieldsModel.Type> {}

/* A graphql query fragment builders for MessageSumFieldsModel */
export { selectFromMessageSumFields, messageSumFieldsModelPrimitives, MessageSumFieldsModelSelector } from "./MessageSumFieldsModel.base"

/**
 * MessageSumFieldsModel
 */
export const MessageSumFieldsModel = MessageSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

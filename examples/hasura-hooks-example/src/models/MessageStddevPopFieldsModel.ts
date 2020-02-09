import { Instance } from "mobx-state-tree"
import { MessageStddevPopFieldsModelBase } from "./MessageStddevPopFieldsModel.base"

/* The TypeScript type of an instance of MessageStddevPopFieldsModel */
export interface MessageStddevPopFields extends Instance<typeof MessageStddevPopFieldsModel.Type> {}

/* A graphql query fragment builders for MessageStddevPopFieldsModel */
export { selectFromMessageStddevPopFields, messageStddevPopFieldsModelPrimitives, MessageStddevPopFieldsModelSelector } from "./MessageStddevPopFieldsModel.base"

/**
 * MessageStddevPopFieldsModel
 */
export const MessageStddevPopFieldsModel = MessageStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

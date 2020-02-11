import { Instance } from "mobx-state-tree"
import { MessageStddevFieldsModelBase } from "./MessageStddevFieldsModel.base"

/* The TypeScript type of an instance of MessageStddevFieldsModel */
export interface MessageStddevFields extends Instance<typeof MessageStddevFieldsModel.Type> {}

/* A graphql query fragment builders for MessageStddevFieldsModel */
export { selectFromMessageStddevFields, messageStddevFieldsModelPrimitives, MessageStddevFieldsModelSelector } from "./MessageStddevFieldsModel.base"

/**
 * MessageStddevFieldsModel
 */
export const MessageStddevFieldsModel = MessageStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

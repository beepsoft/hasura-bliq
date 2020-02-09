import { Instance } from "mobx-state-tree"
import { MessageModelBase } from "./MessageModel.base"

/* The TypeScript type of an instance of MessageModel */
export interface Message extends Instance<typeof MessageModel.Type> {}

/* A graphql query fragment builders for MessageModel */
export { selectFromMessage, messageModelPrimitives, MessageModelSelector } from "./MessageModel.base"

/**
 * MessageModel
 */
export const MessageModel = MessageModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

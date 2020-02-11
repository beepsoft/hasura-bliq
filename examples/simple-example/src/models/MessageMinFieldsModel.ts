import { Instance } from "mobx-state-tree"
import { MessageMinFieldsModelBase } from "./MessageMinFieldsModel.base"

/* The TypeScript type of an instance of MessageMinFieldsModel */
export interface MessageMinFields extends Instance<typeof MessageMinFieldsModel.Type> {}

/* A graphql query fragment builders for MessageMinFieldsModel */
export { selectFromMessageMinFields, messageMinFieldsModelPrimitives, MessageMinFieldsModelSelector } from "./MessageMinFieldsModel.base"

/**
 * MessageMinFieldsModel
 */
export const MessageMinFieldsModel = MessageMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

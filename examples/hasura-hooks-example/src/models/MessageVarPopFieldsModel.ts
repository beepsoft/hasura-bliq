import { Instance } from "mobx-state-tree"
import { MessageVarPopFieldsModelBase } from "./MessageVarPopFieldsModel.base"

/* The TypeScript type of an instance of MessageVarPopFieldsModel */
export interface MessageVarPopFields extends Instance<typeof MessageVarPopFieldsModel.Type> {}

/* A graphql query fragment builders for MessageVarPopFieldsModel */
export { selectFromMessageVarPopFields, messageVarPopFieldsModelPrimitives, MessageVarPopFieldsModelSelector } from "./MessageVarPopFieldsModel.base"

/**
 * MessageVarPopFieldsModel
 */
export const MessageVarPopFieldsModel = MessageVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

import { Instance } from "mobx-state-tree"
import { MessageVarSampFieldsModelBase } from "./MessageVarSampFieldsModel.base"

/* The TypeScript type of an instance of MessageVarSampFieldsModel */
export interface MessageVarSampFields extends Instance<typeof MessageVarSampFieldsModel.Type> {}

/* A graphql query fragment builders for MessageVarSampFieldsModel */
export { selectFromMessageVarSampFields, messageVarSampFieldsModelPrimitives, MessageVarSampFieldsModelSelector } from "./MessageVarSampFieldsModel.base"

/**
 * MessageVarSampFieldsModel
 */
export const MessageVarSampFieldsModel = MessageVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

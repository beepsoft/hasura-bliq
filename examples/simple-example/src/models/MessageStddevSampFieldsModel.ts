import { Instance } from "mobx-state-tree"
import { MessageStddevSampFieldsModelBase } from "./MessageStddevSampFieldsModel.base"

/* The TypeScript type of an instance of MessageStddevSampFieldsModel */
export interface MessageStddevSampFields extends Instance<typeof MessageStddevSampFieldsModel.Type> {}

/* A graphql query fragment builders for MessageStddevSampFieldsModel */
export { selectFromMessageStddevSampFields, messageStddevSampFieldsModelPrimitives, MessageStddevSampFieldsModelSelector } from "./MessageStddevSampFieldsModel.base"

/**
 * MessageStddevSampFieldsModel
 */
export const MessageStddevSampFieldsModel = MessageStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

import { Instance } from "mobx-state-tree"
import { MessageMaxFieldsModelBase } from "./MessageMaxFieldsModel.base"

/* The TypeScript type of an instance of MessageMaxFieldsModel */
export interface MessageMaxFields extends Instance<typeof MessageMaxFieldsModel.Type> {}

/* A graphql query fragment builders for MessageMaxFieldsModel */
export { selectFromMessageMaxFields, messageMaxFieldsModelPrimitives, MessageMaxFieldsModelSelector } from "./MessageMaxFieldsModel.base"

/**
 * MessageMaxFieldsModel
 */
export const MessageMaxFieldsModel = MessageMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

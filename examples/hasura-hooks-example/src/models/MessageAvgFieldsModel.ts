import { Instance } from "mobx-state-tree"
import { MessageAvgFieldsModelBase } from "./MessageAvgFieldsModel.base"

/* The TypeScript type of an instance of MessageAvgFieldsModel */
export interface MessageAvgFields extends Instance<typeof MessageAvgFieldsModel.Type> {}

/* A graphql query fragment builders for MessageAvgFieldsModel */
export { selectFromMessageAvgFields, messageAvgFieldsModelPrimitives, MessageAvgFieldsModelSelector } from "./MessageAvgFieldsModel.base"

/**
 * MessageAvgFieldsModel
 */
export const MessageAvgFieldsModel = MessageAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

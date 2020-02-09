import { Instance } from "mobx-state-tree"
import { MessageAggregateFieldsModelBase } from "./MessageAggregateFieldsModel.base"

/* The TypeScript type of an instance of MessageAggregateFieldsModel */
export interface MessageAggregateFields extends Instance<typeof MessageAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for MessageAggregateFieldsModel */
export { selectFromMessageAggregateFields, messageAggregateFieldsModelPrimitives, MessageAggregateFieldsModelSelector } from "./MessageAggregateFieldsModel.base"

/**
 * MessageAggregateFieldsModel
 */
export const MessageAggregateFieldsModel = MessageAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

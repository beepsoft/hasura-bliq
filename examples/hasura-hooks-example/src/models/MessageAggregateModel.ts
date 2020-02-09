import { Instance } from "mobx-state-tree"
import { MessageAggregateModelBase } from "./MessageAggregateModel.base"

/* The TypeScript type of an instance of MessageAggregateModel */
export interface MessageAggregate extends Instance<typeof MessageAggregateModel.Type> {}

/* A graphql query fragment builders for MessageAggregateModel */
export { selectFromMessageAggregate, messageAggregateModelPrimitives, MessageAggregateModelSelector } from "./MessageAggregateModel.base"

/**
 * MessageAggregateModel
 */
export const MessageAggregateModel = MessageAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

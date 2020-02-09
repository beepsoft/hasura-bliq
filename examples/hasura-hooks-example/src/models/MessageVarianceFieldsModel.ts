import { Instance } from "mobx-state-tree"
import { MessageVarianceFieldsModelBase } from "./MessageVarianceFieldsModel.base"

/* The TypeScript type of an instance of MessageVarianceFieldsModel */
export interface MessageVarianceFields extends Instance<typeof MessageVarianceFieldsModel.Type> {}

/* A graphql query fragment builders for MessageVarianceFieldsModel */
export { selectFromMessageVarianceFields, messageVarianceFieldsModelPrimitives, MessageVarianceFieldsModelSelector } from "./MessageVarianceFieldsModel.base"

/**
 * MessageVarianceFieldsModel
 */
export const MessageVarianceFieldsModel = MessageVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

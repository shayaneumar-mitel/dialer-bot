import { BotDeclaration, MessageExtensionDeclaration } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import DialerMessagingExtensionMessageExtension from "../dialerMessagingExtensionMessageExtension/DialerMessagingExtensionMessageExtension";
import { StatePropertyAccessor, MemoryStorage, ConversationState, TeamsActivityHandler } from "botbuilder";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for Dialer Messaging Extension Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)

export class DialerMessagingExtensionBot extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    /** Local property for DialerMessagingExtensionMessageExtension */
    @MessageExtensionDeclaration("dialerMessagingExtensionMessageExtension")
    private _dialerMessagingExtensionMessageExtension: DialerMessagingExtensionMessageExtension;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();
        // Message extension DialerMessagingExtensionMessageExtension
        this._dialerMessagingExtensionMessageExtension = new DialerMessagingExtensionMessageExtension();
        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
    }
}

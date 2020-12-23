import { BotDeclaration, MessageExtensionDeclaration } from "express-msteams-host";
import * as debug from "debug";
import DialerMessageExtension from "../dialerMessagingExtensionMessageExtension/DialerMessagingExtensionMessageExtension";
import { MemoryStorage, TeamsActivityHandler } from "botbuilder";

const log = debug("msteams");

@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)

export class DialerMessagingExtensionBot extends TeamsActivityHandler {
    @MessageExtensionDeclaration("dialerMessagingExtensionMessageExtension")
    private dialerMessageExtension: DialerMessageExtension;

    public constructor() {
        super();
        this.dialerMessageExtension = new DialerMessageExtension();

    }
}

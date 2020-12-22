import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory, MessagingExtensionQuery, MessagingExtensionResult } from "botbuilder";
import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";
import { TaskModuleRequest, TaskModuleContinueResponse } from "botbuilder";
// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/dialerMessagingExtensionMessageExtension/config.html")
@PreventIframe("/dialerMessagingExtensionMessageExtension/action.html")
export default class DialerMessagingExtensionMessageExtension implements IMessagingExtensionMiddlewareProcessor {
    public async onFetchTask(context: TurnContext, value: MessagingExtensionQuery): Promise<MessagingExtensionResult | TaskModuleContinueResponse> {
        log("TurnContext: " + JSON.stringify(context));

        return Promise.resolve<TaskModuleContinueResponse>({
            type: "continue",
            value: {
                url: `https://d3nn161xdywwor.cloudfront.net/#/conv-member`,
                height: "medium"
            }
        });
    }
}

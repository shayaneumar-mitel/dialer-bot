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


    // handle action response in here
    // See documentation for `MessagingExtensionResult` for details
    public async onSubmitAction(context: TurnContext, value: TaskModuleRequest): Promise<MessagingExtensionResult> {


        const card = CardFactory.adaptiveCard(
            {
                type: "AdaptiveCard",
                body: [
                    {
                        type: "TextBlock",
                        size: "Large",
                        text: value.data.email
                    },
                    {
                        type: "Image",
                        url: `https://randomuser.me/api/portraits/thumb/women/${Math.round(Math.random() * 100)}.jpg`
                    }
                ],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.2"
            });
        return Promise.resolve({
            type: "result",
            attachmentLayout: "list",
            attachments: [card]
        } as MessagingExtensionResult);
    }



    // this is used when canUpdateConfiguration is set to true
    public async onQuerySettingsUrl(context: TurnContext): Promise<{ title: string, value: string }> {
        return Promise.resolve({
            title: "Dialer Messaging Extension Configuration",
            value: `https://${process.env.HOSTNAME}/dialerMessagingExtensionMessageExtension/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`
        });
    }

    public async onSettings(context: TurnContext): Promise<void> {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = context.activity.value.state;
        log(`New setting: ${setting}`);
        return Promise.resolve();
    }

}

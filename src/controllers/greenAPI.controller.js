import API from "../api/greenAPI.api";

class GreenAPIController {
  constructor() {
    this.api = API;
  }

  async setSettings(authParams) {
    try {
      const response = await this.api.setSettings(authParams, {
        webhookUrl: "",
        outgoingWebhook: "yes",
        stateWebhook: "yes",
        incomingWebhook: "yes",
      });
      if (response && response.saveSettings) {
        console.log("settings saved");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async receiveNotificationSubscribe(authParams) {
    try {
      const response = await this.api.receiveNotification(authParams);
      console.log(response);
      if (response.status === 502) {
        await this.receiveNotificationSubscribe(authParams);
      } else if (response.status !== 200) {
        console.log(response.statusText);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await this.receiveNotificationSubscribe(authParams);
      } else {
        console.log(await response.text());
        await this.receiveNotificationSubscribe(authParams);
        // И снова вызовем subscribe() для получения следующего сообщения
        await this.receiveNotificationSubscribe(authParams);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new GreenAPIController();

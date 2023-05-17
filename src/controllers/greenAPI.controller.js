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
}

export default new GreenAPIController();

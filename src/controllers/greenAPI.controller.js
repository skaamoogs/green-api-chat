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
        stateWebhook: "no",
        incomingWebhook: "yes",
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data && data.saveSettings) {
          console.log("Настройки сохранены");
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Некорректные данные");
  }

  async receiveNotification(authParams) {
    try {
      const response = await this.api.receiveNotification(authParams);
      if (response.status === 502) {
        await this.receiveNotification(authParams);
      } else if (response.status !== 200) {
        console.log(response.statusText);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await this.receiveNotification(authParams);
      } else {
        console.log(response.status);
        console.log(await response.json());
        //await this.api.deleteNotification(authParams, 1)
        //await this.receiveNotification(authParams);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNotification(authParams, receptId) {

  }
}

export default new GreenAPIController();

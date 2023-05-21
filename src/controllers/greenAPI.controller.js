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

  async getAccountState(authParams) {
    try {
      const response = await this.api.getAccountState(authParams);

      if (response.status === 200) {
        const data = await response.json();
        if (data && data.stateInstance) {
          return data.stateInstance;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async receiveNotification(authParams, notificationHandler) {
    try {
      let response;
      while ((response = await this.api.receiveNotification(authParams))) {
        if (response.status !== 200) {
          console.log(response.statusText);

          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          const data = await response.json();
          if (data && data.receiptId) {
            notificationHandler(data);
            await this.deleteNotification(authParams, data.receiptId);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNotification(authParams, receiptId) {
    try {
      await this.api.deleteNotification(authParams, receiptId);
    } catch (error) {
      console.log(error);
    }
  }

  async sendMessage(authParams, chatId, message) {
    try {
      const response = await this.api.sendMessage(authParams, {
        chatId,
        message,
      });
      const data = await response.json();
      if (data && data.idMessage) {
        return data.idMessage;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new GreenAPIController();

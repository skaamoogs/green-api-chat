import RequestTransport from "../service/request/request";

export const API_HOST = "https://api.green-api.com/waInstance";

export const AUTH_FIELDS = {
  id: "idInstance",
  token: "apiTokenInstance",
};

export const createURL = (methodName, authParams) =>
  `${authParams[AUTH_FIELDS.id]}/${methodName}/${
    authParams[AUTH_FIELDS.token]
  }`;

class GreenAPI extends RequestTransport {
  constructor() {
    super(`${API_HOST}`);
  }

  setSettings(authParams, data) {
    const url = createURL("SetSettings", authParams);
    return this.post(url, { data });
  }

  getAccountState(authParams) {
    const url = createURL("getStateInstance", authParams);
    return this.get(url);
  }

  sendMessage(authParams, data) {
    const url = createURL("SendMessage", authParams);
    return this.post(url, { data });
  }

  receiveNotification(authParams) {
    const url = createURL("ReceiveNotification", authParams);
    return this.get(url);
  }

  deleteNotification(authParams, receptId) {
    const url = createURL("DeleteNotification", authParams);
    return this.delete(`${url}/${receptId}`);
  }
}

export default new GreenAPI();

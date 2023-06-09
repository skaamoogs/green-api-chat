const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const TIMEOUT_DELAY = 5000;

function queryStringify(data) {
  if (!data) {
    return "";
  }

  if (typeof data !== "object") {
    throw new Error("Data должна быть объектом");
  }

  const stringify = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `?${stringify}`;
}

export default class RequestTransport {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  get = async (url, options) => {
    const correctUrl = `${url}${queryStringify(options?.data)}`;

    return await this.request(
      `${this.endpoint}${correctUrl}`,
      { headers: options?.headers, method: METHODS.GET },
      options?.timeout
    );
  };

  post = async (url, options) => {
    return await this.request(
      `${this.endpoint}${url}`,
      { ...options, method: METHODS.POST },
      options?.timeout
    );
  };

  put = async (url, options) => {
    return await this.request(
      `${this.endpoint}${url}`,
      { ...options, method: METHODS.PUT },
      options?.timeout
    );
  };

  delete = async (url, options) => {
    return await this.request(
      `${this.endpoint}${url}`,
      { ...options, method: METHODS.DELETE },
      options?.timeout
    );
  };

  request = async (url, options = {}, timeout = TIMEOUT_DELAY) => {
    const { headers = {}, method, data } = options;

    if (!(data instanceof FormData)) {
      headers["content-type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data),
    });

    return response;
  };
}

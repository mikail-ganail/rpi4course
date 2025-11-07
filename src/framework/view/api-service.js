export default class ApiService {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  async addTask(task) {
    const response = await this._load({
      url: "tasks",
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return ApiService.parseResponse(response);
  }

  async _load({ url, method = "GET", body = null, headers = new Headers() }) {
    const response = await fetch(`${this._endPoint}/${url}`, {
      method,
      body: method === "GET" ? null : body,
      headers,
    });
    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse(response) {
    return response.json();
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError(err) {
    throw err;
  }
}

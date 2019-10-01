import axios from "axios";

class API {
  constructor() {
    // check if token in storage and copy it to token
    this.token = localStorage.token || null;
    this.apiUrl = "https://sipec-backend.herokuapp.com/";
  }

  login = async (email, password) => {
    var response = { success: false, type: "" };
    await axios
      .post(this.apiUrl + "auth/sign_in", { email, password })
      .then(resp => {
        if (resp.status === 200) {
          this.token = resp.headers["access-token"];
          response.success = true;
        } else {
          response.success = false;
          response.type = resp.status;
          this.token = null;
        }
      })
      .catch(error => {
        response.type = JSON.parse(error.request.response).errors[0];
      });
    localStorage.token = this.token;

    return response;
  };

  logout = () => {
    this.token = null;
    localStorage.token = this.token;
  };

  recoverAccount;

  get = async url => {
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.token}`
        }
      })
      .then(({ data }) => {
        return data;
      });
  };

  post = (url, obj) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.token}`
        },
        ...obj
      })
      .then(({ data }) => {
        return data;
      });
  };
}

export default API;

import axios from "axios";

class API {
  constructor() {
    // check if token in storage and copy it to token
    this.token = localStorage.token || null;
    this.client = localStorage.client || null;
    this.uid = localStorage.uid || null;
    this.currentUserId = localStorage.currentUserId || null;
    this.apiUrl = "https://sipec-backend.herokuapp.com";
  }

  login = async (email, password) => {
    var response = { success: false };
    await axios
      .post(this.apiUrl + "/auth/sign_in", { email, password })
      .then(resp => {
        if (resp.status === 200) {
          this.token = resp.headers["access-token"];
          this.client = resp.headers["client"];
          this.uid = resp.headers["uid"];
          this.currentUserId = resp.data.data["id"];
          response.success = true;
        } else {
          response.success = false;
          this.token = null;
        }
      })
      .catch(error => console.log(error));
    localStorage.token = this.token;
    localStorage.client = this.client;
    localStorage.uid = this.uid;
    localStorage.currentUserId = this.currentUserId;

    return response;
  };

  logout = () => {
    this.token = null;
    localStorage.token = this.token;
  };

  recoverAccount;

  get = async url => {
    const path = this.apiUrl + url;
    var results = { success: false, data: null };
    try {
      const getResponse = await axios.get(path, {
        headers: {
          "Content-Type": "application/json",
          "access-token": this.token,
          client: this.client,
          uid: this.uid
        }
      });
      if (getResponse.status === 200) {
        results.success = true;
        results.data = getResponse.data;
      } else {
        results.success = false;
      }
    } catch (error) {
      results.success = false;
      results.data = error;
    }
    // TODO: If the response says that the token is not valid, redirect to login
    return results;
  };

  post = async (url, obj) => {
    const path = this.apiUrl + url;
    var results = { success: false };
      const postResponse = await axios.post(path, {
        headers: {
          "Content-Type": "application/json",
          "access-token": this.token,
          client: this.client,
          uid: this.uid
        },
        ...obj
      });
      if (Math.floor(postResponse.status / 100) === 2) {
        results.success = true;
      }
    // TODO: If the response says that the token is not valid, redirect to login
    return results;
  };
}

export default API;

import axios from "axios";

class API {
  constructor() {
    // check if token in storage and copy it to token
    this.token = localStorage.token || null;
    this.client = localStorage.client || null;
    this.uid = localStorage.uid || null;
    this.apiUrl = "https://sipec-backend.herokuapp.com";
    this.titular = localStorage.titular || null;
  }

  login = async (email, password) => {
    var response = { success: false, type: "" };
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
          response.type = resp.status;
          this.token = null;
        }
      })
      .catch(error => {
        try {
          response.type = JSON.parse(error.request.response).errors[0];
        } catch (error) {
          response.type = "Unknown error.";
        }
      });
    localStorage.token = this.token;
    localStorage.client = this.client;
    localStorage.uid = this.uid;
    localStorage.currentUserId = this.currentUserId;

    await this.get("/auth/validate_token").then(resp => {
      if (resp.success) {
        this.titular = resp.data.data["personal"] || null;
      }
    });
    localStorage.titular = JSON.stringify(this.titular);

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
    try {
      const postResponse = await axios.post(
        path,
        { ...obj },
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": this.token,
            client: this.client,
            uid: this.uid
          }
        }
      );
      if (Math.floor(postResponse.status / 100) === 2) {
        results.success = true;
        results.data = postResponse.data;
      }
    } catch (error) {
      results.success = false;
      results.data = error;
    }
    // TODO: If the response says that the token is not valid, redirect to login
    return results;
  };

  patch = async (url, obj) => {
    const path = this.apiUrl + url;
    var results = { success: false };
    try {
      const postResponse = await axios.patch(
        path,
        { ...obj },
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": this.token,
            client: this.client,
            uid: this.uid
          }
        }
      );
      if (Math.floor(postResponse.status / 100) === 2) {
        results.success = true;
        results.data = postResponse.data;
      }
    } catch (error) {
      results.success = false;
      results.data = error;
    }
    // TODO: If the response says that the token is not valid, redirect to login
    return results;
  };

  delete = async url => {
    const path = this.apiUrl + url;
    var results = { success: false, data: null };
    try {
      const getResponse = await axios.delete(path, {
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
}

export default API;

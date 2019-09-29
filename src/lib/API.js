import axios from "axios";

class API {
  constructor() {
    // check if token in storage and copy it to token
    this.token = localStorage.token || null;
    this.apiUrl = "https://sipec-backend.herokuapp.com";
  }

  login = (email, password) => {
    // axios to backend

    // if token
    this.token = "asdasd";

    // else

    this.token = null;

    // return backend response
  };

  logout = () => {
    this.token = null;
  };

  recoverAccount;

  get = async url => {
    const path = this.apiUrl + url;
    var results = { success: false, data: null };
    try {
      const getResponse = await axios.get(path, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.token}`
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
    const postResponse = await axios.get(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${this.token}`
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

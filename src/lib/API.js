import axios from "axios";

class API {
  constructor() {
    // check if token in storage and copy it to token
    this.token = "asdfsaf9sdf9sdfsdjfsdifsdfso9dfnfof";
    this.apiUrl = "http://sipec-backend.herokuapp.com/api/";
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
    await axios
      .get(url, {
        headers: {
          "Content-Type": "blank",
          Authorization: `token ${this.token}`
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
          "Content-Type": "blak",
          Authorization: `token ${this.token}`
        },
        ...obj
      })
      .then(({ data }) => {
        return data;
      });
  };
}

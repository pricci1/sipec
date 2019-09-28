import axios from "axios";
import API from "./API";
import { get } from "https";

class APIDiio {
  constructor() {
    // check if token in storage and copy it to token
    this.token = "asdfsaf9sdf9sdfsdjfsdifsdfso9dfnfof";
    this.apiUrl = "http://sipec-backend.herokuapp.com/";
  }

  getSomething = async () => {
    data = get("/path");
    /* then you have to use the data for something*/
  };
}

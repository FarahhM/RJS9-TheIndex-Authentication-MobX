import { decorate, observable, computed } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  constructor() {
    this.user = null;
  }

  setAuthToken(token) {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      this.user = jwt_decode(token);
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
      this.user = null;
    }
  }

  checkForToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (user.exp > Date.now() / 1000) {
        this.setAuthToken(token);
      } else {
        this.setAuthToken();
      }
    }
  }
  signupUser(userData) {
    axios
      .post("https://the-index-api.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => this.setAuthToken(user.token))
      .catch(err => console.error(err.response.data));
  }

  loginUser(userData) {
    console.log(userData);
    axios
      .post("https://the-index-api.herokuapp.com/login/", userData)
      .then(res => res.data)
      .then(user => this.setAuthToken(user.token))
      .catch(err => console.error(err.response.data));
  }
  logoutUser() {
    this.setAuthToken();
  }
}
decorate(AuthStore, {
  user: observable
});
const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;

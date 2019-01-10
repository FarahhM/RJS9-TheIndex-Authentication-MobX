import React, { Component } from "react";
import { observer } from "mobx-react";
import authStore from "./stores/AuthStore";

class Signout extends component {
  render() {
    return (
      <button className="btn btn-danger" onClick={() => authStore.logoutUser()}>
        Signout
      </button>
    );
  }
}
export default observer(Signout);

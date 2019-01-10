import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";
import authStore from "./stores/authStore";
class Sidebar extends Component {
  render() {
    if (!authStore.user) {
    } else {
    }
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
        </section>
        <div className="fixed-bottom m-3">
          {!authStore.user ? (
            <Link to="/signin">
              <button className="btn btn-default">Login</button>
            </Link>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => authStore.logoutUser()}
            >
              Logout {authStore.user.username}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default observer(Sidebar);

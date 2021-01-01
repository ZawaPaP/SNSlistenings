import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session";
import Avator from './Figures'

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const ProfileButton = ({ logout, session }) => (
  <>
    <h1>Hi {session.username}</h1>
    getUserData()
    <p>You are now logged in!</p>
    <Avator />
    <Table />

    <button onClick={logout}>Logout</button>
  </>
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileButton);

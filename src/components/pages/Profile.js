import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session";
import Avatar from '../Avatar'
import Table from '../Profile-Table'
// import { loginUser, useAuthState, useAuthDispatch, logout } from '../../reducers/contexts' 


const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

// const mapDispatchToProps = dispatch => ({
//   twitterAuth: user => dispatch(twitterAuth(user))
// });

function Profile ({ logout, session }) {
  // const dispatch = useAuthDispatch()
  // const userDetails = useAuthState()

return(
  <>
    <h1>Profile</h1>
    <p>{session.username}としてログインしています。</p>
    <Avatar user={session} />

    <button onClick={logout}>Logout</button>
  </>
);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../actions/session";

// import { loginUser, useAuthState, useAuthDispatch} from '../../reducers/contexts' 
// import { signup } from "../../reducers/contexts";

const mapStateToProps = ({ errors }) => ({
  errors
});
const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user))
});

function Signup ({ errors, signup }) {
  // const dispatch = useAuthDispatch()
  
    const handleSubmit = e => {
      e.preventDefault();
      const user = {
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      };
      signup(user);
    };
    return (
      <>
        <h1>Signup</h1>
        <p>{errors}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to="/login">Login</Link>
      </>
      );
    };

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Signup);
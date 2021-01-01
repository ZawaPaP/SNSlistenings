import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { twitterAuth } from "../../actions/session";
import * as apiUtil from '../../util/session.js';


class TwitterAuth extends Component{
  // state = {
  //   user: {},
  //   error: null,
  //   authenticated: false
  // };


  handleSubmit = e => {
      e.preventDefault();
      window.open(process.env.TWITTER_CALLBACK_URL, "_self");
      twitterAuth()
    };

    render(){
    return (
      <>
        <h1>TWitterAuth</h1>
        <p>error</p>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Submit" />
        </form>
      </>
      );
    };
}
    export default TwitterAuth;
import React, { Component } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import axios from 'axios';
import Tweet from '../Tweet'
import TweetFeed from '../TweetFeed'
import { Link } from "react-router-dom";
import { twitterSearch } from "../../actions/session";



class Twitter extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {tweets: []};
    }

    handleSubmit = async(e) => {
        e.preventDefault(); 
        const keyword = e.target[0].value;
      var response = await axios.get('/api/app/twitter/hashtag', {
          params: {
            keyword,
          }
      });
      this.setState(() => {
          return {tweets: response.data.data}
      })
    };
    render(){
        return (
        <>
        <h1 className="twitter">Twitter Keyword Search</h1>
        <form onSubmit={this.handleSubmit}>
            <label>
                検索してみる  
                <input type="text" name="keyword" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        <TweetFeed tweets={this.state.tweets} />
        </>
        );
    }
}

export default Twitter
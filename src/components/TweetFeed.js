import React, { useEffect, useReducer } from "react";
import Tweet from "./Tweet";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import axios from 'axios';

const TweetFeed = (props) => {
  const tweets = props.tweets;
  const twitterFeed = tweets.map((tweet) =>
    <Tweet key={tweet.id.toString()} text={tweet.text} id={tweet.id} />
  );

  return (
    <div>
      <ul>
        {twitterFeed}
      </ul>
    </div>
  );
};

  export default TweetFeed;
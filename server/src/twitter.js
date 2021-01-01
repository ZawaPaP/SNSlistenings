require('dotenv').config({ path: './config/dev.env' })
const needle = require('needle');
const token = process.env.TWITTER_BEARER_TOKEN; 
const http = require("http");


let timeout = 0;

const errorMessage = {
    title: "Please Wait",
    detail: "Waiting for new Tweets to be posted...",
  };
  
  const authMessage = {
    title: "Could not authenticate",
    details: [
      `Please make sure your bearer token is correct. 
        If using Glitch, remix this app and add it to the .env file`,
    ],
    type: "https://developer.twitter.com/en/docs/authentication",
  };

const getRecentPost = async () => {
    const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'
    // Edit query parameters below
    const params = {
        'query': 'from:McDonaldsJapan lang:ja', 
        'tweet.fields': '',
        // 'expansions': 'author_id',
        'max_results': 10,
    } 
    const res = await needle('get', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}

const getHashtag = async() => {
    const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'
    // Edit query parameters below
    const params = {
        'query': '#Sapporo lang:ja', 
        'tweet.fields': '',
        'max_results': 10,
    } 

    const res = await needle('get', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}


const getUserData = async() => {
    const username = "McDonaldsJapan"
    const endpointUrl = 'https://api.twitter.com/2/users/by/username/' + username
    
    // Edit query parameters below
    const params = {
        'user.fields':'description',
        'expansions': 'pinned_tweet_id'
    } 

    const res = await needle('get', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}

const sleep = async (delay) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

const getRules = async() => {
    const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream/rules'

    const res = await needle('get', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error (res.body.error.message)
    }
}

const postRules = async() => {
    const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream/rules'

    const params = {
        json: req.body,
    }

    const res = await needle('post', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error (res.body.error.message)
    }
}

// const streamTweets = (socket, token) => {
//     let stream;
//     const streamURL = new URL(
//         "https://api.twitter.com/2/tweets/search/stream?tweet.fields=context_annotations&expansions=author_id"
//       );
//     const config = {
//         url: streamURL,
//         auth: {
//           bearer: token,
//         },
//         timeout: 31000,
//       };
  
//     try {
//       const stream = request.get(config);
  
//       stream
//         .on("data", (data) => {
//           try {
//             const json = JSON.parse(data);
//             if (json.connection_issue) {
//               socket.emit("error", json);
//               reconnect(stream, socket, token);
//             } else {
//               if (json.data) {
//                 socket.emit("tweet", json);
//               } else {
//                 socket.emit("authError", json);
//               }
//             }
//           } catch (e) {
//             socket.emit("heartbeat");
//           }
//         })
//         .on("error", (error) => {
//           // Connection timed out
//           socket.emit("error", errorMessage);
//           reconnect(stream, socket, token);
//         });
//     } catch (e) {
//       socket.emit("authError", authMessage);
//     }
//   };

//   const reconnect = async (stream, socket, token) => {
//     timeout++;
//     stream.abort();
//     await sleep(2 ** timeout * 1000);
//     streamTweets(socket, token);
//   };
  


module.exports = {
    getRecentPost,
    getHashtag,
    getUserData,
    getRules,
    postRules,
}
export const signup = user => (
    fetch("api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  );
  export const login = user => (
    fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  );
  export const logout = () => ( 
    fetch("api/auth/logout", { method: "GET" })
  );

  export const checkLoggedIn = async () => {
    const response = await fetch('api/auth/login',{
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    });
    const { user } = await response.json();
    let preloadedState = {};
    if (user) {
      preloadedState = {
        session: user
      };
    }
    return preloadedState;
  };

  export const twitterLogin = () => (
    fetch("api/auth/twitter/callback", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
  );

  // const getUserData = () => {
  //   const response = await fetch('api/auth/login');
  //   const { userData } = await response.json();
  //   console.log(userData)
  // };
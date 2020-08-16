// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://spotify-clone-yash.web.app/";
const clientId = "1f6b27b71a7c47d3886c752c3cebfd6f";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  //pulling the accessToken
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      // it will split key value pairs of uri params
      // #accessToken=mysupersecuritykey&name=sonny&app=spotify
      let parts = item.split("=");
      //grabs accesstoken
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

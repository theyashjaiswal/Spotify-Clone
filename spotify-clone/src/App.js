import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  //dispatch is like a gun that shoots the data layer to update its state
  //we are using contextAPI and dispatch instead of UseState
  const [{ user, token }, dispatch] = useDataLayerValue();

  //run code based on a given condition i.e[]
  useEffect(() => {
    const hash = getTokenFromUrl();
    //to remove the access token for security kinda reasons
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {
        // console.log("HeyCONSOLE", user);
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("37i9dQZF1E35eDOvHxcwPw").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
    //console.log("I Have A Token ", token);
  }, [token, dispatch]);

  return (
    //BEM
    <div className="App">
      {
        // if there is a token start the player or redirect to login page
        token ? <Player spotify={spotify} /> : <Login />
      }
    </div>
  );
}

export default App;

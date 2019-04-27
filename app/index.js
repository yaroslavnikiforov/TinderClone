import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from "firebase";
import Home from "./screens/Home";
import Login from "./screens/Login";

const firebaseConfig = {
  apiKey: "AIzaSyCgo549LMZCLmLWSjdoEZk-W9CEQSLkI4Y",
  databaseURL: "https://tinderclone-5b194.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

const RouteConfigs = createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(RouteConfigs);

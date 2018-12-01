import React from "react";
import {Provider} from "react-redux";
import store from "./src/redux/store";

import MainNavigator from "./src/screens/navigators/MainNavigator";

export default class App extends React.Component {
  public render() {
    return (
        <Provider store={store}>
          <MainNavigator />
        </Provider>
    );
  }
}

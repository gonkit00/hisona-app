import React, { Component } from 'react';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import { ProgressBar } from '~/components/ProgressBar';
import Navigation from '~/Navigation';

import configureStore from '~/store/configureStore';

const store = configureStore();

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  componentDidMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      'barlow-regular': require('../assets/fonts/BarlowSemiCondensed-Regular.otf'),
      'barlow-medium': require('../assets/fonts/BarlowSemiCondensed-Medium.otf'),
      'barlow-bold': require('../assets/fonts/BarlowSemiCondensed-Bold.otf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <ProgressBar />;
    }
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default AppContainer;

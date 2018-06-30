// Index.ios.js - place code in here for IOS!!!!

// Import a library to help create a component
import React from 'react';
import { AppRegistry, View, YellowBox  } from 'react-native';
import Header from './src/components/header';
import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import PhotoComments from './src/components/PhotoComments';
import { Router, Scene } from 'react-native-router-flux';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// Create a component
const App = () => (
      <Router>
        <Scene key="root">
          <Scene key="albumList" component={AlbumList} title="Albumes" initial={true} />
          <Scene key="photoList" component={PhotoList} title="Galeria" />
          <Scene key="photoComments" component={PhotoComments} title="Post" />
        </Scene>
      </Router>
);

// Render it to the device
AppRegistry.registerComponent('albums', () => App);

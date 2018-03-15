import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';

import { MaterialIcons } from '@expo/vector-icons';

import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatScreen from '~/screens/ChatScreen';
import CameraScreen from '~/screens/CameraScreen';
import RecogniseScreen from '~/screens/RecogniseScreen';
import MatchScreen from '~/screens/MatchScreen';
import MapScreen from '~/screens/MapScreen';
import GeoScreen from '~/screens/GeoScreen';

const styles = {
  icons: {
    marginLeft: 12,
  }
}

const Navigation = () => (
  <Router>
    <Modal hideNavBar>
      <Scene key="root">
        <Scene
          key="chatsListScreen"
          component={ChatsListScreen}
          title="HISONA"
          titleStyle={{ fontFamily: 'barlow-bold', fontSize: 20 }}
          renderRightButton={() => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => Actions.cameraScreen()} >
                <MaterialIcons name="add" size={24} style={styles.icons} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.mapScreen()} >
                <MaterialIcons name="map" size={24} style={styles.icons} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.geoScreen()}>
                <MaterialIcons name="directions-run" size={24} style={styles.icons}/>
              </TouchableOpacity>

            </View>
          )}
          initial
        />
        <Scene
          key="chatScreen"
          component={ChatScreen}
          titleStyle={{ fontFamily: 'barlow-medium', fontSize: 20 }}
          back
        />
      </Scene>
      <Scene key="geoScreen" component={GeoScreen} back navTransparent />
      <Scene key="mapScreen" component={MapScreen} back navTransparent />
      <Scene key="cameraScreen" component={CameraScreen} back navTransparent />
      <Scene key="recogniseScreen" component={RecogniseScreen} navTransparent />
      <Scene key="matchScreen" component={MatchScreen} navTransparent />
    </Modal>
  </Router>
);

export default Navigation;

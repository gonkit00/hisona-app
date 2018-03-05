import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';

import { MaterialIcons } from '@expo/vector-icons';

import { Header } from '~/components/Header';
import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatScreen from '~/screens/ChatScreen';
import CameraScreen from '~/screens/CameraScreen';
import RecogniseScreen from '~/screens/RecogniseScreen';
import MatchScreen from '~/screens/MatchScreen';

const Navigation = () => (
	<Router>
		<Modal hideNavBar>
			<Scene key="root">
				<Scene
					key="chatsListScreen"
					component={ChatsListScreen}
					title="HISONA"
					titleStyle={{ fontFamily: 'barlow-bold', fontSize: 20 }}
					renderRightButton={() =>
            <TouchableOpacity onPress={() => Actions.cameraScreen()}>
              <MaterialIcons name="add" size={32} />
            </TouchableOpacity>
          }
					initial
				/>
				<Scene
					key="chatScreen"
					component={ChatScreen}
					titleStyle={{ fontFamily: 'barlow-medium', fontSize: 20 }}
          back
				/>
			</Scene>
			<Scene key="cameraScreen" component={CameraScreen} back navTransparent />
			<Scene key="recogniseScreen" component={RecogniseScreen} navTransparent />
			<Scene key="matchScreen" component={MatchScreen} navTransparent />
		</Modal>
	</Router>
);

export default Navigation;
import React from 'react';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';

import { ScreenHeader } from '~/components/ScreenHeader';
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
					title={'HISONA'}
					initial
				/>
				<Scene key="chatScreen" component={ChatScreen} />
			</Scene>
      <Scene
        key="cameraScreen"
        component={CameraScreen}
        back
        navTransparent
      />
      <Scene
        key="recogniseScreen"
        component={RecogniseScreen}
        navTransparent
      />
      <Scene key="matchScreen" component={MatchScreen} navTransparent />
		</Modal>
	</Router>
);

export default Navigation;

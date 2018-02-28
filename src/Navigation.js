import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import { ScreenHeader } from '~/components/ScreenHeader';
import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatScreen from '~/screens/ChatScreen';
import CameraScreen from '~/screens/CameraScreen';
import RecogniseScreen from '~/screens/RecogniseScreen';
import MatchScreen from '~/screens/MatchScreen';

const Navigation = () => (
	<Router>
		<Scene key="root">
			<Scene
				key="chatsListScreen"
				component={ChatsListScreen}
				title={'Hisona'}
				initial
			/>
			<Scene key="chatScreen" component={ChatScreen} title={'Artefact'} />
			<Scene key="cameraScreen" component={CameraScreen} back navTransparent />
			<Scene key="recogniseScreen" component={RecogniseScreen} navTransparent />
			<Scene key="matchScreen" component={MatchScreen} navTransparent />
		</Scene>
	</Router>
);

export default Navigation;

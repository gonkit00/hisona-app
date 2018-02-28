import React, { PropTypes, Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
import * as chatSelectors from '~/store/Chats/reducer';

import { ScreenHeader } from '~/components/ScreenHeader';
import { ProgressBar } from '~/components/ProgressBar';
import { ChatItem } from '~/components/ChatItem';

class ChatsListScreen extends Component {
	componentWillMount() {
		this.props.getChats();
	}

	_viewThread = threadId => {
		Actions.chatScreen({ threadId });
	};

	_renderChatThread(rowData) {
		return <ChatItem thread={rowData} onViewThread={this._viewThread} />;
	}

	_renderProgressBar() {
		return <ProgressBar />;
	}

	render() {
		return this.props.isLoading ? (
			this._renderProgressBar()
		) : (
			<View style={styles.container}>
				<ListView
					enableEmptySections
					dataSource={this.props.chats}
					renderRow={rowData => this._renderChatThread(rowData)}
					renderSeparator={(sectionId, rowId) => (
						<View key={rowId} style={styles.seperator} />
					)}
				/>
				<TouchableHighlight
					onPress={() => {
						Actions.cameraScreen();
					}}
				>
					<View style={styles.buttonRecognise}>
						<Ionicons name="ios-add-outline" size={56} color="white" />
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#F7F8FA'
	},
	seperator: {
		backgroundColor: '#e7e7e7',
		height: 1
	},
	buttonRecognise: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: '#2575FC',
		position: 'absolute',
		bottom: 16,
		right: 16
	}
});

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
});

const mapStateToProps = state => {
	const isLoading = chatSelectors.isLoading(state);
	const allChats = chatSelectors.getChats(state);

	return {
		isLoading,
		chats: ds.cloneWithRows(allChats)
	};
};

function mapDispatchToProps(dispatch) {
	return {
		getChats: () => dispatch(chatActions.getChats()),
		openThread: () => dispatch(chatActions.getThread())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsListScreen);

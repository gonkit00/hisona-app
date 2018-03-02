import React, { PropTypes, Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import get from 'lodash/get';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
import * as chatSelectors from '~/store/Chats/reducer';

import { ScreenHeader } from '~/components/ScreenHeader';
import { ProgressBar } from '~/components/ProgressBar';
import { PulseIndicator } from 'react-native-indicators';
import { ChatItem } from '~/components/ChatItem';

class ChatsListScreen extends Component {
	async componentWillMount() {
		await this.props.getArtefacts();
		await this.props.getChats();
	}

	_viewThread = (threadId, artefactName) => {
		this.props.openThread(threadId, artefactName);
	};

	_renderChatThread(rowData) {
		const artefact = get(this.props.artefactsById, rowData.artefact_id);
		return (
			<ChatItem
				artefact={artefact}
				thread={rowData}
				onViewThread={this._viewThread}
			/>
		);
	}

	_renderProgressBar() {
		return <ProgressBar />;
	}

	render() {
		const { isLoading, chats } = this.props;
		return isLoading ? (
			this._renderProgressBar()
		) : (
			<View style={styles.container}>
				<ListView
					enableEmptySections
					dataSource={chats}
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
						<Text>+</Text>
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
	const artefactsById = chatSelectors.getArtefactsById(state);
	const allChats = chatSelectors.getChats(state);

	return {
		isLoading,
		artefactsById,
		chats: ds.cloneWithRows(allChats)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getArtefacts: () => dispatch(chatActions.getArtefacts()),
		getChats: () => dispatch(chatActions.getChats()),
		openThread: (threadId, artefactName) =>
			dispatch(chatActions.openThread(threadId, artefactName))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsListScreen);

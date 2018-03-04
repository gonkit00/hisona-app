import React, { PropTypes, Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight
} from 'react-native';

import get from 'lodash/get';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
import * as chatSelectors from '~/store/Chats/reducer';

import { ProgressBar } from '~/components/ProgressBar';
import { PulseIndicator } from 'react-native-indicators';
import { ChatItem } from '~/components/ChatItem';

class ChatsListScreen extends Component {
	async componentDidMount() {
		await this.props.getArtefacts();
		await this.props.getChats();
	}

	_viewThread = (threadId, artefactId, artefactName) => {
		this.props.openThread(threadId, artefactId, artefactName);
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

const mapDispatchToProps = dispatch => ({
	getArtefacts: () => dispatch(chatActions.getArtefacts()),
	getChats: () => dispatch(chatActions.getChats()),
	openThread: (threadId, artefactId, artefactName) =>
		dispatch(chatActions.openThread(threadId, artefactId, artefactName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsListScreen);

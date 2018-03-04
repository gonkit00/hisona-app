import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 12,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	containerDetails: {},
	artefactAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		marginRight: 12
	},
	artefactNameRead: {
		fontSize: 19,
		fontFamily: 'barlow-regular',
		marginBottom: 4
	},
	artefactNameUnread: {
		fontSize: 19,
		fontFamily: 'barlow-medium',
		marginBottom: 4
	},
	lastMessageDate: {
		fontSize: 16,
		color: '#858385'
	},
	lastMessage: {
		fontSize: 16,
		fontFamily: 'barlow-regular',
		color: '#858385'
	}
});

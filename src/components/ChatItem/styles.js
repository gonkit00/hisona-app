import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		padding: 12,
		flex: 1,
		flexDirection: 'row'
	},
	containerDetails: {},
	artefactAvatar: {
		width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
	},
	artefactName: {
		fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
	},
	lastMessageDate: {
		fontSize: 14,
		color: '#858385',
		alignSelf: 'flex-end'
	},
	lastMessage: {
		fontSize: 14,
    color: '#858385'
	}
});

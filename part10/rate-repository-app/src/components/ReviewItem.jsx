import { storeKeyNameFromField } from '@apollo/client/utilities';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';

const styles = StyleSheet.create({
	reviewBlock: {
		flexDirection: 'row',
		margin: 10,
	},
	rating: {
		width: 50,
		height: 50,
		borderWidth: 2,
		borderRadius: 50,
		textAlign: 'center',
		paddingTop: 13,
		fontWeight: 'bold',
		borderColor: '#1167b1',
		color: '#1167b1',
		fontSize: 20,
		marginRight: 10,
	},
	contentBlock: {
		flexDirection: 'column',
		flexShrink: 1
	},

	title: {
		fontWeight: 'bold',
		marginBottom: 4
	},
	date: {
		marginBottom: 8,
	}
});

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.reviewBlock}>

			<Text style={styles.rating}>{review.rating}</Text>
			
			<View style={styles.contentBlock}>
				<Text style={styles.title}>{review.user.username}</Text>
				<Text style={styles.date}>{format(new Date(review.createdAt), 'MM.dd.yyyy')}</Text>
				<Text>{review.text}</Text>				
			</View>

		</View>
	);
}

export default ReviewItem;

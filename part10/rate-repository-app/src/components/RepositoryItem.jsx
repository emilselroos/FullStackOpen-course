import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 10,
		marginRight: 20,
	},


	title: {
		fontWeight: 'bold',
		fontSize: theme.fontSizes.subheading,
		marginBottom: 6,
	},
	description: {
		marginBottom: 6,
	},


	languageBlock: {
		backgroundColor: '#1167b1',
		color: '#FFFFFF',
		padding: 8,
		borderRadius: 12,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	info: {
		flexDirection: 'row',
		marginBottom: 28,
	},
	details: {
		flexDirection: 'column',
		flexShrink: 1
	},
	stats: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	statsBlock: {
		alignItems: 'center',
		width: 80,
	}
});

const RepositoryItem = ({ item }) => {

	const kFormatter = (num) => {
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}

	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
				<View style={styles.details}>
					<Text style={styles.title} testID="name">{item.fullName}</Text>
					<Text style={styles.description} testID="description">{item.description}</Text>
					<Text style={styles.languageBlock} testID="language">{item.language}</Text>
				</View>
			</View>
			
			<View style={styles.stats}>
				<View style={styles.statsBlock}>
					<Text fontWeight={'bold'} style={{ marginBottom: 4 }} testID="stars">{kFormatter(item.stargazersCount)}</Text>
					<Text>Stars</Text>
				</View>
				<View style={styles.statsBlock}>
					<Text fontWeight={'bold'} style={{ marginBottom: 4 }} testID="forks">{kFormatter(item.forksCount)}</Text>
					<Text>Forks</Text>
				</View>
				<View style={styles.statsBlock}>
					<Text fontWeight={'bold'} style={{ marginBottom: 4 }} testID="reviews">{item.reviewCount}</Text>
					<Text>Reviews</Text>
				</View>
				<View style={styles.statsBlock}>
					<Text fontWeight={'bold'} style={{ marginBottom: 4 }} testID="ratings">{item.ratingAverage}</Text>
					<Text>Rating</Text>
				</View>
			</View>
		</View>
	);
};

export default RepositoryItem;
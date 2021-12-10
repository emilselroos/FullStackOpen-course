import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TextBase } from 'react-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'lightgrey'
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {

	// Get the nodes from the edges array
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	const renderItem = ({ item }) => {
		// const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
		// const color = item.id === selectedId ? 'white' : 'black';
		return (
		  <RepositoryItem
			item={item}
		  />
		);
	};

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
}

const RepositoryList = () => {
	const { repositories } = useRepositories();
	return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
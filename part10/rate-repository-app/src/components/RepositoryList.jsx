import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FlatList, View, StyleSheet, TextBase, Pressable, TextInput } from 'react-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'lightgrey'
	},
	dropdown: {
		padding: 30,
	},
	searchBar: {
		padding: 15,
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, sortType, setSortType, searchText, setSearchKeyword, onEndReach }) => {

	const history = useHistory();

	// Get the nodes from the edges array
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	const handleRepositoryClick = (repositoryId) => {
		history.push(`/repository/${repositoryId}`);
	}

	const renderItem = ({ item }) => {
		// const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
		// const color = item.id === selectedId ? 'white' : 'black';
		return (
			<Pressable onPress={() => handleRepositoryClick(item.id)}>
				<RepositoryItem
					item={item}
					extended={false}
				/>				
			</Pressable>

		);
	};

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}

			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}

			ListHeaderComponent={<>
				<Picker
					selectedValue={sortType}
					onValueChange={(itemValue, itemIndex) =>
						setSortType(itemValue)
					}
					style={styles.dropdown}
				>
					<Picker.Item label="Latest repositories" value={{
						orderBy: "CREATED_AT",
						orderDirection: "DESC",
					}}/>
					<Picker.Item label="Highest rated repositories" value={{
						orderBy: "RATING_AVERAGE",
						orderDirection: "DESC",
					}} />
					<Picker.Item label="Lowest rated repositories" value={{
						orderBy: "RATING_AVERAGE",
						orderDirection: "ASC",
					}} />
				</Picker>
				<ItemSeparator />
				<TextInput
					style={styles.searchBar}
					onChangeText={setSearchKeyword}
					value={searchText}
					placeholder='Search...'
				/>
				<ItemSeparator />
			</>}
		/>
	);
}

const RepositoryList = () => {

	const [ sortType, setSortType ] = useState({
		orderBy: "CREATED_AT",
		orderDirection: "DESC",
	});
	const [ searchText, setSearchKeyword ] = useState('');
	const [ searchKeyword ] = useDebounce(searchText, 500);

	const { repositories, fetchMore } = useRepositories({
		first: 3,
		orderBy: sortType.orderBy,
		orderDirection: sortType.orderDirection,
		searchKeyword: searchKeyword,
	});

	const onEndReach = () => {
		fetchMore();
		console.log('You have reached the end of the list');
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			setSortType={setSortType}
			sortType={sortType}
			setSearchKeyword={setSearchKeyword}
			searchText={searchText}
			onEndReach={onEndReach}
		/>
	);
};

export default RepositoryList;
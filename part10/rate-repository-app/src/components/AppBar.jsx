import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';

import theme from '../theme';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: Constants.statusBarHeight * 2,
		paddingBottom: 20,
		paddingLeft: 10,
		backgroundColor: theme.colors.backgroundColor,
		textAlign: 'left',
	},
});

const AppBar = () => {

	const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
		fetchPolicy: 'cache-and-network',
	});

	if (loading) {
		return <Text>Loading...</Text>;
	}

  	return (
		<View style={styles.container}>
			<ScrollView horizontal>

				{data.authorizedUser === null && (
					<>
						<AppBarTab title="Repositories" path="/" />
						<AppBarTab title="Sign in" path="/signin" />
					</>
				)}

				{data.authorizedUser !== null && (
					<>
						<AppBarTab title="Repositories" path="/" />
						<SignOutTab />
					</>
				)}
			
			</ScrollView>
		</View>
  	);
};

export default AppBar;

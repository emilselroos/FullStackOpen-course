import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import AppBarTab from './AppBarTab';

import theme from '../theme';

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
  	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab title="Repositories" path="/" />
				<AppBarTab title="Sign in" path="/signin" />			
			</ScrollView>
		</View>
  	);
};

export default AppBar;

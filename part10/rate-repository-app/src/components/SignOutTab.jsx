import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

import theme from '../theme';

const SignOutTab = ({}) => {

	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const handleSignOut = async () => {
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	}
	
  return (
	<Pressable onPress={handleSignOut}>
		<Text style={{ color: 'white', fontWeight: 'bold', fontSize: theme.fontSizes.subheading, padding: 8 }}>Sign out</Text>
	</Pressable>
  );
};

export default SignOutTab;
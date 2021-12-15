import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

import theme from '../theme';

const AppBar = ({ title, path }) => {
  return (
	<Pressable>
		<Link to={path}>
			<Text style={{ color: 'white', fontWeight: 'bold', fontSize: theme.fontSizes.subheading, padding: 8 }}>{title}</Text>
		</Link>
	</Pressable>
  );
};

export default AppBar;
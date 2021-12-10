import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	field: {
		padding: 12,
		margin: 10,
		borderRadius: 10,
		borderWidth: 1,
		fontSize: 20,
	}
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={styles.field} {...props} />;
};

export default TextInput;
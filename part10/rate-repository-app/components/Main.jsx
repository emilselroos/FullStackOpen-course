import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect, Switch, Route } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
	  <Switch>
			<Route path="/" exact>
				<RepositoryList />
			</Route>
			<Route path="/signin">
				<SignIn />
			</Route>
			<Redirect to="/" />
	  </Switch>
    </View>
  );
}

export default Main;

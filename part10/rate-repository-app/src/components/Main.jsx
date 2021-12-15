import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect, Switch, Route } from 'react-router-native';

import AppBar from './AppBar';
import CreateReview from './CreateReview';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
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

      <Route path="/repository/:id">
				<SingleRepository />
			</Route>

      <Route path="/create-review">
				<CreateReview />
			</Route>

			<Route path="/signup">
				<SignUp />
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

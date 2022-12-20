import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {client} from './src/gql/client';
import Launches from './src/screens/Launches';
import {ApolloProvider} from '@apollo/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>SpaceX App</Text>
          <Launches />
        </SafeAreaView>
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

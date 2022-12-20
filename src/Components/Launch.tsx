import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';

import {client} from '../gql/client';
import gql from 'graphql-tag';

const FETCH_LAUNCHES_QUERY = gql`
  {
    launches {
      id
      mission_name
      launch_year
    }
  }
`;

const UPDATE_LAUNCH_MUTATION = gql`
  mutation UpdateLaunch($id: ID!, $missionName: String!) {
    updateLaunch(id: $id, missionName: $missionName) {
      id
      mission_name
      launch_year
    }
  }
`;

const Launches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const {data} = await client.query({
          query: FETCH_LAUNCHES_QUERY,
        });
        setLaunches(data.launches);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  const updateLaunch = async (id, missionName) => {
    try {
      const result = await client.mutate({
        mutation: UPDATE_LAUNCH_MUTATION,
        variables: {
          id,
          missionName,
        },
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {launches.map(launch => (
        <View key={launch.id} style={styles.launchContainer}>
          <Text style={styles.field}>ID: {launch.id}</Text>
          <Text style={styles.missionName}>
            Mission name: {launch.mission_name}
          </Text>
          <Text style={styles.field}>Launch year: {launch.launch_year}</Text>
          <Button
            title="Update mission name"
            onPress={() => updateLaunch(launch.id, 'New mission name')}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  launchContainer: {
    padding: 16,
  },
  missionName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  field: {
    fontSize: 16,
  },
});

export default Launches;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {client} from '../gql/client';
import gql from 'graphql-tag';

interface LaunchProps {
  id: string;
  mission_name: string;
  launch_year: number;
}

const FETCH_LAUNCHES_QUERY = gql`
  {
    launches {
      id
      mission_name
      launch_year
    }
  }
`;

const Launches: React.FC<LaunchProps> = () => {
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

  const updateLaunch = (id: string, missionName: string) => {
    const updatedLaunches = launches.map(launch => {
      if (launch.id === id) {
        return {...launch, mission_name: missionName};
      }
      return launch;
    });
    setLaunches(updatedLaunches);
  };

  const deleteLaunch = (id: string) => {
    const updatedLaunches = launches.filter(launch => launch.id !== id);
    setLaunches(updatedLaunches);
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {launches.map((launch, idx) => (
          <View key={idx} style={styles.launchContainer}>
            <Text style={styles.field}>ID: {launch.id}</Text>
            <Text style={styles.missionName}>
              Mission name: {launch.mission_name}
            </Text>
            <Text style={styles.field}>Launch year: {launch.launch_year}</Text>
            <Button
              title="Update mission name"
              onPress={() => updateLaunch(launch.id, 'New mission Name')}
              color="blue"
            />
            <Button
              title="Delete launch"
              onPress={() => deleteLaunch(launch.id)}
              color="red"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  launchesContainer: {
    backgroundColor: '#fff',
  },
  launchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  missionName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  field: {
    fontSize: 16,
  },
  updateButton: {
    marginTop: 8,
    backgroundColor: 'blue',
    color: '#fff',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
    color: '#fff',
  },
});

export default Launches;

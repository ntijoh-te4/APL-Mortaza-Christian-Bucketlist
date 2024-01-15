import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBar/>
      <h1>Bucketlist: Din lösning för Todos</h1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

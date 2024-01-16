import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';
import AddForm from './components/AddForm';
import ItemList from './components/ItemList';

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBar/>
      <AddForm/>
      <ItemList/>
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

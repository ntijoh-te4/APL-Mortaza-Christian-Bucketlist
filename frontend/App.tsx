import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';
import AddForm from './components/AddForm';
import ItemList from './components/ItemList';

export default function App() {

  const [fakeItems, setItems] = useState([
    { id: 1, description: "Drive Jetski" },
    { id: 2, description: "Skydive" },
    { id: 3, description: "Become president" },
  ]);

  function deleteItem(id: number): void {
    console.log('delete', id)
  }


  return (
    <View style={styles.container}>
      <SearchBar/>
      <AddForm/>
      <ItemList fakeItems={fakeItems} onDelete={deleteItem}/>
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

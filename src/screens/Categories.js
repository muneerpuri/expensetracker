import React, {useCallback, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text, TextInput, Button, Appbar, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createCategory} from '../utils/createCategory';
import {useSelector} from 'react-redux';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const user = useSelector(state => state.general.user);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation()

  async function getAllCategories() {
    try {
      const categoryData = await firestore()
        .collection('Categories')
        .where('userId', '==', user?.uid)
        .get();
      console.log(categoryData?.docs, 'categoryData');
      setCategories(categoryData?.docs);
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddCategory = async () => {
    if (name.trim() && description.trim()) {
      const newItem = await createCategory({
        name,
        description,
        userId: user?.uid,
      });
      console.log('new created category', newItem);
      setName('');
      setDescription('');
      setShowForm(false);
      getAllCategories();
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getAllCategories();
      }
    }, [user]),
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.Content title="Categories" />
        <Appbar.Action icon="plus" onPress={() => setShowForm(true)} />
      </Appbar.Header>

      {/* Category List */}
      {!showForm ? (
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card style={styles.card} onPress={() => navigation.navigate('Expenses', {id: item.id})}>
              <Card.Content>
                <Text variant="titleMedium">{item.data().name}</Text>
                <Text variant="bodySmall" style={styles.description}>
                  {item.data().description}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      ) : (
        // Add New Category Form
        <View style={styles.formContainer}>
          <TextInput
            label="Category Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddCategory}
            style={styles.saveButton}>
            Save
          </Button>
          <Button mode="text" onPress={() => setShowForm(false)}>
            Cancel
          </Button>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  description: {
    marginTop: 5,
    color: 'gray',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default Categories;

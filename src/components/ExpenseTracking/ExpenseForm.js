import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/reducer/reducer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-paper-dropdown';
function ExpenseForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Shopping', value: 'Shopping' }
  ]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleAddExpense = () => {
    if (amount && category && description) {
      dispatch(addExpense({ amount, category, description, date, image: imageBase64 }));
  
      // Reset form fields after submission
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date());
      setImageBase64(null);
      setNewCategory('');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        setImageBase64(response.assets[0].base64);
      }
    });
  };

  const addNewCategory = () => {
    if (newCategory.trim() !== '' && !categories.find(cat => cat.value === newCategory)) {
      const newCategoryObj = { label: newCategory, value: newCategory };
      setCategories([...categories, newCategoryObj]);
      setCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Amount</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text>Category</Text>
      <Dropdown
        placeholder="Select a category"
        mode="outlined"
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={category}
        onSelect={setCategory}
        options={categories} // Ensure this is an array of objects
      />

      <Text>Add New Category</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginBottom: 10 }}
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <Button title="Add" onPress={addNewCategory} />
      </View>

      <Text>Description</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={description}
        onChangeText={setDescription}
      />

      <Text>Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginBottom: 10 }}>
        <Text style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      <Text>Attach Image</Text>
      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 10 }}>
        <Text style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}>
          {imageBase64 ? 'Image Selected' : 'Pick an Image'}
        </Text>
      </TouchableOpacity>

      {imageBase64 && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
      )}

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}

export default ExpenseForm;

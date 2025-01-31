import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/reducer/reducer';

function ExpenseForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  
  const handleAddExpense = () => {
    if (amount && category && description) {
      dispatch(addExpense({ amount, category, description, date }));
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
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={category}
        onChangeText={setCategory}
      />
      <Text>Description</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={description}
        onChangeText={setDescription}
      />
      <Text>Date</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={date.toString()}
        onChangeText={text => setDate(new Date(text))}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}

export default ExpenseForm;
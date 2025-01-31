import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setBudget } from '../../store/reducer/reducer';

function BudgetForm() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleSetBudget = () => {
    if (category && budgetAmount) {
      dispatch(setBudget({ category, budgetAmount }));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Category</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={category}
        onChangeText={setCategory}
      />
      <Text>Set Monthly Budget</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={budgetAmount}
        onChangeText={setBudgetAmount}
        keyboardType="numeric"
      />
      <Button title="Set Budget" onPress={handleSetBudget} />
    </View>
  );
}

export default BudgetForm;

import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

function BudgetTracker() {
  const budgets = useSelector(state => state.general.budgets);

  return (
    <View style={{ padding: 20 }}>
      {budgets.map((budget, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text>Category: {budget.category}</Text>
          <Text>Budget: {budget.amount}</Text>
          <Text>Spent: {budget.spent}</Text>
        </View>
      ))}
    </View>
  );
}

export default BudgetTracker;

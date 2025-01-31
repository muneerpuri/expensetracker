import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

function ExpenseList() {
  const expenses = useSelector(state => state.general.expenses);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{JSON.stringify(expenses)}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Amount: {item.amount}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Date: {item.date.toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default ExpenseList;

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

function ExpenseList({expenses}) {

  const renderExpenseItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.amount}>₹ {item.data().amount}</Text>
        <Text style={styles.category}>Category: {item.data().category}</Text>
        <Text style={styles.description}>{item.data().description}</Text>
        <Text style={styles.date}>
          Date: {new Date(item.data().date).toLocaleDateString()}
        </Text>
        {item.data().image && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${item.data().image}` }}
            style={styles.data().image}
          />
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense List</Text>
      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>No expenses added yet.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderExpenseItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009688',
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginTop: 10,
  },
});

export default ExpenseList;

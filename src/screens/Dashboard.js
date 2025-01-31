import React from 'react'
import { ScrollView, Text } from 'react-native'
import {  useSelector } from 'react-redux';
import ExpenseForm from '../components/ExpenseTracking/ExpenseForm';
import ExpenseList from '../components/ExpenseTracking/ExpenseList';

function Dashboard() {
    const user = useSelector(state => state.general.user);
  return (
    <ScrollView>
    <ExpenseForm />
    <ExpenseList />
  </ScrollView>
  )
}

export default Dashboard
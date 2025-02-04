import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ExpenseForm from '../components/ExpenseTracking/ExpenseForm';
import ExpenseList from '../components/ExpenseTracking/ExpenseList';
import firestore from '@react-native-firebase/firestore';

function Dashboard({route}) {
  const [expenses, setExpenses] = useState([]);
  const {id} = route.params;
  const user = useSelector(state => state.general.user);

  async function getAllExpenses() {
    try {
      const expensesData = await firestore()
        .collection('Expenses')
        .where('userId', '==', user?.uid)
        .where('categoryId', '==', id)
        .get();
      setExpenses(expensesData?.docs());
    } catch (e) {
      console.log(e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getAllExpenses();
      }
    }, [user]),
  );
  return (
    <ScrollView>
      <ExpenseForm />
      <ExpenseList expenses={expenses} />
    </ScrollView>
  );
}

export default Dashboard;

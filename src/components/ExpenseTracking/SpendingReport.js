import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

function SpendingReport() {
  const expenses = useSelector(state => state.general.expenses);  

  const data = {
    labels: expenses.map(exp => exp.category),
    datasets: [
      {
        data: expenses.map(exp => exp.amount),
      },
    ],
  };

  return (
    <View style={{ padding: 20 }}>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        }}
        bezier
      />
    </View>
  );
}

export default SpendingReport;

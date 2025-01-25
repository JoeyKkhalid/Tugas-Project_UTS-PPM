import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export const CreateGoalScreen = () => {
  const [goalName, setGoalName] = useState('');
  const [amount, setAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const handleCreateGoal = () => {
    const numericAmount = parseFloat(amount);
    const numericContribution = parseFloat(monthlyContribution);

    if (!goalName || isNaN(numericAmount) || isNaN(numericContribution) || numericAmount <= 0 || numericContribution <= 0) {
      Alert.alert('Validation Error', 'Please fill all fields with valid numbers.');
      return;
    }

    const monthsToSave = Math.ceil(numericAmount / numericContribution);
    Alert.alert(
      'Goal Created!',
      `You will save $${numericAmount} by ${monthsToSave} months.`
    );

    // Reset input fields
    setGoalName('');
    setAmount('');
    setMonthlyContribution('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your new saving goal!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your plan"
        value={goalName}
        onChangeText={setGoalName}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Monthly Contribution</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter monthly contribution"
        value={monthlyContribution}
        onChangeText={setMonthlyContribution}
        keyboardType="numeric"
      />

      <Text style={styles.summary}>
        {amount && monthlyContribution
          ? `You will save $${amount} in approximately ${Math.ceil(
              parseFloat(amount) / parseFloat(monthlyContribution)
            )} months`
          : 'Fill the fields to see the result'}
      </Text>

      <Button title="Create Goal" onPress={handleCreateGoal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  summary: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

// Tipe data untuk expense
type Expense = {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
};

const API_URL = 'http://192.168.43.105:3000/expenses';

const ExpenseTracker: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch expenses dari API saat komponen dimuat
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get<Expense[]>(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      Alert.alert('Error', 'Failed to fetch expenses');
    }
  };

  const handleSubmit = async () => {
    const expenseData = {
      name,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (!name || !amount || !category || !date) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    try {
      if (isEditing && editId !== null) {
        // Update expense
        await axios.put(`${API_URL}/${editId}`, expenseData);
        Alert.alert('Success', 'Expense updated successfully');
      } else {
        // Create new expense
        await axios.post(API_URL, expenseData);
        Alert.alert('Success', 'Expense added successfully');
      }
      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert('Error', 'Failed to save expense');
    }
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setCategory('');
    setDate('');
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (expense: Expense) => {
    setName(expense.name);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
    setIsEditing(true);
    setEditId(expense.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Alert.alert('Success', 'Expense deleted successfully');
      fetchExpenses(); // Refresh daftar setelah penghapusan
    } catch (error) {
      console.error('Error deleting expense:', error);
      Alert.alert('Error', 'Failed to delete expense');
    }
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseText}>
        {item.name} - ${item.amount} ({item.category}) on {item.date}
      </Text>
      <View style={styles.expenseActions}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title={isEditing ? 'Update Expense' : 'Add Expense'} onPress={handleSubmit} />
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  expenseItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseText: {
    fontSize: 16,
  },
  expenseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ExpenseTracker;

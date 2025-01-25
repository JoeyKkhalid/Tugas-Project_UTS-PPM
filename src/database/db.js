import SQLite from 'react-native-sqlite-storage';

// Open the SQLite database (creates if it doesn't exist)
const db = SQLite.openDatabase(
  { name: 'goals.db', location: 'default' },
  () => console.log('Database opened successfully'),
  (error) => console.log('Error opening database:', error)
);

// Function to create the "goals" table if it doesn't exist
const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, goalName TEXT, amount INTEGER, monthlyContribution INTEGER)',
      [],
      () => console.log('Table created successfully'),
      (error) => console.log('Error creating table:', error)
    );
  });
};

// Function to insert a new goal
const insertGoal = (goalName, amount, monthlyContribution) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO goals (goalName, amount, monthlyContribution) VALUES (?, ?, ?)',
        [goalName, amount, monthlyContribution],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Function to fetch all goals
const fetchGoals = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM goals',
        [],
        (_, results) => {
          let rows = results.rows.raw();
          resolve(rows);
        },
        (_, error) => reject(error)
      );
    });
  });
};

// Function to delete a goal by id
const deleteGoal = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM goals WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Exporting the functions
export default {
  createTable,
  insertGoal,
  fetchGoals,
  deleteGoal,
};

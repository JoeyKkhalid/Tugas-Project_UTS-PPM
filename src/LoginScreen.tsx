// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

// const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

//   const handleLogin = () => {
//     console.log('Entered username:', username);
//     console.log('Entered password:', password);
//     if (username === 'admin' && password === 'password') {
//       navigation.replace('Main');
//     } else {
//       Alert.alert('Error', 'Invalid username or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//   },
// });

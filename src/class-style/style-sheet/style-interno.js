import { Text, View, StyleSheet, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'android' ? 'blue' : 'red',
  },
  title: {
    color: 'yellow',
    fontSize: 50,
    fontWeight: 'bold',
  },
});

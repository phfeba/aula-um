import { Text, View } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      }}
    >
      <Text style={{ color: 'yellow', fontSize: 50, fontWeight: 'bold' }}>
        hello world
      </Text>
    </View>
  );
}

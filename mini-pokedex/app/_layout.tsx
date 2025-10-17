import { Stack } from 'expo-router';
import Colors from '../constants/Colors';

export default function RootLayout() {
  return (
    // Stack controla as telas principais e o modal
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTitleStyle: { color: Colors.text },
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          title: 'Detalhes do Pokémon',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}

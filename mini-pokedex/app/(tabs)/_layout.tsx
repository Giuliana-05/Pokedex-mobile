import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function TabsLayout() {
  return (
    // Tabs cria a navegação por abas na parte inferior
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: '#999',
        headerStyle: { backgroundColor: Colors.background },
        headerTitleStyle: { color: Colors.text },
        tabBarStyle: { backgroundColor: Colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokédex',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

interface Props {
  name: string;
  onPress: () => void;
}

export default function PokemonCard({ name, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  name: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

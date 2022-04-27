import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface EmptyListIndicatorProps {
  text: string;
}

/**
 * EmptyListIndicator Component
 */
export const EmptyListIndicator: React.FC<EmptyListIndicatorProps> = ({
  text,
}) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyListIndicator;

const styles = StyleSheet.create({
  text: {
    fontStyle: 'italic',
  },
});

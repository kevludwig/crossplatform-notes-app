import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ModalHeaderProps {
  title: string;
}

/**
 * ModalHeader Component
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  headerContainer: { paddingTop: 10, paddingHorizontal: 10 },
  headerText: { fontSize: 25, fontWeight: 'bold' },
});

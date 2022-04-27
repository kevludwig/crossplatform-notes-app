import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { QueryClientProvider } from 'react-query';
import NoteList from './src/components/NoteList/NoteList';
import queryClient from './src/lib/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <NoteList />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({ container: { flex: 1 } });

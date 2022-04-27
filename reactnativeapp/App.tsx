import React from 'react';
import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './src/components/Header';
import NoteList from './src/components/NoteList/NoteList';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Notes" />
        <NoteList />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;

import axios from 'axios';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { Notes } from '../../types';
import NoteListItem from '../NoteListItem';
import EmptyListIndicator from '../Ui/EmptyListIndicator';
import Header from '../Ui/Header';

const getNotes = async (): Promise<Notes> => {
  const data = await axios.get('http://localhost:3000/notes');
  console.log(data.data);
  return data.data;
};

/**
 * NoteList Component
 */
export const NoteList: React.FC = () => {
  const { data, refetch, isLoading } = useQuery('notes', getNotes);

  return (
    <FlatList
      ListHeaderComponent={<Header title="Notes" />}
      style={styles.container}
      onRefresh={refetch}
      refreshing={isLoading}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <NoteListItem note={item} />}
      ListEmptyComponent={<EmptyListIndicator text="No notes found" />}
    />
  );
};

export default NoteList;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
});

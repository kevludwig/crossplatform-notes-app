import axios from 'axios';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { Notes } from '../../types';
import NoteListItem from '../NoteListItem';

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
      style={{ flex: 1, paddingHorizontal: 10 }}
      onRefresh={refetch}
      refreshing={isLoading}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <NoteListItem note={item} />}
      ListEmptyComponent={
        <View>
          <Text style={{ fontStyle: 'italic' }}>No notes</Text>
        </View>
      }
    />
  );
};

export default NoteList;

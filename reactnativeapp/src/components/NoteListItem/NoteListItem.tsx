import axios from 'axios';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { Note } from '../../types';
import UpdateNoteModal from '../UpdateNoteModal';

export interface NoteListItemProps {
  note: Note;
}

const deleteNote = async (id: string) => {
  const data = await axios.delete(`http://localhost:3000/notes/${id}`);
  console.log(data.data);
  return data.data;
};

/**
 * NoteListItem Component
 */
export const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutate } = useMutation(deleteNote, {
    onSuccess: data => {
      console.log('success', data);
    },
    onError: () => {
      console.log('error');
    },
    onSettled: () => {
      queryClient.refetchQueries('notes');
    },
  });
  return (
    <>
      <View
        style={{
          backgroundColor: 'lightgrey',
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ flex: 4, paddingRight: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{note.title}</Text>
          <Text numberOfLines={3} ellipsizeMode="tail">
            {note.body}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flex: 1,
            borderLeftWidth: 1,
            alignItems: 'center',
          }}
          onPress={() => {
            mutate(note.id);
          }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      <UpdateNoteModal
        note={note}
        open={modalVisible}
        setOpen={setModalVisible}
      />
    </>
  );
};

export default NoteListItem;

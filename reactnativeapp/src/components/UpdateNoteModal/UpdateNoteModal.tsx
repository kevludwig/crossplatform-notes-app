import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { Note } from '../../types';
import Header from '../Header';

export interface UpdateNoteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  note: Note;
}

const updateNote = async (note: Note) => {
  const data = await axios.put(`http://localhost:3000/notes/${note.id}`, note);
  console.log(data.data);
  return data.data;
};

/**
 * UpdateNoteModal Component
 */
export const UpdateNoteModal: React.FC<UpdateNoteModalProps> = ({
  open,
  setOpen,
  note,
}) => {
  const [title, setTitle] = useState(note.title ?? '');
  const [body, setBody] = useState(note.body ?? '');
  const { mutate } = useMutation(updateNote, {
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
    <Modal
      visible={open}
      onRequestClose={() => setOpen(false)}
      animationType="slide"
      presentationStyle="pageSheet">
      <View style={{ paddingTop: 10 }}>
        <Header title={note.title} withoutModal />
      </View>
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            paddingVertical: 10,
            paddingHorizontal: 15,
            height: 50,
            borderRadius: 25,
          }}
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={{
            marginTop: 15,
            backgroundColor: 'lightgrey',
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 15,
            height: 200,
            borderRadius: 25,
          }}
          multiline
          numberOfLines={10}
          maxLength={500}
          placeholder="Body"
          value={body}
          onChangeText={text => setBody(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={async () => {
              mutate({ id: note.id, title, body });
              setOpen(false);
            }}
            style={{
              backgroundColor: 'grey',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 25,
            }}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateNoteModal;

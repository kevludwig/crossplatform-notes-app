import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import Header from '../Header';

export interface CreateNoteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const createNote = async (note: { title: string; body: string }) => {
  const data = await axios.post('http://localhost:3000/notes', note);
  console.log(data.data);
  return data.data;
};

/**
 * CreateNoteModal Component
 */
export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  open,
  setOpen,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { mutate } = useMutation(createNote, {
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
        <Header title="New Note" withoutModal />
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
            height: 300,
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
              mutate({ title, body });
              setTitle('');
              setBody('');
              setOpen(false);
            }}
            style={{
              backgroundColor: 'grey',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 25,
            }}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateNoteModal;

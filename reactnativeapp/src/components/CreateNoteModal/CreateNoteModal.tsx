import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useMutation } from 'react-query';
import queryClient from '../../lib/queryClient';
import { CreateNote } from '../../types';
import Button from '../Ui/Button';
import ModalHeader from '../Ui/ModalHeader/ModalHeader';
import TextInput from '../Ui/TextInput';

export interface CreateNoteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const createNote = async (note: CreateNote) => {
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
      <ModalHeader title="New Note" />
      <View style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.bodyInput}
          multiline
          numberOfLines={10}
          maxLength={500}
          placeholder="Body"
          value={body}
          onChangeText={text => setBody(text)}
        />
        <View style={styles.actionContainer}>
          <Button
            onPress={async () => {
              mutate({ title, body });
              setTitle('');
              setBody('');
              setOpen(false);
            }}
            text="Add"
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateNoteModal;

const styles = StyleSheet.create({
  content: { paddingHorizontal: 10, marginTop: 10 },
  titleInput: { height: 50 },
  bodyInput: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    height: 200,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

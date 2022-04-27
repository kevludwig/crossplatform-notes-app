import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useMutation } from 'react-query';
import { formatIso } from '../../lib/formatIso';
import queryClient from '../../lib/queryClient';
import { Note, UpdateNote } from '../../types';
import Button from '../Ui/Button';
import ModalHeader from '../Ui/ModalHeader/ModalHeader';
import TextInput from '../Ui/TextInput';

export interface NoteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  note: Note;
}

const updateNote = async (note: UpdateNote) => {
  const data = await axios.put(`http://localhost:3000/notes/${note.id}`, note);
  console.log(data.data);
  return data.data;
};

const deleteNote = async (id: string) => {
  const data = await axios.delete(`http://localhost:3000/notes/${id}`);
  console.log(data.data);
  return data.data;
};

/**
 * NoteModal Component
 */
export const NoteModal: React.FC<NoteModalProps> = ({
  open,
  setOpen,
  note,
}) => {
  const [title, setTitle] = useState(note.title ?? '');
  const [body, setBody] = useState(note.body ?? '');

  /**
   * Update note mutation
   */
  const { mutate: updateMutation } = useMutation(updateNote, {
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

  /**
   * Delete note mutation
   */
  const { mutate: deleteMutation } = useMutation(deleteNote, {
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
      <ModalHeader title={'Note: ' + '"' + note.title + '"'} />
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
            style={styles.deleteButton}
            onPress={async () => {
              deleteMutation(note.id);
              setOpen(false);
            }}
            text="Delete"
          />
          <Button
            onPress={async () => {
              updateMutation({ id: note.id, title, body });
              setOpen(false);
            }}
            text="Update"
          />
        </View>
        <View style={styles.datetimeContainer}>
          <Text style={styles.dateTimeContainerText}>
            Updated at {formatIso(note.updatedAt)}
          </Text>
          <Text style={styles.dateTimeContainerText}>
            Created at {formatIso(note.createdAt)}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default NoteModal;

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
  deleteButton: {
    marginRight: 10,
    backgroundColor: 'crimson',
  },
  datetimeContainer: {
    marginTop: 10,
  },
  dateTimeContainerText: {
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Note } from '../../types';
import NoteModal from '../NoteModal';

export interface NoteListItemProps {
  note: Note;
}

/**
 * NoteListItem Component
 */
export const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.title}>{note.title}</Text>
        <Text numberOfLines={3} ellipsizeMode="tail">
          {note.body}
        </Text>
      </TouchableOpacity>
      <NoteModal note={note} open={modalVisible} setOpen={setModalVisible} />
    </>
  );
};

export default NoteListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontWeight: 'bold', marginBottom: 2 },
});

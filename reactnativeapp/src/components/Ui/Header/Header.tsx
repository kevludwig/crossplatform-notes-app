import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CreateNoteModal from '../../CreateNoteModal';

export interface HeaderProps {
  title: string;
  withoutModal?: boolean;
}

/**
 * Header Component
 */
export const Header: React.FC<HeaderProps> = ({ title, withoutModal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View
        style={{
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{title}</Text>
        {!withoutModal && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: 50,
              paddingHorizontal: 15,
              borderRadius: 25,
              backgroundColor: 'lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>New Note</Text>
          </TouchableOpacity>
        )}
      </View>
      {!withoutModal && (
        <CreateNoteModal open={modalVisible} setOpen={setModalVisible} />
      )}
    </>
  );
};

export default Header;

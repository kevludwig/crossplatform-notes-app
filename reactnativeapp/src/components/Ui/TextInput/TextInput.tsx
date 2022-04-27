import React from 'react';
import {
  TextInput as RnTextInput,
  TextInputProps as RnTextInputProps,
} from 'react-native';

/**
 * TextInput Component
 */
export const TextInput: React.FC<RnTextInputProps> = ({ ...props }) => {
  return (
    <RnTextInput
      {...props}
      style={[
        {
          backgroundColor: 'lightgrey',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 25,
        },
        props.style,
      ]}
    />
  );
};

export default TextInput;

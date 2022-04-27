import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface ButtonProps {
  text: string;
}

/**
 * Button Component
 */
export const Button: React.FC<ButtonProps & TouchableOpacityProps> = ({
  text,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: 'grey',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 25,
        },
        props.style,
      ]}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

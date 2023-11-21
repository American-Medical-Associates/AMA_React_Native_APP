import React from 'react';
import { View } from 'react-native';

const DividerLine = () => {
  return (
    <View style={{
      height: 5, // Thin line
      backgroundColor: '#0008ff',
      width: '100%',
      marginVertical: 10, // Add some vertical margin for spacing
      borderRadius: 10,
    }} />
  );
};

export default DividerLine;

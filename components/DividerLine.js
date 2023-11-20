import React from 'react';
import { View } from 'react-native';

const DividerLine = () => {
  return (
    <View style={{
      height: 5, // Thin line
      backgroundColor: '#0008ff', // Light gray color
      width: '100%',
      marginVertical: 10, // Add some vertical margin for spacing
      borderRadius: 10
      // You can add other styles as needed
    }} />
  );
};

export default DividerLine;

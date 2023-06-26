import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function DividerLine({ lineColor, lineWidth }) {
  return (
    <View style={{ alignItems: "center", marginBottom: 10 }}>
      <View
        style={{
          backgroundColor: lineColor,
          width: lineWidth,
          height: 6,
          borderRadius: 50,
        }}
      />
    </View>
  );
}

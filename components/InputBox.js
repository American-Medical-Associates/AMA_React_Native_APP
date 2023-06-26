import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React from "react";

export function InputBox({
  width,
  color,
  placeholder,
  type,
  onChangeText,
  value,
  keyboardType,
}) {
  return (
    <View>
      <TextInput
        style={{
          borderRadius: 50,
          height: 60,
          width: width,
          borderColor: color,
          borderWidth: 2,
          marginBottom: 15,
          marginTop: 10,
          padding: 15,
          backgroundColor: "#C7C7C74D",
          // marginRight: 10,
        }}
        placeholder={placeholder}
        type={type}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        placeholderTextColor={"#51515188"}
        keyboardType={keyboardType}
      />
    </View>
  );
}
export default InputBox;

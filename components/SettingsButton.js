import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  Animated,
  TextInput,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
export default function SettingsButton({
  setting,
  onPressTrue,
  onPressFalse,
  text,
  width,
}) {
  return (
    <TouchableOpacity onPress={setting ? onPressTrue : onPressFalse}>
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 20,
          borderRadius: 20,
          width: width,
          backgroundColor: setting ? "#0008ff" : "#A9A9A9",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            padding: 2,
            color: setting ? "#ffffff" : "#000000",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

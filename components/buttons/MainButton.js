import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function MainButton({
  buttonColor,
  text,
  onPress,
  buttonWidth,
  style, // <-- Add this prop
}) {
  const defaultButtonColor = "#0008ff";

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View
        style={[
          styles.buttonStyle,
          {
            backgroundColor: buttonColor || defaultButtonColor,
            width: buttonWidth,
          },
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 12,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

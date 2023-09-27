import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

const BigSquareButton = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#0008ff",
        width: Dimensions.get("window").width / 2,
        height: 100,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        //add shadow
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};
export default BigSquareButton;

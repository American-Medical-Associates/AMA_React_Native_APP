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
export default function CompanyButton({
  companyTextLong,
  selectedCompany,
  onPressNull,
  onPress,
  companyTextShort,
}) {
  //
  if (selectedCompany == companyTextLong) {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressNull;
        }}
      >
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 20,
            borderRadius: 20,
            width: 80,
            backgroundColor: "#0008ff",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              padding: 2,
              color: "#ffffff",
            }}
          >
            {companyTextShort}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 20,
            borderRadius: 20,
            width: 80,
            backgroundColor: "#A9A9A9",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 20, padding: 2 }}>
            {companyTextShort}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

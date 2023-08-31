import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function LocationButton({ data, onSelect, value }) {
  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            key={item.value}
            style={item.value === value ? styles.selected : styles.unselected}
            onPress={() => onSelect(item.value)}
          >
            <Text style={styles.item}>{item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  unselected: {
    backgroundColor: "gray",
    margin: 5,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "blue",
    margin: 6,
    padding: 10,
    borderRadius: 10,
  },
  item: {
    color: "white",
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

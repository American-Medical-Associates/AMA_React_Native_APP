import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import BigSquareButton from "../components/buttons/BigSquareButton";
import { useNavigation } from "@react-navigation/native";

// TODO:
// Create each departments MIS button that routes to a seperate page with all the info on it.

const MisAverages = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <BigSquareButton
            style={styles.buttonDropDown}
            buttonText={"Internal Medicine MIS"}
            onPress={() => navigation.navigate("Internal Medicine Averages")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
});

export default MisAverages;

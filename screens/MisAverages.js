import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import BigSquareButton from "../components/buttons/BigSquareButton";

// TODO:
// - Grab data from all MIS sections.
// - Show the total number for each department
// - Add all the data together per quarter and display it
// - Calculate averages for each deptartment and all depertments combind.
// - onClick of button that when clicked a drop down will appear showing all the averages for that department.

const MisAverages = () => {
  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <BigSquareButton
            style={styles.buttonDropDown}
            buttonText={"Internal Medicine MIS"}
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

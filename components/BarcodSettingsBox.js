import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import InputBox from "./InputBox";
import React, { useState } from "react";
import CompanyButton from "./CompanyPickerButton";
import { selectCompany } from "../slices/globalSlice";

export default function BarcodSettingsBox({
  size,
  onPress1,
  onPress2,
  onPress3,
  onPressNull,
  selectedCompany,
  companyText1,
  companyText2,
  companyText3,

  companyTextLong1,
  companyTextLong2,
  companyTextLong3,
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [AMAcompanyButton, setAMACompanyButton] = useState(null);
  //   const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //   const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  //   const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const toggleToDeleteItem = () => {
    if (isEnabled)
      return (
        <Text style={[styles.deleteItemText]}>Toggle to stop deleting</Text>
      );
    else return <Text style={[styles.deleteItemText]}>Toggle to delete</Text>;
  };
  const toggleToAddItem = () => {
    if (isEnabled1)
      return <Text style={styles.addItemText}>Toggle to use product</Text>;
    else
      return <Text style={[styles.addItemText]}>Toggle to scan new item</Text>;
  };
  return (
    <View
      style={{
        backgroundColor: "#858585AF",
        flexDirection: "column",
        flex: 2,
        alignSelf: "flex-end",
        alignItems: "flex-end",
        // width: 800,
        borderRadius: 25,
        height: size,
        // marginLeft: 550,
        justifyContent: "flex-start",
        marginRight: 20,
        marginBottom: 30,
      }}
    >
      <View style={styles.optionview2}>
        <View style={styles.switchView2}>
          <Text style={styles.removeItemText}>Toggle to add existing item</Text>
          <Switch
            style={styles.switch2}
            trackColor={{ false: "#767577", true: "#0008ff" }}
            thumbColor={isEnabled2 ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />

          <View style={styles.addItemText}>{toggleToAddItem()}</View>

          <Switch
            style={styles.switch2}
            trackColor={{ false: "#767577", true: "#0008ff" }}
            thumbColor={isEnabled1 ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
          <View style={styles.deleteItemText}>{toggleToDeleteItem()}</View>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#FF0000" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.textInputView}>
        <TextInput
          style={styles.inputfeild3}
          placeholder="Product Name"
          type="Product Name"
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <TextInput
          style={styles.inputfeild1}
          placeholder="Product description"
          type="Product decription"
          onChangeText={(text) => setDecription(text)}
        ></TextInput>
        {/* <Picker
                style={{
                  height: 190,
                  width: Dimensions.get("screen").width / 9,
                  //backgroundColor: "#537F7F",
                  // marginBottom: 90,
                  padding: 0,
                }}
                itemStyle={{
                  fontSize: 15,
                  margin: 1,
                  padding: 2,
                  fontWeight: "bold",
                }}
                selectedValue={selectedCompany}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCompany(itemValue)
                }
                mode={"dropdown"}
              >
                <Picker.Item label="AMA" value="AMA" />
                <Picker.Item label="VMS" value="Vitalize Med Spa" />
                <Picker.Item label="VIC" value="Vitalize Infusion" />
              </Picker> */}
        <View style={{ flexDirection: "column" }}>
          <CompanyButton
            companyTextShort={companyText1}
            onPress={onPress1}
            onPressNull={onPressNull}
            selectedCompany={selectedCompany}
            companyTextLong={companyTextLong1}
          />
          <CompanyButton
            companyTextShort={companyText2}
            onPress={onPress2}
            onPressNull={onPressNull}
            selectedCompany={selectedCompany}
            companyTextLong={companyTextLong2}
          />
          <CompanyButton
            companyTextShort={companyText3}
            onPress={onPress3}
            onPressNull={onPressNull}
            selectedCompany={selectedCompany}
            companyTextLong={companyTextLong3}
          />

          {/* {AMAcompanyButton()}
          {VMScompanyButton()}
          {VICcompanyButton()} */}
        </View>

        {/* <TextInput
                style={styles.inputfeild2}
                placeholder="Company"
                type="Company"
                onChangeText={(text) => setCompany(text)}
              ></TextInput> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#F1F1F1EA",
    padding: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: 350,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  barcode: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#5A5858AF",
    fontSize: 20,
  },
  product: {
    fontSize: 24,
    justifyContent: "center",
    alignSelf: "center",
    color: "#000000CE",
  },
  inputfeild1: {
    borderRadius: 50,
    height: 65,
    width: 350,
    borderColor: "#0008ff",
    borderWidth: 2,
    marginBottom: 15,
    marginTop: 10,
    padding: 20,
    alignSelf: "flex-end",
    backgroundColor: "#C7C7C74D",
    marginRight: 10,
  },
  inputfeild2: {
    borderRadius: 50,
    height: 65,
    width: 150,
    borderColor: "#0008ff",
    borderWidth: 2,
    // marginBottom: 20,
    marginBottom: 15,
    marginTop: 10,
    padding: 20,
    alignSelf: "flex-end",
    marginRight: 30,
    backgroundColor: "#C7C7C74D",
  },
  inputfeild3: {
    borderRadius: 50,
    height: 65,
    width: 300,
    borderColor: "#0008ff",
    borderWidth: 2,
    // marginBottom: 20,
    marginBottom: 15,
    marginTop: 10,
    padding: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    backgroundColor: "#C7C7C74D",
  },
  textInputView: {
    // backgroundColor: "#858585AF",
    justifyContent: "flex-end",
    // width: 600,
    flex: 0,
    // backgroundColor: "blue",
    flexDirection: "row",
    // height: 200,
    // marginBottom: 30,
    // borderRadius: 50,
    // flexWrap: "nowrap",
    // alignItems: "center",
  },

  switchContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  optionview2: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "#858585AF",
    // width: 800,
  },
  switch: {
    alignSelf: "flex-end",
    marginBottom: 30,
    marginRight: 40,
  },
  deleteItemText: {
    alignSelf: "flex-end",
    marginBottom: 18,
    marginRight: 10,
    fontSize: 18,
  },
  switchView2: {
    flex: 2,
    //alignSelf: "flex-end",
    flexDirection: "row",
    // justifyContent: "flex-start",
    // backgroundColor: "#CE2222",
    // marginLeft: 0,
    // flexWrap: "nowrap",
  },
  switch2: {
    alignSelf: "flex-end",
    marginBottom: 30,
    marginRight: 30,
    justifyContent: "flex-end",
    // marginLeft: 200,
  },
  addItemText: {
    alignSelf: "flex-end",
    marginBottom: 18,
    marginRight: 10,
    fontSize: 18,
    // marginLeft: 200,
  },
  removeItemText: {
    alignSelf: "flex-end",
    marginBottom: 36,
    marginRight: 10,
    fontSize: 18,
    // marginLeft: 200,
  },
});

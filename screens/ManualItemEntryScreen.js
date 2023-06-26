import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { Picker } from "@react-native-picker/picker";
import {
  auth,
  db,
  AddNewItemToDb,
  GetProducts,
  productsFirebase,
  AddNewItemToDbManualy,
} from "../firebase";
import MainButton from "../components/MainButton";

const ManualItemEntryScreen = () => {
  const [barcode, setBarcode] = useState(null);
  const [description, setDecription] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("AMA");
  const [quanitiy, setQuantity] = useState(null);
  const [typeOfProduct, setTypeOfProduct] = useState("products");
  const [products, setProducts] = useState(null);
  const [itemName, setItemName] = useState("");
  const currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var year = currentDate.getFullYear();

  useEffect(() => {
    const array = [];
    GetProducts({
      selectedCompany: selectedCompany,
      typeOfProduct: typeOfProduct,
      array: array,
      productState: setProducts,
    });
    return () => {
      undefined;
    };
  }, [selectedCompany, typeOfProduct]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        data={[true]}
        // style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        // style={{ flex: 1 }}
        renderItem={({ item, index }) => {
          return (
            <View style={{ alignItems: "center" }}>
              <InputBox
                width={Dimensions.get("screen").width / 1.3}
                color={"#0008ff"}
                placeholder={"Name"}
                onChangeText={setItemName}
                type={"name"}
                value={itemName}
              />
              <InputBox
                width={Dimensions.get("screen").width / 1.3}
                color={"#0008ff"}
                placeholder={"Barcode Number"}
                onChangeText={(text) => {
                  setBarcode(text);
                }}
                value={barcode}
              />

              <InputBox
                width={Dimensions.get("screen").width / 1.3}
                color={"#0008ff"}
                placeholder={"Description"}
                onChangeText={(text) => {
                  setDecription(text);
                }}
                value={description}
              />

              <InputBox
                width={Dimensions.get("screen").width / 1.3}
                color={"#0008ff"}
                placeholder={"Location"}
                onChangeText={(text) => {
                  setLocation(text);
                }}
                value={location}
              />
              <InputBox
                width={Dimensions.get("screen").width / 2}
                color={"#0008ff"}
                placeholder={"Quanitiy"}
                onChangeText={(text) => {
                  setQuantity(text);
                }}
                value={quanitiy}
              />
              <Picker
                style={{
                  height: 50,
                  width: Dimensions.get("screen").width / 1.5,

                  marginBottom: 100,
                }}
                selectedValue={typeOfProduct}
                onValueChange={(itemValue, itemIndex) =>
                  setTypeOfProduct(itemValue)
                }
              >
                <Picker.Item label="Product" value="products" />
                <Picker.Item
                  label="Office Equipment "
                  value="office_equipment"
                />
              </Picker>
              <View style={{ marginBottom: 20 }}>
                <Picker
                  style={{
                    height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    marginBottom: 100,
                  }}
                  selectedValue={selectedCompany}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCompany(itemValue)
                  }
                >
                  <Picker.Item label="AMA" value="AMA" />
                  <Picker.Item
                    label="Vitalize Med Spa"
                    value="Vitalize Med Spa"
                  />
                  <Picker.Item
                    label="Vitalize Infusion"
                    value="Vitalize Infusion"
                  />
                </Picker>
              </View>
              <MainButton
                buttonWidth={Dimensions.get("screen").width / 4}
                text={"Add"}
                onPress={() => {
                  AddNewItemToDbManualy({
                    barcode: barcode,
                    itemName: itemName,
                    quanitiy: parseInt(quanitiy),
                    description: description,
                    selectedCompany: selectedCompany,
                    location: location,
                    data: barcode,
                    year: year.toString(),
                    month: month.toString(),
                    day: day.toString(),
                    hours: hours.toString(),
                    type: null,
                    ItemType: typeOfProduct,
                  });
                  setItemName(null);
                  setBarcode(null);
                  setDecription(null);
                  setQuantity(null);
                  setLocation(null);
                }}
              />

              <View style={{ margin: 20, alignItems: "center" }}>
                <FlatList
                  data={products}
                  style={{ flex: 1, alignSelf: "center" }}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ alignSelf: "center" }}>
                        <View
                          style={{
                            // backgroundColor: "#8A6EBED0",
                            backgroundColor: "#C5C4C44D",
                            padding: 20,
                            marginVertical: 10,
                            paddingHorizontal: 20,
                            width: Dimensions.get("screen").width / 1.3,
                            height: 70,
                            borderRadius: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontSize: 22 }}>{item.product}</Text>
                          <Text style={{ color: "#3B3B3BBB" }}>
                            Quantity:{item.quantity}
                          </Text>
                        </View>
                        <Text
                          style={{
                            alignSelf: "center",
                            fontSize: 15,
                            color: "#31313162",
                          }}
                        >
                          Barcode: {item.barcode}
                        </Text>
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.barcode}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ManualItemEntryScreen;

const styles = StyleSheet.create({
  item: {
    // backgroundColor: "#8A6EBED0",
    backgroundColor: "#F1F1F1",
    padding: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width / 4,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

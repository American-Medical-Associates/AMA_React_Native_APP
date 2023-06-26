import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  View,
  Animated,
  ScrollView,
  Switch,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Easing,
} from "react-native";
import { useSelector } from "react-redux";
import InputBox from "../components/InputBox";
import MainButton from "../components/MainButton";
import { AddNewItemToDbManualy } from "../firebase";
import { selectSelectedProduct } from "../slices/globalSlice";
import { useNavigation } from "@react-navigation/native";

const InventoryItemEdit = () => {
  // if product.product is undefind
  const [productName, setProductName] = useState(null);
  const [productQuantity, setProductQuantity] = useState(null);

  const [productDescription, setProductDescription] = useState(null);
  const [productLocation, setProductLocation] = useState(null);
  const product = useSelector(selectSelectedProduct);
  const [add, setAdd] = useState(false);
  const [incrementQuantity, setIncrementQuantity] = useState(null);
  const currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var year = currentDate.getFullYear();
  const navigation = useNavigation();
  useEffect(() => {
    if (product && add) {
      console.log("add");

      if (productName === null || productName === "") {
        setProductName(product.product);
      }
      if (productQuantity === null || productQuantity == "") {
        setProductQuantity(product.quantity);
      }
      if (productDescription === null || productDescription === "") {
        if (
          product.description === undefined ||
          product.description === "" ||
          product.description === null
        ) {
          setProductDescription("No description");
        } else {
          setProductDescription(product.description);
        }
      }
      if (productLocation === null || productLocation === "") {
        if (
          product.location === undefined ||
          product.location === "" ||
          product.location === null
        ) {
          setProductLocation("No location");
        } else {
          setProductLocation(product.location);
        }
      }

      if (
        productName != null &&
        productName != "" &&
        productQuantity != null &&
        productQuantity != "" &&
        productDescription != null &&
        productDescription != "" &&
        productLocation != null &&
        productLocation != ""
      ) {
        AddNewItemToDbManualy({
          barcode: product.barcode,
          itemName: productName,
          quantity: parseInt(productQuantity),
          description: productDescription,
          selectedCompany: product.company,
          location: productLocation,
          data: product.barcode,
          year: year.toString(),
          month: month.toString(),
          day: day.toString(),
          hours: hours.toString(),
          type: null,
          ItemType: product.type,
          incrementQuantity: incrementQuantity,
        }).then(() => {
          navigation.navigate("Home");
        });
      }
    }
  }, [add, productName, productQuantity, productDescription, productLocation]);

  const UpdateInfo = () => {};
  if (product !== undefined && product !== null) {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,

          alignItems: "center",

          marginTop: 50,
          width: "100%",
        }}
      >
        {product && (
          <View
            style={{
              flex: 1,
              width: "100%",
              padding: 50,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Barcode: {"\n"}
              {product.barcode}
            </Text>
            <InputBox
              placeholder={product.product}
              color={"#0008ff"}
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
            <InputBox
              color={"#0008ff"}
              placeholder={product.quantity.toString()}
              value={productQuantity}
              onChangeText={(text) => {
                //if product.quantity is greater than productQuantity add a negative sign
                if (product.quantity > parseInt(text)) {
                  setIncrementQuantity(product.quantity - parseInt(text));
                  setProductQuantity(text);
                } else {
                  setProductQuantity(text);
                  setIncrementQuantity(text);
                }
              }}
            />
            <InputBox
              color={"#0008ff"}
              placeholder={product.description}
              value={productDescription}
              onChangeText={(text) => setProductDescription(text)}
            />
            <InputBox
              color={"#0008ff"}
              placeholder={product.location}
              value={productLocation}
              onChangeText={(text) => setProductLocation(text)}
            />
            <MainButton
              text="Add Product"
              color={"#0008ff"}
              width={"80%"}
              onPress={() => {
                setAdd(true);
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
};

export default InventoryItemEdit;

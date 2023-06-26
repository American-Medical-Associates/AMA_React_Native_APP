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
import {
  deleteDoc,
  documentId,
  DocumentSnapshot,
  getDoc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  db,
  auth,
  GetProducts,
  GetYearForSelectedItem,
  GetProductQuantityYear,
  GetMonthsForSelectedItems,
  GetProductQuantityMonth,
  GetDayForSelectedItems,
  GetProductQuantityDay,
} from "../firebase";
import DividerLine from "./DividerLine";
import { useNavigation } from "@react-navigation/native";
import { setSelectedProduct } from "../slices/globalSlice";
import { useDispatch } from "react-redux";

export default function ListItemExpand({
  item,
  showAdded,
  companyDB,
  anyItems,
  scale,
  opacity,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const [productDetails, setProductDetails] = useState(null);

  const [ItemId, setItemId] = useState(null);

  const [itemIndex, setItemIndex] = useState(null);

  const [itemYear, setItemYear] = useState(null);
  const [itemMonth, setItemMonth] = useState(null);
  const [itemDay, setItemDay] = useState(null);
  const [quantityYear, setQuantityYear] = useState(null);
  const [quantityMonth, setQuantityMonth] = useState(null);
  const [quantityDay, setQuantityDay] = useState(null);
  const [updateItem, setUpdateItem] = useState(false);
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <TouchableOpacity
        onLongPress={async () => {
          const addToRedux = () => {
            dispatch(
              setSelectedProduct({
                product: item.product,
                barcode: item.barcode,
                description: item.description,
                location: item.itemLocation,
                quantity: item.quantity,
                company: item.company,
                type: item.ItemType,
              })
            );
            Promise.resolve(navigation.navigate("Inventory Edit Screen"));
          };
          addToRedux();
          //navigation.navigate("Inventory Edit Screen");
        }}
        onPress={() => {
          if (showDetails == true) {
            setShowDetails(false);
          } else {
            setShowDetails(true);
          }

          setItemId(item.id);
          // setItemIndex(index);

          const getProductDetails = onSnapshot(
            doc(db, "companys", companyDB, anyItems, item.id),
            (doc) => {
              const productDetails = [];

              productDetails.push(doc.data());
              // key: snap.id;
              setProductDetails(productDetails),
                console.log("this is doc data:", productDetails);
            }
          );
          // alert(JSON.stringify(item));

          if (showAdded == true) {
            try {
              GetYearForSelectedItem({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: item.id,
                YearState: setItemYear,
                addOrUsed: "year added",
                year: year.toString(),
              });

              GetProductQuantityYear({
                selectedCompany: companyDB,
                barcode: item.id,
                typeOfProduct: anyItems,
                QuantityState: setQuantityYear,
                addOrUsed: "year added",
                year: year.toString(),
              });
            } catch (e) {
              setItemYear("Nothing to Show");
              setQuantityYear("Nothing to Show");
            }
            try {
              GetMonthsForSelectedItems({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: item.id,
                MonthState: setItemMonth,
                addOrUsed: "year added",
                year: year.toString(),
                month: month.toString(),
              });
              GetProductQuantityMonth({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: item.id,
                QuantityState: setQuantityMonth,
                addOrUsed: "year added",
                year: year.toString(),
                month: month.toString(),
              });
            } catch (e) {
              setItemMonth("Nothing to Show");
              setQuantityMonth("Nothing to Show");
            }
            try {
              GetDayForSelectedItems({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: ItemId,
                DayState: setItemDay,
                addOrUsed: "year added",
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
              });
              GetProductQuantityDay({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: ItemId,
                QuantityState: setQuantityDay,
                addOrUsed: "year added",
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
              });
            } catch (e) {
              setItemDay("Nothing to Show");
              setQuantityDay("Nothing to Show");
            }
          } else {
            try {
              GetYearForSelectedItem({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: item.id,
                YearState: setItemYear,
                addOrUsed: "year used",
                year: year.toString(),
              });

              GetProductQuantityYear({
                selectedCompany: companyDB,
                barcode: item.id,
                typeOfProduct: anyItems,
                QuantityState: setQuantityYear,
                addOrUsed: "year used",
                year: year.toString(),
              });
            } catch (e) {
              setItemYear("Nothing to Show");
              setQuantityYear("Nothing to Show");
            }
            try {
              GetMonthsForSelectedItems({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: item.id,
                MonthState: setItemMonth,
                addOrUsed: "year used",
                year: year.toString(),
                month: month.toString(),
              });
              GetProductQuantityMonth({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: item.id,
                QuantityState: setQuantityMonth,
                addOrUsed: "year used",
                year: year.toString(),
                month: month.toString(),
              });
            } catch (e) {
              setItemMonth("Nothing to Show");
              setQuantityMonth("Nothing to Show");
            }
            try {
              GetDayForSelectedItems({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: ItemId,
                DayState: setItemDay,
                addOrUsed: "year used",
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
              });
              GetProductQuantityDay({
                selectedCompany: companyDB,
                typeOfProduct: anyItems,
                barcode: ItemId,
                QuantityState: setQuantityDay,
                addOrUsed: "year used",
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
              });
            } catch (e) {
              setItemDay("Nothing to Show");
              setQuantityDay("Nothing to Show");
            }
          }
        }}
      >
        <View
          style={{
            // backgroundColor: "#8A6EBED0",
            backgroundColor: "#DBDBDBB4",
            padding: 20,
            marginVertical: 10,
            paddingHorizontal: 20,
            width: Dimensions.get("screen").width / 1.2,
            // height: 70,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, margin: 5 }}>{item.product}</Text>
          <Text style={{ color: "#4F4F4F" }}>Quantity:{item.quantity}</Text>
          {showDetails == true && (
            <FlatList
              data={productDetails}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 18,
                        textAlign: "center",
                      }}
                    >
                      description: {item.description}
                    </Text>
                    <Text style={{ textAlign: "center", color: "#757575" }}>
                      Location: {item.itemLocation}
                    </Text>
                    {/* <View style={{ margin: 10 }}>
                      <Text style={{ textAlign: "center", margin: 5 }}>
                        History
                      </Text>
                      <DividerLine
                        lineWidth={Dimensions.get("screen").width / 3}
                        lineColor={"#0008ff"}
                      />
                      <Text style={{ textAlign: "center" }}>
                        Year: {quantityYear}
                        {"\n"}
                        Month: {quantityMonth}
                        {"\n"}
                        Day: {quantityDay}
                      </Text>
                    </View> */}
                  </View>
                );
              }}
            ></FlatList>
          )}
        </View>
        <Text
          style={{
            justifyContent: "center",
            alignSelf: "center",
            color: "#5A5858AF",
            fontSize: 20,
          }}
        >
          Barcode: {item.barcode}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

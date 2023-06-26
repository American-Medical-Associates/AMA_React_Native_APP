import React, { useEffect, useState, useRef } from "react";
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
import {
  arrayUnion,
  deleteDoc,
  documentId,
  DocumentSnapshot,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from "@expo/vector-icons";
// import AnitmatedCustomList from "../components/AnitmatedCustomList";
import {
  addExisitingItemToDb,
  AddNewItemToDb,
  auth,
  db,
  DeleteItemOnDB,
  GetProducts,
  UseExistingItemOnDb,
} from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import MainButton from "../components/MainButton";
import DividerLine from "../components/DividerLine";
import { add, interpolate } from "react-native-reanimated";
// import { getAdditionalUserInfo } from "firebase/auth";
// import * as Haptics from "expo-haptics";
// import { set } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { selectCompany, selectIsAuthUser } from "../slices/globalSlice";
import { Picker } from "@react-native-picker/picker";
import CompanyButton from "../components/CompanyPickerButton";
import InputBox from "../components/InputBox";
import { async } from "@firebase/util";
import SettingsButton from "../components/SettingsButton";
import { useFocusEffect } from "@react-navigation/native";

const BarcodeScreenPhone = () => {
  const [showScannerIsInView, setShowScannerIsInView] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const ITEM_SIZE = 90 + 18 * 3;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [decription, setDecription] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const [isEnabled3, setIsEnabled3] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled1) {
      toggleSwitch1();
    }
    if (isEnabled2) {
      toggleSwitch2();
    }
  };
  const toggleSwitch1 = () => {
    setIsEnabled1((previousState) => !previousState);
    if (isEnabled) {
      toggleSwitch();
    }
    if (isEnabled2) {
      toggleSwitch2();
    }
  };
  const toggleSwitch2 = () => {
    setIsEnabled2((previousState) => !previousState);
    if (isEnabled) {
      toggleSwitch();
    }
    if (isEnabled1) {
      toggleSwitch1();
    }
  };

  const [deleted, setDeleted] = useState(false);
  // const [company, setCompany] = useState(null);
  const [months, setMonths] = useState(null);
  const [days, setDays] = useState(null);
  const [todays, setTodays] = useState(null);
  const company = useSelector(selectCompany);
  const [selectedCompany, setSelectedCompany] = useState(company);
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [itemLocation, setItemLocation] = useState(null);
  const [addExisiting, setAddExisiting] = useState(false);
  const [scanNew, setScanNew] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const isAuthUser = useSelector(selectIsAuthUser);
  const [companyDB, setCompanyDB] = useState(company);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [year, setYear] = useState();
  let scanner = useRef();
  useEffect(() => {
    if (isAuthUser == true) {
      if (selectedCompany != null) {
        setCompanyDB(selectedCompany);
      } else {
        setCompanyDB(company);
      }
    } else {
      setCompanyDB(company);
      console.log(company);
    }
  }, [selectedCompany, isAuthUser, company]);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setShowScannerIsInView(true);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setShowScannerIsInView(false);
      };
    }, [])
  );

  useEffect(() => {
    if (isEnabled3 == true) {
      GetProducts({
        selectedCompany: companyDB,
        typeOfProduct: "office_equipment",
        productState: setProducts,
      });
    } else {
      GetProducts({
        selectedCompany: companyDB,
        typeOfProduct: "products",
        productState: setProducts,
      });
    }
  }, [isEnabled3, companyDB]);
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var today = currentDate.getHours();
  var years = currentDate.getFullYear();
  useEffect(() => {
    // const whichMonth = () => {
    const monthsDays = day.toString();
    const todaysHours = today.toString();

    if (todaysHours > 12) {
      const todayHoursOverTwelve = todaysHours - 12;
      const todayHoursOverTwelveString = todayHoursOverTwelve.toString();
      console.log("OVER 12 " + todayHoursOverTwelveString);
      setTodays(todayHoursOverTwelveString);
    } else setTodays(todaysHours), console.log(todaysHours);
    console.log(monthsDays);
    setYear(years.toString());

    if (monthsDays) {
      setDays(monthsDays);
    } else null;
    setMonths(month.toString());
    console.log("daysss and hourss " + days, todays);

    console.log(months);
  }, [selectedCompany]);
  const toggleToDeleteItem = () => {
    if (isEnabled)
      return <Text style={[styles.deleteItemText]}>Stop deleting</Text>;
    else return <Text style={[styles.deleteItemText]}> Delete</Text>;
  };
  const toggleToAddItem = () => {
    if (isEnabled1) return <Text style={styles.addItemText}> Use product</Text>;
    else return <Text style={[styles.addItemText]}> Scan new item</Text>;
  };
  const officeEquipmentSettings = () => {
    if (isEnabled3 == true) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {showAddOfficeButton()}
          <View style={{ justifyContent: "center" }}>
            <SettingsButton
              text={"Add existing item"}
              width={Dimensions.get("screen").width / 2.5}
              onPressFalse={() => {
                setAddExisiting(true);
              }}
              onPressTrue={() => {
                setAddExisiting(false);
              }}
              setting={addExisiting}
            />
          </View>
          <View style={{ justifyContent: "center", margin: 10 }}>
            <SettingsButton
              text={"scan new item"}
              width={Dimensions.get("screen").width / 2.5}
              onPressFalse={() => {
                setScanNew(true);
              }}
              onPressTrue={() => {
                setScanNew(false);
              }}
              setting={scanNew}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <SettingsButton
              text={"Delete"}
              width={Dimensions.get("screen").width / 2.5}
              onPressFalse={() => {
                setIsDelete(true);
              }}
              onPressTrue={() => {
                setIsDelete(false);
              }}
              setting={isDelete}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* <TouchableOpacity
                onPress={() => {
                  setExpand(true);
                }}
                style={{
                  alignSelf: "center",
                  marginBottom: 18,
                  marginRight: 10,
                }}
              >
                <AntDesign name="upcircleo" size={24} color="white" />
              </TouchableOpacity> */}
          {/* <Text style={styles.removeItemText}>Add office equipment</Text>
              <Switch
                style={styles.switch2}
                trackColor={{ false: "#767577", true: "#0008ff" }}
                thumbColor={isEnabled3 ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch3}
                value={isEnabled3}
              /> */}
          {showAddOfficeButton()}
          <Text style={styles.removeItemText}>Add existing item</Text>
          <Switch
            style={{ margin: 5 }}
            trackColor={{ false: "#767577", true: "#0008ff" }}
            thumbColor={isEnabled2 ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />

          <View style={styles.addItemText}>{toggleToAddItem()}</View>

          <Switch
            style={{ margin: 5 }}
            trackColor={{ false: "#767577", true: "#0008ff" }}
            thumbColor={isEnabled1 ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
          <View style={styles.deleteItemText}>{toggleToDeleteItem()}</View>
          <Switch
            style={{ margin: 5 }}
            trackColor={{ false: "#767577", true: "#FF0000" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      );
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    // const products = doc(db, "companys", selectedCompany, "products", data);
    setExpand(false);
    // const productHistory = doc(
    //   db,
    //   "products",
    //   data,
    //   "Quantity history",
    //   months
    // );

    try {
      if (selectedCompany !== null) {
        setScanned(true);
        if (isEnabled3 == true) {
          if (addExisiting) {
            addExisitingItemToDb({
              barcode: data,
              itemName: name,
              quantity: quantity,
              description: decription,
              selectedCompany: selectedCompany,
              location: itemLocation,
              data: data,
              year: year.toString(),
              month: month.toString(),
              day: day.toString(),
              hours: todays.toString(),
              type: type,
              ItemType: "office_equipment",
            });
          } else {
            if (scanNew) {
              AddNewItemToDb({
                barcode: data,
                itemName: name,
                quantity: quantity,
                description: decription,
                selectedCompany: selectedCompany,
                location: itemLocation,
                data: data,
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
                hours: todays.toString(),
                type: type,
                ItemType: "office_equipment",
              });
            } else {
              UseExistingItemOnDb({
                barcode: data,
                itemName: name,
                quantity: quantity,
                description: decription,
                selectedCompany: selectedCompany,
                location: itemLocation,
                data: data,
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
                hours: todays.toString(),
                type: type,
                ItemType: "office_equipment",
              });
            }

            if (isDelete) {
              DeleteItemOnDB({
                selectedCompany: selectedCompany,
                data: data,
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
                hours: todays.toString(),
                ItemType: "office_equipment",
              });
            } else {
              return null;
            }
          }
        } else {
          if (isEnabled2) {
            addExisitingItemToDb({
              barcode: data,
              itemName: name,
              quantity: quantity,
              description: decription,
              selectedCompany: selectedCompany,
              location: itemLocation,
              data: data,
              year: year.toString(),
              month: month.toString(),
              day: day.toString(),
              hours: todays.toString(),
              type: type,
              ItemType: "products",
            });
          } else {
            if (isEnabled1) {
              AddNewItemToDb({
                barcode: data,
                itemName: name,
                quantity: quantity,
                description: decription,
                selectedCompany: selectedCompany,
                location: itemLocation,
                data: data,
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
                hours: todays.toString(),
                type: type,
                ItemType: "products",
              });
            } else {
              //check if item exists
              products.forEach((item) => {
                if (item.barcode === data) {
                  UseExistingItemOnDb({
                    barcode: data,
                    itemName: name,
                    quantity: quantity,
                    description: decription,
                    selectedCompany: selectedCompany,
                    location: itemLocation,
                    data: data,
                    year: year.toString(),
                    month: month.toString(),
                    day: day.toString(),
                    hours: todays.toString(),
                    type: type,
                    ItemType: "products",
                  });
                }
              });
            }

            if (isEnabled) {
              DeleteItemOnDB({
                selectedCompany: selectedCompany,
                data: data,
                year: year.toString(),
                month: month.toString(),
                day: day.toString(),
                hours: todays.toString(),
                ItemType: "products",
              });
            } else {
              return null;
            }
          }
        }
      } else {
        alert("no company");
      }
    } catch (e) {
      alert(e);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const showCompanySettings = () => {
    if (isAuthUser == true) {
      return (
        <View style={{ flexDirection: "column" }}>
          <CompanyButton
            companyTextShort={"AMA"}
            onPress={() => {
              setSelectedCompany("AMA");
            }}
            onPressNull={() => {
              setSelectedCompany(null);
            }}
            selectedCompany={selectedCompany}
            companyTextLong={"AMA"}
          />
          <CompanyButton
            companyTextShort={"Vitalize"}
            onPress={() => {
              setSelectedCompany("Vitalize Nation");
            }}
            onPressNull={() => {
              setSelectedCompany(null);
            }}
            selectedCompany={selectedCompany}
            companyTextLong={"Vitalize Nation"}
          />
        </View>
      );
    }
  };
  const showAddOfficeButton = () => {
    if (isAuthUser == true) {
      return (
        <View style={{ justifyContent: "center" }}>
          <SettingsButton
            text={"Add office equipment"}
            width={Dimensions.get("screen").width / 2.5}
            onPressFalse={() => {
              setIsEnabled3(true);
            }}
            onPressTrue={() => {
              setIsEnabled3(false);
            }}
            setting={isEnabled3}
          />
        </View>
      );
    }
  };

  const settingsBox = () => {
    if (expand == true) {
      return (
        <View
          style={{
            justifyContent: "flex-start",
            flex: 1,
            alignContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#A2A2A2",
              flex: 1,
              margin: 20,
              justifyContent: "flex-start",
              borderRadius: 30,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => {
                  setExpand(false);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#0008ff",
                    borderRadius: 80,
                    padding: 10,
                  }}
                >
                  <AntDesign name="downcircleo" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", alignSelf: "center" }}>
              <InputBox
                width={Dimensions.get("screen").width / 2.1}
                color={"#0008ff"}
                placeholder={"Product Name"}
                onChangeText={setName}
                value={name}
              />
              <InputBox
                width={Dimensions.get("screen").width / 2.1}
                color={"#0008ff"}
                placeholder={"Product description"}
                onChangeText={setDecription}
                value={decription}
              />
              <InputBox
                width={Dimensions.get("screen").width / 2.1}
                color={"#0008ff"}
                placeholder={"Location"}
                onChangeText={setItemLocation}
                value={itemLocation}
              />

              {showCompanySettings()}
              {officeEquipmentSettings()}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "flex-end", flex: 0.5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              // flex: 1,
            }}
          >
            <TouchableOpacity
              style={{ margin: 40 }}
              onPress={() => {
                setExpand(true);
              }}
            >
              <View
                style={{
                  backgroundColor: "#A2A2A2",
                  borderRadius: 80,
                  padding: 10,
                }}
              >
                <AntDesign name="upcircleo" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {showScannerIsInView && (
            <BarCodeScanner
              ref={scanner}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <View style={{ flex: 0.5 }}>
            <View
              style={{
                alignItems: "center",
                flex: 1,
              }}
            >
              {!expand && (
                <Animated.FlatList
                  data={products}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                  )}
                  renderItem={({ item, index }) => {
                    const inputRange = [
                      -1,
                      0,
                      ITEM_SIZE * index,
                      ITEM_SIZE * (index + 2),
                    ];
                    const opacityinputRange = [
                      -1,
                      0,
                      ITEM_SIZE * index,
                      ITEM_SIZE * (index + 1),
                    ];

                    const scale = scrollY.interpolate({
                      inputRange,
                      outputRange: [1, 1, 1, 0],
                    });
                    const opacity = scrollY.interpolate({
                      inputRange: opacityinputRange,
                      outputRange: [1, 1, 1, 0],
                    });

                    return (
                      <Animated.View
                        style={{ transform: [{ scale }], opacity }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (isEnabled) {
                              DeleteItemOnDB({
                                selectedCompany: selectedCompany,
                                data: item.barcode,
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                                hours: todays.toString(),
                                ItemType: "products",
                              });
                            } else if (isDelete) {
                              DeleteItemOnDB({
                                selectedCompany: selectedCompany,
                                data: item.barcode,
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                                hours: todays.toString(),
                                ItemType: "office_equipment",
                              });
                            } else if (isEnabled2) {
                              console.log(
                                item.barcode,
                                item.product,
                                item.quantity,
                                item.description,
                                selectedCompany,
                                item.itemLocation,
                                item.type_of_barcode
                              );
                              addExisitingItemToDb({
                                barcode: item.barcode,
                                itemName: item.product,
                                quantity: item.quantity,
                                description: item.description,
                                selectedCompany: selectedCompany,
                                location: item.itemLocation,
                                data: item.barcode,
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                                hours: todays.toString(),
                                type: item.type_of_barcode,
                                ItemType: "products",
                              });
                            }
                          }}
                          onLongPress={() => {
                            UseExistingItemOnDb({
                              barcode: item.barcode,
                              itemName: item.product,
                              quantity: item.quantity,
                              description: item.description,
                              selectedCompany: selectedCompany,
                              location: item.itemLocation,
                              data: item.barcode,
                              year: year.toString(),
                              month: month.toString(),
                              day: day.toString(),
                              hours: todays.toString(),
                              type: item.type_of_barcode,
                              ItemType: "products",
                            });
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#F1F1F1EA",
                              // padding: 20,
                              marginVertical: 10,
                              // paddingHorizontal: 20,
                              width: Dimensions.get("screen").width / 2.6,

                              borderRadius: 40,
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "center",
                              overflow: "hidden",
                              padding: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                justifyContent: "center",
                                alignSelf: "center",
                                color: "#000000CE",
                                textAlign: "center",
                              }}
                            >
                              {item.product}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                justifyContent: "center",
                                alignSelf: "center",
                                color: "#36C1DAE1",
                              }}
                            >
                              Quantity:{item.quantity}
                            </Text>
                          </View>
                          <Text
                            style={{
                              justifyContent: "center",
                              alignSelf: "center",
                              color: "#5A5858AF",
                              fontSize: 15,
                            }}
                          >
                            Barcode: {item.barcode}
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>

            {scanned && (
              <View style={{ paddingBottom: 30 }}>
                <DividerLine
                  lineColor={"#0008ff"}
                  lineWidth={
                    expand
                      ? Dimensions.get("window").width / 4
                      : Dimensions.get("window").width / 2.5
                  }
                />

                <MainButton
                  buttonWidth={
                    expand
                      ? Dimensions.get("window").width / 4
                      : Dimensions.get("window").width / 2.5
                  }
                  text={expand ? "Scan" : "Tap to Scan"}
                  onPress={() => setScanned(false)}
                />
              </View>
            )}
          </View>
          {settingsBox()}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BarcodeScreenPhone;

const styles = StyleSheet.create({});

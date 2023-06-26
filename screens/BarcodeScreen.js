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
const BarcodeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const ITEM_SIZE = 90 + 18 * 3;
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [decription, setDecription] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const [deleted, setDeleted] = useState(false);
  // const [company, setCompany] = useState(null);
  const [months, setMonths] = useState(null);
  const [days, setDays] = useState(null);
  const [todays, setTodays] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const company = useSelector(selectCompany);
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [itemLocation, setItemLocation] = useState(null);
  const [addExisiting, setAddExisiting] = useState(false);
  const [scanNew, setScanNew] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const isAuthUser = useSelector(selectIsAuthUser);
  const [companyDB, setCompanyDB] = useState(company);
  // const currentdate = new Date
  // const year  = currentdate.getFullYear
  // const theMonth = currentdate.getMonth
  // const theDay = currentdate.getDate
  const [year, setYear] = useState();

  useEffect(() => {
    if (isAuthUser == true) {
      if (selectedCompany != null) {
        setCompanyDB(selectedCompany);
      } else {
        setCompanyDB(company);
      }
    } else {
      setCompanyDB(company);
    }
  }, [selectedCompany, isAuthUser, company]);
  useEffect(() => {
    if (addExisiting == true) {
      setScanNew(false), setIsDelete(false);
    }
    if (scanNew == true) {
      setAddExisiting(false), setIsDelete(false);
    }
    if (isDelete == true) {
      setAddExisiting(false), setScanNew(false);
    }
  }, [addExisiting, scanNew, isDelete]);

  const showAddOfficeButton = () => {
    if (isAuthUser == true) {
      return (
        <View style={{ justifyContent: "center" }}>
          <SettingsButton
            text={"Add office equipment"}
            width={Dimensions.get("screen").width / 6}
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
  const officeEquipmentSettings = () => {
    if (isEnabled3 == true) {
      return (
        <View style={styles.switchView2}>
          {showAddOfficeButton()}
          <View style={{ justifyContent: "center" }}>
            <SettingsButton
              text={"Add existing item"}
              width={Dimensions.get("screen").width / 7}
              onPressFalse={() => {
                setAddExisiting(true);
              }}
              onPressTrue={() => {
                setAddExisiting(false);
              }}
              setting={addExisiting}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <SettingsButton
              text={"scan new item"}
              width={Dimensions.get("screen").width / 9}
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
              width={Dimensions.get("screen").width / 14}
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
        <View style={styles.switchView2}>
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
      );
    }
  };
  useEffect(() => {
    const tryIsEnabled = async () => {
      if (isEnabled == true) {
        await setIsEnabled1(false);
        await setIsEnabled2(false);
        // await setIsEnabled3(false);
      }
      if (isEnabled1 == true) {
        await setIsEnabled(false);
        await setIsEnabled2(false);
        // await setIsEnabled3(false);
      }
      if (isEnabled2 == true) {
        await setIsEnabled1(false);
        await setIsEnabled(false);
        // await setIsEnabled3(false);
      }
      // if (isEnabled3 == true) {
      //   await setIsEnabled1(false);
      //   await setIsEnabled2(false);
      //   setIsEnabled(false);
      // }
    };
    return () => {
      tryIsEnabled();
    };
  }, [isEnabled, isEnabled1, isEnabled2]);

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
            companyTextShort={"VMS"}
            onPress={() => {
              setSelectedCompany("Vitalize Med Spa");
            }}
            onPressNull={() => {
              setSelectedCompany(null);
            }}
            selectedCompany={selectedCompany}
            companyTextLong={"Vitalize Med Spa"}
          />
          <CompanyButton
            companyTextShort={"VIC"}
            onPress={() => {
              setSelectedCompany("Vitalize Infusion");
            }}
            onPressNull={() => {
              setSelectedCompany(null);
            }}
            selectedCompany={selectedCompany}
            companyTextLong={"Vitalize Infusion"}
          />
        </View>
      );
    }
  };
  const settingsBox = () => {
    if (expand == false) {
      return (
        <View style={styles.optionsView}>
          <View style={styles.optionview2}>{officeEquipmentSettings()}</View>

          <View style={styles.textInputView}>
            <View style={{ marginHorizontal: 5 }}>
              <InputBox
                color={"#0008ff"}
                width={Dimensions.get("screen").width / 6}
                placeholder={"Product Name"}
                type={"Product Name"}
                onChangeText={(text) => setName(text)}
              ></InputBox>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <InputBox
                color={"#0008ff"}
                width={Dimensions.get("screen").width / 4}
                placeholder={"Product description"}
                type={"Product decription"}
                onChangeText={(text) => setDecription(text)}
              ></InputBox>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <InputBox
                color={"#0008ff"}
                width={Dimensions.get("screen").width / 9}
                placeholder={"Location"}
                type={"Product decription"}
                onChangeText={(text) => setItemLocation(text)}
              ></InputBox>
            </View>
            {showCompanySettings()}
            {/* <TextInput
                style={styles.inputfeild2}
                placeholder="Company"
                type="Company"
                onChangeText={(text) => setCompany(text)}
              ></TextInput> */}
          </View>
        </View>
      );
    } else {
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
            height: 800,
            // marginLeft: 550,
            justifyContent: "flex-start",
            marginRight: 20,
            marginBottom: 30,
          }}
        >
          <View style={styles.optionview2}>
            <View style={styles.switchView2}>
              <TouchableOpacity
                onPress={() => {
                  setExpand(false);
                }}
                style={{
                  alignSelf: "center",
                  marginBottom: 18,
                  marginRight: 10,
                }}
              >
                <AntDesign name="downcircleo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.removeItemText}>
                Toggle to add existing item
              </Text>
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
            <View style={{ marginHorizontal: 5 }}>
              <InputBox
                color={"#0008ff"}
                width={Dimensions.get("screen").width / 6}
                placeholder={"Product Name"}
                type={"Product Name"}
                onChangeText={(text) => setName(text)}
              ></InputBox>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <InputBox
                color={"#0008ff"}
                width={350}
                placeholder={"Product description"}
                type={"Product decription"}
                onChangeText={(text) => setDecription(text)}
              ></InputBox>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <InputBox
                color={"#0008ff"}
                width={150}
                placeholder={"Location"}
                type={"Product decription"}
                onChangeText={(text) => setItemLocation(text)}
              ></InputBox>
            </View>

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
                companyTextShort={"VMS"}
                onPress={() => {
                  setSelectedCompany("Vitalize Med Spa");
                }}
                onPressNull={() => {
                  setSelectedCompany(null);
                }}
                selectedCompany={selectedCompany}
                companyTextLong={"Vitalize Med Spa"}
              />
              <CompanyButton
                companyTextShort={"VIC"}
                onPress={() => {
                  setSelectedCompany("Vitalize Infusion");
                }}
                onPressNull={() => {
                  setSelectedCompany(null);
                }}
                selectedCompany={selectedCompany}
                companyTextLong={"Vitalize Infusion"}
              />
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
  };
  const toggleToDeleteItem = () => {
    if (isEnabled)
      return <Text style={[styles.deleteItemText]}>Stop deleting</Text>;
    else return <Text style={[styles.deleteItemText]}> Delete</Text>;
  };
  const toggleToAddItem = () => {
    if (isEnabled1) return <Text style={styles.addItemText}> Use product</Text>;
    else return <Text style={[styles.addItemText]}> Scan new item</Text>;
  };
  // const toggleToRemoveItem = () => {
  //   if (isEnabled2)
  //     return (
  //       <Text style={styles.addItemText}>Toggle to use existing product</Text>
  //     );
  //   else return null;
  // };
  const scrollY = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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

  const jan = month == 1;
  const feb = month == 2;
  const march = month == 3;
  const April = month == 4;
  const may = month == 5;
  const june = month == 6;
  const july = month == 7;
  const aug = month == 8;
  const sep = month == 9;
  const oct = month == 10;
  const nov = month == 11;
  const dec = month == 12;

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
    // if (jan) {
    //   setMonths("Jan");
    // } else {
    //   null;
    // }
    // if (feb) {
    //   setMonths("Feb");
    // } else {
    //   null;
    // }
    // if (march) {
    //   setMonths("Mar");
    // } else {
    //   null;
    // }
    // if (April) {
    //   setMonths("Apr");
    // } else {
    //   null;
    // }
    // if (may) {
    //   setMonths("May");
    // } else {
    //   null;
    // }
    // if (june) {
    //   setMonths("June");
    // } else {
    //   null;
    // }
    // if (july) {
    //   setMonths("July ");
    // } else {
    //   null;
    // }
    // if (aug) {
    //   setMonths("Aug");
    // } else {
    //   null;
    // }
    // if (sep) {
    //   setMonths("Sep");
    // } else {
    //   null;
    // }
    // if (oct) {
    //   setMonths("Oct");
    // } else {
    //   null;
    // }
    // if (nov) {
    //   setMonths("Nov");
    // } else {
    //   null;
    // }
    // if (dec) {
    //   setMonths("Dec");
    // } else {
    //   null;
    // }
    console.log(months);
    // };
    // return () => {
    //   whichMonth();
    // };
  }, [selectedCompany]);

  const handleBarCodeScanned = async ({ type, data }) => {
    const products = doc(db, "companys", selectedCompany, "products", data);
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
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (isEnabled3 == true) {
          if (addExisiting) {
            addExisitingItemToDb({
              barcode: data,
              itemName: name,
              quanitiy: quantity,
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
              console.log("bitch");
              AddNewItemToDb({
                barcode: data,
                itemName: name,
                quanitiy: quantity,
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
                quanitiy: quantity,
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
              quanitiy: quantity,
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
                quanitiy: quantity,
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
              UseExistingItemOnDb({
                barcode: data,
                itemName: name,
                quanitiy: quantity,
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
      }
    } catch (e) {
      alert(e, "Make sure you select a company   ");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.barcodeListView}>
            <View style={{ alignItems: "center", flex: 1 }}>
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
                    <Animated.View style={{ transform: [{ scale }], opacity }}>
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
                          } else {
                            return null;
                          }
                          if (isDelete) {
                            DeleteItemOnDB({
                              selectedCompany: selectedCompany,
                              data: item.barcode,
                              year: year.toString(),
                              month: month.toString(),
                              day: day.toString(),
                              hours: todays.toString(),
                              ItemType: "office_equipment",
                            });
                          } else {
                            return null;
                          }
                        }}
                      >
                        <View style={styles.item}>
                          <Text style={styles.product}>{item.product}</Text>
                          <Text style={styles.quanitiy}>
                            Quantity:{item.quantity}
                          </Text>
                        </View>
                        <Text style={[styles.barcode]}>
                          Barcode: {item.barcode}
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>

            {scanned && (
              <View style={styles.buttonview}>
                <DividerLine lineColor={"#0008ff"} lineWidth={200} />

                <MainButton
                  buttonWidth={300}
                  text={"Tap to Scan Again"}
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

export default BarcodeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  barcodeListView: {
    // backgroundColor: "#FFFFFFAF",
    flex: 1,
    // backgroundColor: "green",
    // borderRadius: 50,
    // height: 900,
    // width: 400,
    // alignSelf: "flex-start",
    // marginLeft: 50,
    // marginTop: 20,
    // marginBottom: 30,
  },
  buttonview: { paddingBottom: 30 },

  quanitiy: {
    fontSize: 24,
    justifyContent: "center",
    alignSelf: "center",
    color: "#36C1DAE1",
  },
  item: {
    backgroundColor: "#F1F1F1EA",
    padding: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width / 4,
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
  optionsView: {
    backgroundColor: "#858585AF",
    flexDirection: "column",
    flex: 2,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    // width: 800,
    borderRadius: 25,
    height: Dimensions.get("screen").width / 6,
    // marginLeft: 550,
    justifyContent: "flex-start",
    marginRight: 20,
    marginBottom: 30,
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
    color: "white",
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
    color: "white",
    // marginLeft: 200,
  },
  removeItemText: {
    alignSelf: "flex-end",
    marginBottom: 36,
    marginRight: 10,
    fontSize: 18,
    color: "white",
    // marginLeft: 200,
  },
});

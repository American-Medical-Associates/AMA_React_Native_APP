import React, { useLayoutEffect, useEffect, useState } from "react";
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
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
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
} from "firebase/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
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
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
// import SmallButton from "../components/SmallButton";

import { useDrawerStatus } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
// import AnitmatedCustomList from "../components/AnitmatedCustomList";
// import { FlatList } from "react-native-gesture-handler";
// import { useCallback } from "react/cjs/react.production.min";
// import { set } from "react-native-reanimated";
// import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
// import infoLog from "react-native/Libraries/Utilities/infoLog";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import MainButton from "../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setIsAuthUser } from "../slices/globalSlice";
import DividerLine from "../components/DividerLine";

import CompanyButton from "../components/CompanyPickerButton";
import SettingsButton from "../components/SettingsButton";

const HomeScreen = () => {
  const ITEM_SIZE = 90 + 18 * 3;
  const [products, setProducts] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [deleted, setDeleted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [quantity, setQuantity] = useState([0]);
  const [docNumber, setDocNumber] = useState(null);
  const [graphLabelsX, setGraphLabelsX] = useState(["NA"]);
  const [updateProductName, setUpdateProductName] = useState(null);
  const [updateProductCompany, setUpdateProductCompany] = useState(null);
  const [updateProductBarcode, setUpdateProductBarcode] = useState(null);
  const [updateProductQuantity, setUpdateProductQuantity] = useState(null);
  const [updateProductDescription, setUpdateProductDescription] =
    useState(null);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [ItemId, setItemId] = useState(null);
  const [value, setValue] = useState("Unselected");
  const [companyDB, setCompanyDB] = useState(null);
  const [settings, setSettings] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [showOfficeEquipment, setShowOfficeEquipment] = useState(false);
  const [isAuthUser, setIsAuthUserLocal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [anyItems, setAnyItems] = useState("products");
  const dispatch = useDispatch();
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",

      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            {/* <Avatar rounded source = {{uri: auth?.currentUser.photoURL}}/> */}
            <FontAwesome name="bars" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("User Options Screen")}
          >
            {/* <Avatar rounded source = {{uri: auth?.currentUser.photoURL}}/> */}
            <Octicons name="person" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const updateTitle = () => {
    if (showOfficeEquipment == true) {
      return (
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Office Equipment
        </Text>
      );
    } else {
      return (
        <Text style={{ textAlign: "center", fontSize: 20 }}>Products</Text>
      );
    }
  };
  // const updateProductSwitch = () => {
  //   if (isEnabled) return null;
  //   else return updateProduct();
  // };
  useEffect(() => {
    onSnapshot(doc(db, "users", auth.currentUser.email), (doc) => {
      // setCompanyDB(doc.get("company"));

      dispatch(setCompany(doc.get("company")));
      setCompanyDB(doc.get("company"));
      // dispatch(setCompany(data.company));
      // setCompanyDB(data.company);
      // console.log("aa " + companyDB);
      // dispatch(setIsAuthUser(data.isAuthUser));
      // setIsAuthUserLocal(data.isAuthUser);
      // console.log(isAuthUser);
    });
  }, [refresh]);
  useEffect(() => {
    onSnapshot(doc(db, "users", auth.currentUser.email), (doc) => {
      // setCompanyDB(doc.get("company"));

      // dispatch(setCompany(doc.get("company")));
      // setCompanyDB(doc.get("company"));
      //dispatch(setCompany(data.company));
      // setCompanyDB(data.company);
      // console.log("aa " + companyDB);
      dispatch(setIsAuthUser(doc.get("isAuthUser")));
      setIsAuthUserLocal(doc.get("isAuthUser"));
      // console.log(isAuthUser);
    });
  }, [refresh]);
  const ShowAuthSettings = () => {
    if (isAuthUser == true) {
      return (
        <View>
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
          {/* <CompanyButton
            companyTextShort={"VIC"}
            onPress={() => {
              setSelectedCompany("Vitalize Infusion");
            }}
            onPressNull={() => {
              setSelectedCompany(null);
            }}
            selectedCompany={selectedCompany}
            companyTextLong={"Vitalize Infusion"}
          /> */}
        </View>
      );
    }
  };

  const showSettings = () => {
    if (settings == true) {
      return (
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            backgroundColor: "#ABAAAA5B",
            width: Dimensions.get("screen").width / 4.5,
            alignItems: "center",
          }}
        >
          <View style={{ margin: 5 }}>
            <SettingsButton
              width={Dimensions.get("screen").width / 5.5}
              text={"Show Added Products"}
              setting={showAdded}
              onPressTrue={() => {
                setShowAdded(false);
              }}
              onPressFalse={() => {
                setShowAdded(true);
              }}
            />
          </View>
          <View style={{ margin: 5 }}>
            <SettingsButton
              width={Dimensions.get("screen").width / 5.5}
              text={"Show Office Equipment"}
              setting={showOfficeEquipment}
              onPressTrue={() => {
                setShowOfficeEquipment(false);
              }}
              onPressFalse={() => {
                setShowOfficeEquipment(true);
              }}
            />
          </View>
          {ShowAuthSettings()}
        </View>
      );
    }
  };

  useEffect(() => {
    if (isAuthUser == true) {
      if (selectedCompany != null) {
        setCompanyDB(selectedCompany);
      }
    }
  }, [isAuthUser, selectedCompany, showOfficeEquipment]);

  // useEffect(() => {
  //   try {
  //     const getData = onSnapshot(
  //       query(
  //         collection(db, "companys", companyDB, "products"),
  //         orderBy("timestamp", "desc")
  //       ),
  //       (querySnapshot) => {
  //         const products = [];
  //         querySnapshot.forEach((snap) => {
  //           products.push(snap.data());
  //           // key: snap.id;
  //         });
  //         // console.log(products);
  //         setProducts(products);
  //         setLoading(true);
  //       }
  //     );

  //     return () => {
  //       getData();
  //     };
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [companyDB, showOfficeEquipment, refresh]);
  useEffect(() => {
    if (showOfficeEquipment == true) {
      setAnyItems("office_equipment");
    } else {
      setAnyItems("products");
    }
  }, [showOfficeEquipment, companyDB, selectedCompany]);
  useEffect(() => {
    try {
      GetProducts({
        selectedCompany: companyDB,
        typeOfProduct: anyItems,
        productState: setProducts,
      });
    } catch (e) {
      console.log(e);
    }
  }, [companyDB, showOfficeEquipment, refresh, selectedCompany, anyItems]);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={{ flex: 1 }}>
            <View
              // Layout={Layout}
              // entering={FadeInDown}
              // exiting={FadeInUp}
              style={{ alignItems: "center", flex: 1 }}
            >
              <View style={{ flex: 0.1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 0.1,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (refresh == false) {
                        setRefresh(true);
                      }
                      if (refresh == true) {
                        setRefresh(false);
                      }
                    }}
                  >
                    <EvilIcons name="refresh" size={35} color="black" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0.5,

                    justifyContent: "center",
                  }}
                >
                  <View>{updateTitle()}</View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <DividerLine
                      lineWidth={Dimensions.get("screen").width / 8}
                      lineColor={"#0008ff"}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.1,

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (settings == false) {
                        setSettings(true);
                      } else {
                        setSettings(false);
                      }
                    }}
                  >
                    <AntDesign name="setting" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {showSettings()}
              <Animated.FlatList
                style={{ flex: 1 }}
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
                          setItemId(item.id);
                          const getProductDetails = onSnapshot(
                            doc(db, "companys", companyDB, anyItems, item.id),
                            (doc) => {
                              const productDetails = [];

                              productDetails.push(doc.data());
                              // key: snap.id;
                              setProductDetails(productDetails),
                                setLoading(true);
                              console.log("this is doc data:", productDetails);
                            }
                          );
                          if (showAdded == true) {
                            if (selectedIndex == 0) {
                              GetYearForSelectedItem({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: item.id,
                                YearState: setGraphLabelsX,
                                addOrUsed: "year added",
                                year: year.toString(),
                              });

                              GetProductQuantityYear({
                                selectedCompany: companyDB,
                                barcode: item.id,
                                typeOfProduct: anyItems,
                                QuantityState: setQuantity,
                                addOrUsed: "year added",
                                year: year.toString(),
                              });
                            }
                            if (selectedIndex == 1) {
                              GetMonthsForSelectedItems({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: item.id,
                                MonthState: setGraphLabelsX,
                                addOrUsed: "year added",
                                year: year.toString(),
                                month: month.toString(),
                              });
                              GetProductQuantityMonth({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: item.id,
                                QuantityState: setQuantity,
                                addOrUsed: "year added",
                                year: year.toString(),
                                month: month.toString(),
                              });
                            }
                            if (selectedIndex == 2) {
                              GetDayForSelectedItems({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: ItemId,
                                DayState: setGraphLabelsX,
                                addOrUsed: "year added",
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                              });
                              GetProductQuantityDay({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: ItemId,
                                QuantityState: setQuantity,
                                addOrUsed: "year added",
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                              });
                            }
                          } else {
                            if (selectedIndex == 0) {
                              GetYearForSelectedItem({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: item.id,
                                YearState: setGraphLabelsX,
                                addOrUsed: "year used",
                                year: year.toString(),
                              });

                              GetProductQuantityYear({
                                selectedCompany: companyDB,
                                barcode: item.id,
                                typeOfProduct: anyItems,
                                QuantityState: setQuantity,
                                addOrUsed: "year used",
                                year: year.toString(),
                              });
                            }
                            if (selectedIndex == 1) {
                              GetMonthsForSelectedItems({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: item.id,
                                MonthState: setGraphLabelsX,
                                addOrUsed: "year used",
                                year: year.toString(),
                                month: month.toString(),
                              });
                              GetProductQuantityMonth({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: item.id,
                                QuantityState: setQuantity,
                                addOrUsed: "year used",
                                year: year.toString(),
                                month: month.toString(),
                              });
                            }
                            if (selectedIndex == 2) {
                              GetDayForSelectedItems({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: ItemId,
                                DayState: setGraphLabelsX,
                                addOrUsed: "year used",
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                              });
                              GetProductQuantityDay({
                                selectedCompany: companyDB,
                                typeOfProduct: anyItems,
                                barcode: ItemId,
                                QuantityState: setQuantity,
                                addOrUsed: "year used",
                                year: year.toString(),
                                month: month.toString(),
                                day: day.toString(),
                              });
                            }
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
                keyExtractor={(item) => item.barcode}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={{ flex: 2.5, padding: 20 }}>
            <View
              style={{
                flex: 1,
                // backgroundColor: "#C8C8C8",
                borderRadius: 30,
                marginBottom: 30,
              }}
            >
              {/* <View style={{ flex: 1, margin: 10 }}> */}
              <LineChart
                data={{
                  labels: graphLabelsX,
                  datasets: [
                    {
                      data: quantity,
                    },
                  ],
                }}
                width={Dimensions.get("screen").width / 1.45} // from react-native
                height={Dimensions.get("screen").height / 2}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#D6D3D6",
                  backgroundGradientFrom: "#C8C8C8",
                  backgroundGradientTo: "#FFFFFF",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  color: (opacity = 1) => `rgba(0, 200,255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    padding: 20,
                  },
                  propsForDots: {
                    r: "8",
                    strokeWidth: "3",
                    stroke: "#26E6FF",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />

              {/* </View> */}
              <View
                style={{
                  flex: 1,
                  // backgroundColor: "#C8C8C8",
                  flexDirection: "row",
                  borderRadius: 20,
                  marginTop: 15,
                }}
              >
                <SegmentedControl
                  style={{ flex: 1 }}
                  values={["Year", "Month", "Day"]}
                  selectedIndex={selectedIndex}
                  onValueChange={async (val) => {
                    await setValue(val);
                    if (showAdded == true) {
                      if (val == "Year") {
                        await GetYearForSelectedItem({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          YearState: setGraphLabelsX,
                          addOrUsed: "year added",
                          year: year.toString(),
                        });

                        await GetProductQuantityYear({
                          selectedCompany: companyDB,
                          barcode: ItemId,
                          typeOfProduct: anyItems,
                          QuantityState: setQuantity,
                          addOrUsed: "year added",
                          year: year.toString(),
                        });
                      }
                      if (val == "Month") {
                        await GetMonthsForSelectedItems({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          MonthState: setGraphLabelsX,
                          addOrUsed: "year added",
                          year: year.toString(),
                          month: month.toString(),
                        });
                        await GetProductQuantityMonth({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          QuantityState: setQuantity,
                          addOrUsed: "year added",
                          year: year.toString(),
                          month: month.toString(),
                        });
                      }
                      if (val == "Day") {
                        await GetDayForSelectedItems({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          DayState: setGraphLabelsX,
                          addOrUsed: "year added",
                          year: year.toString(),
                          month: month.toString(),
                          day: day.toString(),
                        });
                        await GetProductQuantityDay({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          QuantityState: setQuantity,
                          addOrUsed: "year added",
                          year: year.toString(),
                          month: month.toString(),
                          day: day.toString(),
                        });
                      }
                    } else {
                      if (val == "Year") {
                        await GetYearForSelectedItem({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          YearState: setGraphLabelsX,
                          addOrUsed: "year used",
                          year: year.toString(),
                        });

                        await GetProductQuantityYear({
                          selectedCompany: companyDB,
                          barcode: ItemId,
                          typeOfProduct: anyItems,
                          QuantityState: setQuantity,
                          addOrUsed: "year used",
                          year: year.toString(),
                        });
                      }
                      if (val == "Month") {
                        await GetMonthsForSelectedItems({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          MonthState: setGraphLabelsX,
                          addOrUsed: "year used",
                          year: year.toString(),
                          month: month.toString(),
                        });
                        await GetProductQuantityMonth({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          QuantityState: setQuantity,
                          addOrUsed: "year used",
                          year: year.toString(),
                          month: month.toString(),
                        });
                      }
                      if (val == "Day") {
                        await GetDayForSelectedItems({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          DayState: setGraphLabelsX,
                          addOrUsed: "year used",
                          year: year.toString(),
                          month: month.toString(),
                          day: day.toString(),
                        });
                        await GetProductQuantityDay({
                          selectedCompany: companyDB,
                          typeOfProduct: anyItems,
                          barcode: ItemId,
                          QuantityState: setQuantity,
                          addOrUsed: "year used",
                          year: year.toString(),
                          month: month.toString(),
                          day: day.toString(),
                        });
                      }
                    }
                  }}
                  onChange={async (event) => {
                    await setSelectedIndex(
                      event.nativeEvent.selectedSegmentIndex
                    );
                    // const  updateGraph = () => {

                    // };
                    // updateGraph();
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                // backgroundColor: "purple",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "#C8C8C8",

                  flex: 1,
                }}
              >
                {/* <LinearGradient
                colors={["#BA40BE", "#3E31BB"]}
                style={{ flex: 1, borderRadius: 30 }}
              > */}
                <FlatList
                  data={productDetails}
                  renderItem={({ item }) => {
                    const yo = () => {};
                    //setUpdateProductDescription(item.decription);
                    const update = () => {
                      //   setDoc(
                      //     doc(db, "products", item.id),
                      //     {
                      //       // type_of_barcode: type,
                      //       barcode: updateProductBarcode,
                      //       // id: data,
                      //       product: updateProductName,
                      //       quantity: updateProductQuantity,
                      //       decription: updateProductDescription,
                      //       company: updateProductCompany,
                      //       timestamp: serverTimestamp(),
                      //     },
                      //     { merge: true }
                      //     // console.log("updated fields")
                      //   );
                    };
                    const toggleToEditProduct = () => {
                      if (isEnabled)
                        return (
                          <View>
                            <View style={styles.itemDescription}>
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    //  backgroundColor: "red",
                                    flex: 1,
                                  }}
                                >
                                  <TextInput
                                    style={
                                      styles.descriptionProductTitleTextInput
                                    }
                                    placeholder={item.product}
                                    type="Product Name"
                                    onChangeText={(text) =>
                                      setUpdateProductName(text)
                                    }
                                  ></TextInput>
                                  <TextInput
                                    style={
                                      styles.descriptionProductCompanyTextInput
                                    }
                                    placeholder={item.company}
                                    type="Product Company"
                                    onChangeText={(text) =>
                                      setUpdateProductCompany(text)
                                    }
                                  ></TextInput>
                                  <Text style={[styles.barcodeDescription]}>
                                    Barcode:{item.barcode}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // backgroundColor: "blue",
                                    flex: 0.2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: "row-reverse",
                                      alignSelf: "center",
                                      // backgroundColor: "blue",
                                    }}
                                  >
                                    <Switch
                                      style={styles.editSwitch}
                                      trackColor={{
                                        false: "#767577",
                                        true: "#008CFF",
                                      }}
                                      thumbColor={
                                        isEnabled ? "#FFFFFF" : "#f4f3f4"
                                      }
                                      ios_backgroundColor="#3e3e3e"
                                      onValueChange={toggleSwitch}
                                      value={isEnabled}
                                    />
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        alignSelf: "center",
                                        marginRight: 5,
                                        fontSize: 20,
                                      }}
                                    >
                                      Stop editing
                                    </Text>
                                  </View>
                                  <MainButton
                                    text={"update"}
                                    onPress={() => {
                                      setDoc(
                                        doc(
                                          db,
                                          "companys",
                                          companyDB,
                                          anyItems,
                                          item.id
                                        ),
                                        {
                                          // type_of_barcode: type,
                                          // barcode: updateProductBarcode,
                                          // id: data,
                                          // quantity: updateProductQuantity,
                                          product: updateProductName,
                                          decription: updateProductDescription,
                                          company: updateProductCompany,
                                          timestamp: serverTimestamp(),
                                        },
                                        { merge: true }
                                        // console.log("updated fields")
                                      );
                                    }}
                                    buttonWidth={90}
                                  ></MainButton>

                                  {/* <Text style={styles.quanitiyDescription}>
                                    Quantity:<Text>{item.quantity}</Text>
                                  </Text> */}
                                  <Text>{item.quanitiy}</Text>
                                  {/* <TextInput
                                    style={
                                      styles.descriptionProductQuantityTextInput
                                    }
                                    placeholder="Quantity"
                                    type="Product Quantity"
                                    onChangeText={(text) =>
                                      setUpdateProductQuantity(text)
                                    }
                                  ></TextInput> */}
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                // backgroundColor: "blue",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flex: 2,
                              }}
                            >
                              {/* <Text
                                style={{
                                  fontSize: 18,
                                  paddingHorizontal: 30,
                                  textAlign: "center",
                                }}
                              > */}
                              <TextInput
                                style={
                                  styles.descriptionProductDecriptionTextInput
                                }
                                placeholder={item.decription}
                                type="Product Quantity"
                                onChangeText={(text) =>
                                  setUpdateProductDescription(text)
                                }
                              ></TextInput>
                              {/* {item.decription}
                              </Text> */}
                            </View>
                          </View>
                        );
                      else
                        return (
                          <View
                            behavior={"height"}
                            keyboardVerticalOffset={50}
                            style={{ flex: 1 }}
                          >
                            <View style={styles.itemDescription}>
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    //  backgroundColor: "red",
                                    flex: 1,
                                  }}
                                >
                                  <Text style={styles.productTitleDescription}>
                                    {item.product}
                                  </Text>
                                  <Text style={styles.companyDescription}>
                                    {item.company}
                                  </Text>
                                  <Text style={[styles.barcodeDescription]}>
                                    Barcode: {item.barcode}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // backgroundColor: "blue",
                                    flex: 0.2,
                                    justifyContent: "center",
                                  }}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: "row",
                                      alignSelf: "center",
                                      // backgroundColor: "blue",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        alignSelf: "center",
                                        marginRight: 5,
                                        fontSize: 20,
                                      }}
                                    >
                                      Edit
                                    </Text>
                                    <Switch
                                      style={styles.editSwitch}
                                      trackColor={{
                                        false: "#767577",
                                        true: "#008CFF",
                                      }}
                                      thumbColor={
                                        isEnabled ? "#FFFFFF" : "#f4f3f4"
                                      }
                                      ios_backgroundColor="#3e3e3e"
                                      onValueChange={toggleSwitch}
                                      value={isEnabled}
                                    />
                                  </View>
                                  <Text style={styles.quanitiyDescription}>
                                    Quantity:<Text>{item.quantity}</Text>
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                // backgroundColor: "blue",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flex: 2,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 18,
                                  paddingHorizontal: 30,
                                  textAlign: "center",
                                  marginRight: 60,
                                }}
                              >
                                {item.decription}
                              </Text>
                            </View>
                          </View>
                        );
                    };
                    return <View>{toggleToEditProduct()}</View>;
                  }}
                  keyExtractor={(item, index) => index}
                  showsVerticalScrollIndicator={false}
                />
                {/* </LinearGradient> */}
              </View>
            </View>
          </View>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DFDBDBEC",
  },
  container2: {
    flex: 1,
    flexDirection: "row",
  },
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
  barcode: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#5A5858AF",
    fontSize: 20,
  },
  itemDescription: {
    flex: 1,
    padding: 30,
    paddingLeft: 100,
  },
  productTitleDescription: {
    fontSize: 38,
    alignSelf: "center",
    fontWeight: "bold",
    // paddingLeft: 50,
  },
  quanitiyDescription: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 5,
  },
  companyDescription: {
    fontSize: 20,
    alignSelf: "center",
    // paddingLeft: 35,
  },
  barcodeDescription: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#5A5858AF",
    fontSize: 15,
    // paddingLeft: 70,
  },
  editSwitch: { alignSelf: "center" },
  descriptionProductTitleTextInput: {
    borderRadius: 50,
    // height: 65,
    // width: 300,
    borderColor: "#ADAFAF",
    borderWidth: 2,
    // marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#C7C7C74D",
    fontSize: 38,
    alignSelf: "center",
    fontWeight: "bold",
  },
  descriptionProductCompanyTextInput: {
    borderRadius: 50,
    // height: 65,
    // width: 300,
    borderColor: "#ADAFAF",
    borderWidth: 2,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#C7C7C74D",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },

  descriptionProductBarcodeTextInput: {
    borderRadius: 50,
    // height: 65,
    // width: 300,
    borderColor: "#ADAFAF",
    borderWidth: 2,
    // marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#C7C7C74D",
    fontSize: 15,
    alignSelf: "center",
  },
  descriptionProductQuantityTextInput: {
    borderRadius: 50,
    // height: 65,
    // width: 300,
    borderColor: "#ADAFAF",
    borderWidth: 2,
    // marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#C7C7C74D",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  descriptionProductDecriptionTextInput: {
    borderRadius: 50,
    // height: 65,
    // width: 300,
    borderColor: "#ADAFAF",
    borderWidth: 2,
    // marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#C7C7C74D",
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
    marginRight: 70,
  },
  // toDo: {
  //   textAlign: "center",
  //   fontSize: 20,
  // },
});

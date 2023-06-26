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
import React, { useLayoutEffect, useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  setAllProducts,
  setCompany,
  setIsAuthUser,
} from "../slices/globalSlice";
import DividerLine from "../components/DividerLine";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import CompanyButton from "../components/CompanyPickerButton";
import SettingsButton from "../components/SettingsButton";
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
import ListItemExpand from "../components/ListItemExpand";
import { useNavigation } from "@react-navigation/native";

const HomeScreenPhone = () => {
  const [showOfficeEquipment, setShowOfficeEquipment] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [products, setProducts] = useState(null);
  const [settings, setSettings] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [isAuthUser, setIsAuthUserLocal] = useState(false);
  const [companyDB, setCompanyDB] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [anyItems, setAnyItems] = useState("products");
  const [refresh, setRefresh] = useState(false);
  const [ItemId, setItemId] = useState(null);

  const [itemIndex, setItemIndex] = useState(null);
  const dispatch = useDispatch();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [itemYear, setItemYear] = useState(null);
  const [itemMonth, setItemMonth] = useState(null);
  const [itemDay, setItemDay] = useState(null);
  const [quantityYear, setQuantityYear] = useState(null);
  const [quantityMonth, setQuantityMonth] = useState(null);
  const [quantityDay, setQuantityDay] = useState(null);
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  const ITEM_SIZE = 90 + 18 * 3;
  const navigation = useNavigation();

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
  useEffect(() => {
    try {
      if (isAuthUser == true) {
        if (selectedCompany != null) {
          setCompanyDB(selectedCompany);
        }
      }
    } catch (e) {
      alert(e);
    }
  }, [isAuthUser, selectedCompany, showOfficeEquipment]);
  useEffect(() => {
    try {
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
    } catch (e) {
      alert(e);
    }
  }, []);
  useEffect(() => {
    try {
      if (showOfficeEquipment == true) {
        setAnyItems("office_equipment");
      } else {
        setAnyItems("products");
      }
    } catch (e) {
      alert(e);
    }
  }, [showOfficeEquipment, companyDB, selectedCompany]);

  useEffect(() => {
    try {
      onSnapshot(doc(db, "users", auth.currentUser.email), (doc) => {
        // setCompanyDB(doc.get("company"));

        // dispatch(setCompany(doc.get("company")));
        // setCompanyDB(doc.get("company"));
        //dispatch(setCompany(data.company));
        // setCompanyDB(data.company);
        // console.log("aa " + companyDB);
        dispatch(setIsAuthUser(doc.get("isAuthUser")));
        setIsAuthUserLocal(doc.get("isAuthUser"));
        console.log(doc.get("isAuthUser"));
      });
    } catch (e) {
      alert(e);
    }
    // console.log(isAuthUser);
  }, [refresh]);
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
  useEffect(() => {
    dispatch(setAllProducts(products));
  }, [products]);

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
  const showSettings = () => {
    if (settings == true) {
      return (
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            backgroundColor: "#ABAAAA5B",
            width: Dimensions.get("screen").width / 1.2,
            alignItems: "center",
          }}
        >
          <View style={{ margin: 5 }}>
            <SettingsButton
              width={Dimensions.get("screen").width / 1.5}
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
              width={Dimensions.get("screen").width / 1.5}
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
  return (
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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <DividerLine
                lineWidth={Dimensions.get("screen").width / 2}
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
          style={{ flex: 1, margin: 20 }}
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
            const showAllDetails = () => {
              if (showDetails == true) {
              }
            };

            return (
              <ListItemExpand
                item={item}
                companyDB={companyDB}
                anyItems={anyItems}
                showAdded={showAdded}
                scale={scale}
                opacity={opacity}
              />
            );
          }}
          keyExtractor={(item) => item.barcode}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreenPhone;

const styles = StyleSheet.create({
  item: {
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
  },
  barcode: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#5A5858AF",
    fontSize: 20,
  },
});

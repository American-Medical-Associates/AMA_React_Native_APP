// THIS IS THE CLEANED UP INPUT BOX COMPONENT FROM GPT 3.5

// TODO: This component requires further testing and debugging
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  addDoc,
  deleteDoc,
  increment,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
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
import { setSelectedProduct } from "../slices/globalSlice";

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
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const getProductDetails = async () => {
    const docRef = doc(db, "companys", companyDB, anyItems, item.id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const productDetails = [data];
    setProductDetails(productDetails);
    console.log("this is doc data:", productDetails);
  };

  const getYearAndQuantityForSelectedItem = async (addOrUsed) => {
    try {
      const yearState =
        addOrUsed === "year added" ? setItemYear : setQuantityYear;
      const yearQuantity = await GetYearForSelectedItem({
        selectedCompany: companyDB,
        typeOfProduct: anyItems,
        barcode: item.id,
        YearState: yearState,
        addOrUsed,
        year: year.toString(),
      });

      if (addOrUsed === "year added") {
        setItemYear(yearQuantity);
      } else {
        setQuantityYear(yearQuantity);
      }
    } catch (e) {
      setItemYear("Nothing to Show");
      setQuantityYear("Nothing to Show");
    }
  };

  const getMonthsAndQuantityForSelectedItems = async (addOrUsed) => {
    try {
      const monthState =
        addOrUsed === "year added" ? setItemMonth : setQuantityMonth;
      const monthQuantity = await GetMonthsForSelectedItems({
        selectedCompany: companyDB,
        typeOfProduct: anyItems,
        barcode: item.id,
        MonthState: monthState,
        addOrUsed,
        year: year.toString(),
        month: month.toString(),
      });

      if (addOrUsed === "year added") {
        setItemMonth(monthQuantity);
      } else {
        setQuantityMonth(monthQuantity);
      }
    } catch (e) {
      setItemMonth("Nothing to Show");
      setQuantityMonth("Nothing to Show");
    }
  };

  const getDayAndQuantityForSelectedItems = async (addOrUsed) => {
    try {
      const dayState = addOrUsed === "year added" ? setItemDay : setQuantityDay;
      const dayQuantity = await GetDayForSelectedItems({
        selectedCompany: companyDB,
        typeOfProduct: anyItems,
        barcode: ItemId,
        DayState: dayState,
        addOrUsed,
        year: year.toString(),
        month: month.toString(),
        day: day.toString(),
      });

      if (addOrUsed === "year added") {
        setItemDay(dayQuantity);
      } else {
        setQuantityDay(dayQuantity);
      }
    } catch (e) {
      setItemDay("Nothing to Show");
      setQuantityDay("Nothing to Show");
    }
  };

  const toggleDetails = async () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      setShowDetails(true);
    }
    setItemId(item.id);

    await getProductDetails();

    if (showAdded) {
      await getYearAndQuantityForSelectedItem("year added");
      await getMonthsAndQuantityForSelectedItems("year added");
      await getDayAndQuantityForSelectedItems("year added");
    } else {
      await getYearAndQuantityForSelectedItem("year used");
      await getMonthsAndQuantityForSelectedItems("year used");
      await getDayAndQuantityForSelectedItems("year used");
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <TouchableOpacity onLongPress={addToRedux} onPress={toggleDetails}>
        <View
          style={{
            backgroundColor: "#DBDBDBB4",
            padding: 20,
            marginVertical: 10,
            paddingHorizontal: 20,
            width: Dimensions.get("screen").width / 1.2,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, margin: 5 }}>{item.product}</Text>
          <Text style={{ color: "#4F4F4F" }}>Quantity: {item.quantity}</Text>
          {showDetails && (
            <FlatList
              data={productDetails}
              renderItem={({ item, index }) => (
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
                </View>
              )}
            />
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

// THIS IS THE ORIGINAL INPUT BOX COMPONENT

// import {
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   Text,
//   View,
//   Animated,
//   ScrollView,
//   Switch,
//   Dimensions,
//   TextInput,
//   KeyboardAvoidingView,
//   FlatList,
//   Easing,
// } from "react-native";
// import {
//   deleteDoc,
//   documentId,
//   DocumentSnapshot,
//   getDoc,
//   increment,
//   limit,
//   onSnapshot,
//   orderBy,
//   query,
//   QuerySnapshot,
//   serverTimestamp,
//   getDocs,
//   collection,
//   addDoc,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import React, { useState } from "react";
// import {
//   db,
//   auth,
//   GetProducts,
//   GetYearForSelectedItem,
//   GetProductQuantityYear,
//   GetMonthsForSelectedItems,
//   GetProductQuantityMonth,
//   GetDayForSelectedItems,
//   GetProductQuantityDay,
// } from "../firebase";
// import DividerLine from "./DividerLine";
// import { useNavigation } from "@react-navigation/native";
// import { setSelectedProduct } from "../slices/globalSlice";
// import { useDispatch } from "react-redux";

// export default function ListItemExpand({
//   item,
//   showAdded,
//   companyDB,
//   anyItems,
//   scale,
//   opacity,
// }) {
//   const [showDetails, setShowDetails] = useState(false);

//   const [productDetails, setProductDetails] = useState(null);

//   const [ItemId, setItemId] = useState(null);

//   const [itemIndex, setItemIndex] = useState(null);

//   const [itemYear, setItemYear] = useState(null);
//   const [itemMonth, setItemMonth] = useState(null);
//   const [itemDay, setItemDay] = useState(null);
//   const [quantityYear, setQuantityYear] = useState(null);
//   const [quantityMonth, setQuantityMonth] = useState(null);
//   const [quantityDay, setQuantityDay] = useState(null);
//   const [updateItem, setUpdateItem] = useState(false);
//   var currentDate = new Date();
//   var year = currentDate.getFullYear();
//   var month = currentDate.getMonth() + 1;
//   var day = currentDate.getDate();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   return (
//     <Animated.View style={{ transform: [{ scale }], opacity }}>
//       <TouchableOpacity
//         onLongPress={async () => {
//           const addToRedux = () => {
//             dispatch(
//               setSelectedProduct({
//                 product: item.product,
//                 barcode: item.barcode,
//                 description: item.description,
//                 location: item.itemLocation,
//                 quantity: item.quantity,
//                 company: item.company,
//                 type: item.ItemType,
//               })
//             );
//             Promise.resolve(navigation.navigate("Inventory Edit Screen"));
//           };
//           addToRedux();
//           //navigation.navigate("Inventory Edit Screen");
//         }}
//         onPress={() => {
//           if (showDetails == true) {
//             setShowDetails(false);
//           } else {
//             setShowDetails(true);
//           }

//           setItemId(item.id);
//           // setItemIndex(index);

//           const getProductDetails = onSnapshot(
//             doc(db, "companys", companyDB, anyItems, item.id),
//             (doc) => {
//               const productDetails = [];

//               productDetails.push(doc.data());
//               // key: snap.id;
//               setProductDetails(productDetails),
//                 console.log("this is doc data:", productDetails);
//             }
//           );
//           // alert(JSON.stringify(item));

//           if (showAdded == true) {
//             try {
//               GetYearForSelectedItem({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: item.id,
//                 YearState: setItemYear,
//                 addOrUsed: "year added",
//                 year: year.toString(),
//               });

//               GetProductQuantityYear({
//                 selectedCompany: companyDB,
//                 barcode: item.id,
//                 typeOfProduct: anyItems,
//                 QuantityState: setQuantityYear,
//                 addOrUsed: "year added",
//                 year: year.toString(),
//               });
//             } catch (e) {
//               setItemYear("Nothing to Show");
//               setQuantityYear("Nothing to Show");
//             }
//             try {
//               GetMonthsForSelectedItems({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: item.id,
//                 MonthState: setItemMonth,
//                 addOrUsed: "year added",
//                 year: year.toString(),
//                 month: month.toString(),
//               });
//               GetProductQuantityMonth({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: item.id,
//                 QuantityState: setQuantityMonth,
//                 addOrUsed: "year added",
//                 year: year.toString(),
//                 month: month.toString(),
//               });
//             } catch (e) {
//               setItemMonth("Nothing to Show");
//               setQuantityMonth("Nothing to Show");
//             }
//             try {
//               GetDayForSelectedItems({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: ItemId,
//                 DayState: setItemDay,
//                 addOrUsed: "year added",
//                 year: year.toString(),
//                 month: month.toString(),
//                 day: day.toString(),
//               });
//               GetProductQuantityDay({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: ItemId,
//                 QuantityState: setQuantityDay,
//                 addOrUsed: "year added",
//                 year: year.toString(),
//                 month: month.toString(),
//                 day: day.toString(),
//               });
//             } catch (e) {
//               setItemDay("Nothing to Show");
//               setQuantityDay("Nothing to Show");
//             }
//           } else {
//             try {
//               GetYearForSelectedItem({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: item.id,
//                 YearState: setItemYear,
//                 addOrUsed: "year used",
//                 year: year.toString(),
//               });

//               GetProductQuantityYear({
//                 selectedCompany: companyDB,
//                 barcode: item.id,
//                 typeOfProduct: anyItems,
//                 QuantityState: setQuantityYear,
//                 addOrUsed: "year used",
//                 year: year.toString(),
//               });
//             } catch (e) {
//               setItemYear("Nothing to Show");
//               setQuantityYear("Nothing to Show");
//             }
//             try {
//               GetMonthsForSelectedItems({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: item.id,
//                 MonthState: setItemMonth,
//                 addOrUsed: "year used",
//                 year: year.toString(),
//                 month: month.toString(),
//               });
//               GetProductQuantityMonth({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: item.id,
//                 QuantityState: setQuantityMonth,
//                 addOrUsed: "year used",
//                 year: year.toString(),
//                 month: month.toString(),
//               });
//             } catch (e) {
//               setItemMonth("Nothing to Show");
//               setQuantityMonth("Nothing to Show");
//             }
//             try {
//               GetDayForSelectedItems({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: ItemId,
//                 DayState: setItemDay,
//                 addOrUsed: "year used",
//                 year: year.toString(),
//                 month: month.toString(),
//                 day: day.toString(),
//               });
//               GetProductQuantityDay({
//                 selectedCompany: companyDB,
//                 typeOfProduct: anyItems,
//                 barcode: ItemId,
//                 QuantityState: setQuantityDay,
//                 addOrUsed: "year used",
//                 year: year.toString(),
//                 month: month.toString(),
//                 day: day.toString(),
//               });
//             } catch (e) {
//               setItemDay("Nothing to Show");
//               setQuantityDay("Nothing to Show");
//             }
//           }
//         }}
//       >
//         <View
//           style={{
//             // backgroundColor: "#8A6EBED0",
//             backgroundColor: "#DBDBDBB4",
//             padding: 20,
//             marginVertical: 10,
//             paddingHorizontal: 20,
//             width: Dimensions.get("screen").width / 1.2,
//             // height: 70,
//             borderRadius: 40,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text style={{ fontSize: 22, margin: 5 }}>{item.product}</Text>
//           <Text style={{ color: "#4F4F4F" }}>Quantity:{item.quantity}</Text>
//           {showDetails == true && (
//             <FlatList
//               data={productDetails}
//               renderItem={({ item, index }) => {
//                 return (
//                   <View>
//                     <Text
//                       style={{
//                         margin: 10,
//                         fontSize: 18,
//                         textAlign: "center",
//                       }}
//                     >
//                       description: {item.description}
//                     </Text>
//                     <Text style={{ textAlign: "center", color: "#757575" }}>
//                       Location: {item.itemLocation}
//                     </Text>
//                     {/* <View style={{ margin: 10 }}>
//                       <Text style={{ textAlign: "center", margin: 5 }}>
//                         History
//                       </Text>
//                       <DividerLine
//                         lineWidth={Dimensions.get("screen").width / 3}
//                         lineColor={"#0008ff"}
//                       />
//                       <Text style={{ textAlign: "center" }}>
//                         Year: {quantityYear}
//                         {"\n"}
//                         Month: {quantityMonth}
//                         {"\n"}
//                         Day: {quantityDay}
//                       </Text>
//                     </View> */}
//                   </View>
//                 );
//               }}
//             ></FlatList>
//           )}
//         </View>
//         <Text
//           style={{
//             justifyContent: "center",
//             alignSelf: "center",
//             color: "#5A5858AF",
//             fontSize: 20,
//           }}
//         >
//           Barcode: {item.barcode}
//         </Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

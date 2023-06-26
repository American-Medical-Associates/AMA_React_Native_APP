import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { Picker } from "@react-native-picker/picker";
import DividerLine from "../components/DividerLine";
import MainButton from "../components/MainButton";
import { addMIS, UseExistingItemOnDb } from "../firebase";

import MISListItem from "../components/MISListItem";
import PatientSearch from "../components/PatientSearch";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  selectPatientDOB,
  selectPatientEmail,
  selectPatientFirstName,
  selectPatientLastName,
  setPatientDOB,
  setPatientFirstName,
  setPatientLastName,
} from "../slices/globalSlice";
import { increment } from "firebase/firestore";
// import DatePicker from "@react-native-community/datetimepicker";

const MISscreen = () => {
  //const [dob, setDob] = useState(null);
  const [typeOfAppoinment, setTypeOfAppoinment] = useState("Walk In");
  const [typeOfPatient, setTypeOfPatient] = useState("New");
  const [typeOfRefural, setTypeOfRefural] = useState("Google");
  const [providerRefural, setProviderRefural] = useState("Ashlee");
  const [typeOfIV, setTypeOfIV] = useState("Myers Cocktail");
  const [ivBagList, setIvBagList] = useState([]);
  const [ivBagObject, setIvBagObject] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [addOns, setAddOns] = useState("Electrolyte");
  const [addOnsList, setAddOnsList] = useState([]);
  const [addOnsObject, setAddOnsObject] = useState(null);
  const [vitaminInjections, setVitaminInjections] = useState("B Complex");
  const [injectionsList, setInjectionsList] = useState([]);
  const [injectionsObject, setInjectionsObject] = useState(null);
  const [visitNumber, setVisitNumber] = useState(null);
  const [booster, setBooster] = useState("Glutathione Booster");
  const [boosterList, setBoosterList] = useState([]);
  const [boosterObject, setBoosterObject] = useState(null);
  const [ulitma, setUlitma] = useState("Watermelon Packet");
  const [ulitmaList, setUlitmaList] = useState([]);
  const [ulitmaObject, setUlitmaObject] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [styku, setStyku] = useState("1 Scans");
  const [stykuList, setStykuList] = useState([]);
  const [stykuObject, setStykuObject] = useState(null);
  const [otherPricePhlebotomy, setOtherPricePhlebotomy] = useState(null);

  const [total, setTotal] = useState(0);
  const [totalList, setTotalList] = useState([]);
  const [totalObject, setTotalObject] = useState(null);
  const [Phlebotomy, setPhlebotomy] = useState("Lab Draw");
  const [PhlebotomyList, setPhlebotomyList] = useState([]);
  const [PhlebotomyObject, setPhlebotomyObject] = useState(null);
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [amaVitamins, setAmaVitamins] = useState("Myers AMA Vitamins");
  const [amaVitaminsList, setAmaVitaminsList] = useState([]);
  const [amaVitaminsObject, setAmaVitaminsObject] = useState(null);
  const [virtueRF, setVirtueRF] = useState("Buccal");
  const [virtueRFList, setVirtueRFList] = useState([]);
  const [virtueRFObject, setVirtueRFObject] = useState(null);
  const [splendorX, setSplendorX] = useState("Vascular Treatment");
  const [splendorXList, setSplendorXList] = useState([]);
  const [splendorXObject, setSplendorXObject] = useState(null);
  const [
    listOfProductsToRemoveFromInventory,
    setListOfProductsToRemoveFromInventory,
  ] = useState([]);

  const firstName = useSelector(selectPatientFirstName);
  const lastName = useSelector(selectPatientLastName);
  const dob = useSelector(selectPatientDOB);
  const email = useSelector(selectPatientEmail);
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  const [timePatientWasSeen, setTimePatientWasSeen] = useState("9:00AM");

  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var day = new Date().getDate();
  var hour = new Date().getHours();
  console.log("kkkk", allProducts);

  const amaProvider = () => {
    if (typeOfRefural == "AMA Provider") {
      return (
        <Picker
          style={{
            //   sheight: 50,
            width: Dimensions.get("screen").width / 1.5,

            //   marginBottom: 100,
          }}
          selectedValue={providerRefural}
          onValueChange={(itemValue, itemIndex) =>
            setProviderRefural(itemValue)
          }
        >
          <Picker.Item label="Ashlee" value="Ashlee" />
          <Picker.Item label="Nicole" value="Nicole" />
          <Picker.Item label="Seun" value="Seun" />
          <Picker.Item label="Dr. Nadir" value="Dr. Nadir" />
          <Picker.Item label="Dr. Khan" value="Dr. Khan" />
          <Picker.Item label="Daniel" value="Daniel" />
          <Picker.Item label="Brett" value="Brett" />
        </Picker>
      );
    }
  };
  var firstNames = null;
  useEffect(() => {
    //create random visit number
    const visitNumber = Math.floor(Math.random() * 1000000000000000);
    setVisitNumber(visitNumber);
    return () => {
      undefined;
    };
  }, [refresh]);

  useEffect(() => {
    //get total by adding up all in toal list

    var total = 0;
    if (totalList.length > 0) {
      totalList.forEach((item) => {
        total = total + item;
        console.log(total);
      });
      //find total aftrer discount percentage

      var discountAmount = (total * discount) / 100;
      var totalAfterDiscount = total - discountAmount;
      setTotalBeforeDiscount(total);
      setTotal(totalAfterDiscount);
    } else {
      setTotalBeforeDiscount(0);
      setTotal(0);
      total = 0;
    }
    return () => {
      undefined;
    };
  }, [totalList, refresh, discount]);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View style={{ alignItems: "center" }}>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          data={[true]}
          renderItem={({ item, index }) => {
            return (
              <View style={{ alignItems: "center", flex: 1, margin: 20 }}>
                <PatientSearch />
                {firstName != null && lastName != null && dob != null && (
                  <View
                    style={{
                      backgroundColor: "#0291FFE6",
                      width: Dimensions.get("screen").width / 1.5,
                      margin: 10,
                      borderRadius: 40,
                      padding: 10,
                    }}
                  >
                    <TouchableOpacity
                      onLongPress={() => {
                        dispatch(setPatientDOB(null));
                        dispatch(setPatientFirstName(null));
                        dispatch(setPatientLastName(null));
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 18 }}>
                        {firstName} {lastName}
                      </Text>
                      <Text style={{ textAlign: "center", fontSize: 18 }}>
                        {dob}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Picker
                  style={{
                    //   sheight: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 100,
                  }}
                  selectedValue={typeOfAppoinment}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfAppoinment(itemValue)
                  }
                >
                  <Picker.Item label="Walk In" value="Walk In" />
                  <Picker.Item label="Scheduled" value="Scheduled" />
                </Picker>
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Time Patient was Seen
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={timePatientWasSeen}
                  onValueChange={(itemValue, itemIndex) =>
                    setTimePatientWasSeen(itemValue)
                  }
                >
                  <Picker.Item label="7:00AM" value="7:00AM" />
                  <Picker.Item label="7:30AM" value="7:30AM" />
                  <Picker.Item label="8:00AM" value="8:00AM" />
                  <Picker.Item label="8:30M" value="8:30M" />
                  <Picker.Item label="9:00AM" value="9:00AM" />
                  <Picker.Item label="9:30AM" value="9:30AM" />
                  <Picker.Item label="10:00AM" value="10:00AM" />
                  <Picker.Item label="10:30AM" value="10:30AM" />
                  <Picker.Item label="11:00AM" value="11:00AM" />
                  <Picker.Item label="11:30AM" value="11:30AM" />
                  <Picker.Item label="12:00PM" value="12:00PM" />
                  <Picker.Item label="12:30PM" value="12:30PM" />
                  <Picker.Item label="1:00PM" value="1:00PM" />
                  <Picker.Item label="1:30PM" value="1:30PM" />
                  <Picker.Item label="2:00PM" value="2:00PM" />
                  <Picker.Item label="2:30PM" value="2:30PM" />
                  <Picker.Item label="3:00PM" value="3:00PM" />
                  <Picker.Item label="3:30PM" value="3:30PM" />
                  <Picker.Item label="4:00PM" value="4:00PM" />
                  <Picker.Item label="4:30PM" value="4:30PM" />
                  <Picker.Item label="5:00PM" value="5:00PM" />
                  <Picker.Item label="5:30PM" value="5:30PM" />
                  <Picker.Item label="6:00PM" value="6:00PM" />
                  <Picker.Item label="6:30PM" value="6:30PM" />
                  <Picker.Item label="7:00PM" value="7:00PM" />
                  <Picker.Item label="7:30PM" value="7:30PM" />
                  <Picker.Item label="8:00PM" value="8:00PM" />
                  <Picker.Item label="8:30PM" value="8:30PM" />
                  <Picker.Item label="9:00PM" value="9:00PM" />
                  <Picker.Item label="9:30PM" value="9:30PM" />
                  <Picker.Item label="10:00PM" value="10:00PM" />
                </Picker>

                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={typeOfRefural}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfRefural(itemValue)
                  }
                >
                  <Picker.Item label="Google" value="Google" />
                  <Picker.Item label="Walk by" value="Walk by" />
                  <Picker.Item label="Instagram" value="Instagram" />
                  <Picker.Item label="Facebook" value="Facebook" />
                  <Picker.Item label="Yelp" value="Yelp" />

                  <Picker.Item label="Word of Mouth" value="Word of Mouth" />
                  <Picker.Item label="Online Add" value="Online Add" />
                  <Picker.Item label="AMA Provider" value="AMA Provider" />
                  <Picker.Item label="N/A" value="N/A" />
                  <Picker.Item
                    label="Vitalize Medspa"
                    value="Vitalize Medspa"
                  />
                  <Picker.Item label="Youtube" value="Youtube" />
                </Picker>
                {amaProvider()}
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Type Of Patient
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={typeOfPatient}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfPatient(itemValue)
                  }
                >
                  <Picker.Item label="New" value="New" />
                  <Picker.Item label="Established" value="Established" />
                  <Picker.Item label="Concierge" value="Concierge" />
                </Picker>
                <MISListItem
                  titleOfList={"Type Of Bag"}
                  pickerItems={[
                    <Picker.Item
                      label="Myers Cocktail"
                      value="Myers Cocktail"
                    />,
                    <Picker.Item
                      label="1L Mini Myers Cocktail"
                      value="1L Mini Myers Cocktail"
                    />,
                    <Picker.Item label="1L Saline" value="1L Saline" />,
                    <Picker.Item label="AMA 1L Saline" value="AMA 1L Saline" />,
                    <Picker.Item label="500ml Saline" value="500ml Saline" />,
                    <Picker.Item label="Forever Young" value="Forever Young" />,
                    <Picker.Item label="Myers +" value="Myers +" />,

                    <Picker.Item label="NAD+ 250MG" value="NAD+ 250MG" />,
                    <Picker.Item label="NAD+ 500MG" value="NAD+ 500MG" />,
                    <Picker.Item label="NAD+ 1000MG" value="NAD+ 1000MG" />,

                    <Picker.Item label="Vitamin C-5G" value="Vitamin C-5G" />,
                    <Picker.Item label="High Dose C" value="High Dose C" />,
                  ]}
                  setPickedList={setIvBagList}
                  selectedValue={typeOfIV}
                  setPickerState={setTypeOfIV}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={ivBagList}
                  pickerValue={typeOfIV}
                  totalList={totalList}
                  setObject={setIvBagObject}
                  object={ivBagObject}
                  listKeyNumber={1}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />

                {ivBagList.find((element) => {
                  if (element.product == "AMA 1L Saline") {
                    return true;
                  }
                }) && (
                  <MISListItem
                    titleOfList={"AMA Vitamins"}
                    pickerItems={[
                      <Picker.Item
                        label="Myers AMA Vitamins"
                        value="Myers AMA Vitamins"
                      />,
                      <Picker.Item
                        label="Myers + AMA Vitamins"
                        value="Myers + AMA Vitamins"
                      />,
                      <Picker.Item
                        label="Glutathione AMA Vitamins"
                        value="Glutathione AMA Vitamins"
                      />,
                    ]}
                    setPickedList={setAmaVitaminsList}
                    selectedValue={amaVitamins}
                    setPickerState={setAmaVitamins}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    pickedList={amaVitaminsList}
                    pickerValue={amaVitamins}
                    totalList={totalList}
                    setObject={setAmaVitaminsObject}
                    object={amaVitaminsObject}
                    listKeyNumber={2}
                    listOfProductsToRemoveFromInventory={
                      listOfProductsToRemoveFromInventory
                    }
                  />
                )}

                <MISListItem
                  titleOfList={"Add Ons"}
                  pickerItems={[
                    <Picker.Item
                      label="Electrolyte Add-On"
                      value="Electrolyte Add-On"
                    />,

                    <Picker.Item label="Zinc Add-On" value="Zinc Add-On" />,
                    <Picker.Item
                      label="Vitamin C Add-On"
                      value="Vitamin C Add-On"
                    />,
                    <Picker.Item
                      label="Glutathione Add-On"
                      value="Glutathione Add-On"
                    />,
                    <Picker.Item
                      label="B Complex add-on"
                      value="B Complex add-on"
                    />,
                    <Picker.Item label="B12 Add-On" value="B12 Add-On" />,
                    <Picker.Item label="4MG Zofran" value="4MG Zofran" />,

                    <Picker.Item
                      label="AMA 4MG Zofran"
                      value="AMA 4MG Zofran"
                    />,
                    <Picker.Item
                      label="500Ml Saline Exchange Add-On"
                      value="500Ml Saline Exchange Add-On"
                    />,
                  ]}
                  setPickedList={setAddOnsList}
                  selectedValue={addOns}
                  setPickerState={setAddOns}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={addOnsList}
                  pickerValue={addOns}
                  totalList={totalList}
                  listKeyNumber={3}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"Injections"}
                  pickerItems={[
                    <Picker.Item
                      label="B Complex Shot"
                      value="B Complex Shot"
                    />,

                    <Picker.Item label="B-12 Shot" value="B-12 Shot" />,
                    <Picker.Item label="MIC-B12 Shot" value="MIC-B12 Shot" />,
                    <Picker.Item
                      label="Vitamin D Shot"
                      value="Vitamin D Shot"
                    />,
                    <Picker.Item
                      label="MIC JAGGER Shot"
                      value="MIC JAGGER Shot"
                    />,
                  ]}
                  setPickedList={setInjectionsList}
                  selectedValue={vitaminInjections}
                  setPickerState={setVitaminInjections}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={injectionsList}
                  pickerValue={vitaminInjections}
                  totalList={totalList}
                  listKeyNumber={4}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"boosters"}
                  pickerItems={[
                    <Picker.Item
                      label="Glutathione Booster"
                      value="Glutathione Booster"
                    />,
                    <Picker.Item
                      label="Vitamin C Booster"
                      value="Vitamin C Booster"
                    />,
                  ]}
                  setPickedList={setBoosterList}
                  selectedValue={booster}
                  setPickerState={setBooster}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={boosterList}
                  pickerValue={booster}
                  totalList={totalList}
                  listKeyNumber={5}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Payment Type
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) =>
                    setPaymentMethod(itemValue)
                  }
                >
                  <Picker.Item label="Cash" value="Cash" />
                  <Picker.Item label="Card" value="Card" />
                  <Picker.Item label="Gift Card" value="Gift Card" />
                </Picker>
                {/* //Watermelon, raspberry, grape, orange, cherry pomegranate,lemon
                aid ,pink lemon aid, blue raspberry,mocktini */}
                <MISListItem
                  titleOfList={"Products"}
                  pickerItems={[
                    <Picker.Item
                      label="Watermelon Packet"
                      value="Watermelon Packet"
                    />,
                    <Picker.Item
                      label="Watermelon Box"
                      value="Watermelon Box"
                    />,
                    <Picker.Item
                      label="Watermelon Canister"
                      value="Watermelon Canister"
                    />,
                    <Picker.Item
                      label="Watermelon Tub"
                      value="Watermelon Tub"
                    />,
                    <Picker.Item
                      label="Raspberry Packet"
                      value="Raspberry Packet"
                    />,
                    <Picker.Item label="Raspberry Box" value="Raspberry Box" />,
                    <Picker.Item
                      label="Raspberry Canister"
                      value="Raspberry Canister"
                    />,
                    <Picker.Item label="Raspberry Tub" value="Raspberry Tub" />,
                    <Picker.Item label="Grape Packet" value="Grape Packet" />,
                    <Picker.Item label="Grape Box" value="Grape Box" />,
                    <Picker.Item
                      label="Grape Canister"
                      value="Grape Canister"
                    />,
                    <Picker.Item label="Grape Tub" value="Grape Tub" />,
                    <Picker.Item label="Orange Packet" value="Orange Packet" />,
                    <Picker.Item label="Orange Box" value="Orange Box" />,
                    <Picker.Item
                      label="Orange Canister"
                      value="Orange Canister"
                    />,
                    <Picker.Item label="Orange Tub" value="Orange Tub" />,
                    <Picker.Item
                      label="Cherry Pomegranate Packet"
                      value="Cherry Pomegranate Packet"
                    />,
                    <Picker.Item
                      label="Cherry Pomegranate Box"
                      value="Cherry Pomegranate Box"
                    />,
                    <Picker.Item
                      label="Cherry Pomegranate Canister"
                      value="Cherry Pomegranate Canister"
                    />,
                    <Picker.Item
                      label="Cherry Pomegranate Tub"
                      value="Cherry Pomegranate Tub"
                    />,
                    <Picker.Item
                      label="Lemon Aid Packet"
                      value="Lemon Aid Packet"
                    />,
                    <Picker.Item label="Lemon Aid Box" value="Lemon Aid Box" />,
                    <Picker.Item
                      label="Lemon Aid Canister"
                      value="Lemon Aid Canister"
                    />,
                    <Picker.Item label="Lemon Aid Tub" value="Lemon Aid Tub" />,
                    <Picker.Item
                      label="Pink Lemon Aid Packet"
                      value="Pink Lemon Aid Packet"
                    />,
                    <Picker.Item
                      label="Pink Lemon Aid Box"
                      value="Pink Lemon Aid Box"
                    />,
                    <Picker.Item
                      label="Pink Lemon Aid Canister"
                      value="Pink Lemon Aid Canister"
                    />,
                    <Picker.Item
                      label="Pink Lemon Aid Tub"
                      value="Pink Lemon Aid Tub"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Packet"
                      value="Blue Raspberry Packet"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Box"
                      value="Blue Raspberry Box"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Canister"
                      value="Blue Raspberry Canister"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Tub"
                      value="Blue Raspberry Tub"
                    />,
                    <Picker.Item
                      label="Mocktini Packet"
                      value="Mocktini Packet"
                    />,
                    <Picker.Item label="Mocktini Box" value="Mocktini Box" />,
                    <Picker.Item
                      label="Mocktini Canister"
                      value="Mocktini Canister"
                    />,
                    <Picker.Item label="Mocktini Tub" value="Mocktini Tub" />,
                    <Picker.Item label="Sarcotropin" value="Sarcotropin" />,
                  ]}
                  setPickedList={setUlitmaList}
                  selectedValue={ulitma}
                  setPickerState={setUlitma}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={ulitmaList}
                  pickerValue={ulitma}
                  totalList={totalList}
                  listKeyNumber={6}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"Styku"}
                  pickerItems={[
                    <Picker.Item label="1 Scans" value="1 Scans" />,
                    <Picker.Item label="3 Scans" value="3 Scans" />,
                  ]}
                  setPickedList={setStykuList}
                  selectedValue={styku}
                  setPickerState={setStyku}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={stykuList}
                  pickerValue={styku}
                  totalList={totalList}
                  listKeyNumber={7}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"Phlebotomy"}
                  pickerItems={[
                    <Picker.Item label="Lab Draw" value="Lab Draw" />,
                    <Picker.Item
                      label="Therapeutic Phlebotomy"
                      value="Therapeutic Phlebotomy"
                    />,
                    <Picker.Item
                      label="Other Phlebotomy"
                      value="Other Phlebotomy"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={8}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  MedSpa
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 1.2}
                  lineColor={"#34B417"}
                />
                <MISListItem
                  titleOfList={"Splendor X"}
                  pickerItems={[
                    <Picker.Item
                      label="Vascular Treatment"
                      value="Vascular Treatment"
                    />,
                    <Picker.Item
                      label="Vascular Treatment package of 6"
                      value="Vascular Treatment package of 6"
                    />,
                    <Picker.Item
                      label="Pigment Treatment"
                      value="Pigment Treatment"
                    />,
                    <Picker.Item
                      label="Pigment Treatment package of 6"
                      value="Pigment Treatment package of 6"
                    />,
                    <Picker.Item label="Laser Facial" value="Laser Facial" />,
                    <Picker.Item
                      label="Laser Facial package of 6"
                      value="Laser Facial package of 6"
                    />,
                    <Picker.Item
                      label="Extra Small Area"
                      value="Extra Small Area"
                    />,
                    <Picker.Item
                      label="Extra Small Area package of 6"
                      value="Extra Small Area package of 6"
                    />,
                    <Picker.Item label="Small Area" value="Small Area" />,
                    <Picker.Item
                      label="Small Area package of 6"
                      value="Small Area package of 6"
                    />,
                    <Picker.Item label="Medium Area" value="Medium Area" />,
                    <Picker.Item
                      label="Medium Area package of 6"
                      value="Medium Area package of 6"
                    />,
                    <Picker.Item label="Large Area" value="Large Area" />,
                    <Picker.Item
                      label="Large Area package of 6"
                      value="Large Area package of 6"
                    />,
                    <Picker.Item
                      label="Extra Large Area"
                      value="Extra Large Area"
                    />,
                    <Picker.Item
                      label="Extra Large Area package of 6"
                      value="Extra Large Area package of 6"
                    />,
                    <Picker.Item label="Full Body" value="Full Body" />,
                  ]}
                  setPickedList={setSplendorXList}
                  selectedValue={splendorX}
                  setPickerState={setSplendorX}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={splendorXList}
                  pickerValue={splendorX}
                  totalList={totalList}
                  listKeyNumber={9}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"Virtue RF"}
                  pickerItems={[
                    <Picker.Item label="Buccal" value="Buccal" />,
                    <Picker.Item
                      label="Buccal package of 3"
                      value="Buccal package of 3"
                    />,
                    <Picker.Item label="Submental" value="Submental" />,
                    <Picker.Item
                      label="Submental package of 3"
                      value="Submental package of 3"
                    />,
                    <Picker.Item label="Arms" value="Arms" />,
                    <Picker.Item
                      label="Arms package of 3"
                      value="Arms package of 3"
                    />,
                    <Picker.Item label="Abdomen" value="Abdomen" />,
                    <Picker.Item
                      label="Abdomen package of 3"
                      value="Abdomen package of 3"
                    />,
                    <Picker.Item label="Scars" value="Scars" />,
                    <Picker.Item
                      label="Scars package of 3"
                      value="Scars package of 3"
                    />,
                    <Picker.Item label="Buttocks" value="BucButtockscal" />,
                    <Picker.Item
                      label="Buttocks package of 3"
                      value="Buttocks package of 3"
                    />,
                    <Picker.Item label="Stretch Marks" value="Stretch Marks" />,
                    <Picker.Item
                      label="Stretch Marks package of 3"
                      value="Stretch Marks package of 3"
                    />,
                    <Picker.Item label="Thighs" value="Thighs" />,
                    <Picker.Item
                      label="Thighs package of 3"
                      value="Thighs package of 3"
                    />,
                    <Picker.Item label="Face" value="Face" />,
                    <Picker.Item
                      label="Face package of 3"
                      value="Face package of 3"
                    />,
                    <Picker.Item label="Face + Neck" value="Face + Neck" />,
                    <Picker.Item
                      label="Face + Neck package of 3"
                      value="Face + Neck package of 3"
                    />,
                    <Picker.Item
                      label="Face + Neck + Decollete"
                      value="Face + Neck + Decollete"
                    />,
                    <Picker.Item
                      label="Face + Neck + Decollete package of 3"
                      value="Face + Neck + Decollete package of 3"
                    />,
                  ]}
                  setPickedList={setVirtueRFList}
                  selectedValue={virtueRF}
                  setPickerState={setVirtueRF}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={virtueRFList}
                  pickerValue={virtueRF}
                  totalList={totalList}
                  listKeyNumber={10}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"Skin Better"}
                  pickerItems={[
                    <Picker.Item label="Cleaning Gel" value="Cleaning Gel" />,
                    <Picker.Item label="Oxygen Wash" value="Oxygen Wash" />,
                    <Picker.Item
                      label="Detoxifying Scrub Mask"
                      value="Detoxifying Scrub Mask"
                    />,
                    <Picker.Item
                      label="AlphaRet Peel Pads"
                      value="AlphaRet Peel Pads"
                    />,
                    <Picker.Item
                      label="Alto Defense Serum 1oz"
                      value="Alto Defense Serum 1oz"
                    />,
                    <Picker.Item
                      label="Alto Defense Serum 1.7oz"
                      value="Alto Defense Serum 1.7oz"
                    />,
                    <Picker.Item
                      label="Alto Advanced Defense & Repair Serum"
                      value="Alto Advanced Defense & Repair Serum"
                    />,
                    <Picker.Item
                      label="Solo Hydrating Defense 1oz"
                      value="Solo Hydrating Defense 1oz"
                    />,
                    <Picker.Item
                      label="Intensive Lines .5oz"
                      value="Intensive Lines .5oz"
                    />,
                    <Picker.Item
                      label="Intensive Lines 1oz"
                      value="Intensive Lines 1oz"
                    />,
                    <Picker.Item
                      label="EyeMax AlphaRet"
                      value="EyeMax AlphaRet"
                    />,
                    <Picker.Item
                      label="Interfuse Eye Cream"
                      value="Interfuse Eye Cream"
                    />,
                    <Picker.Item
                      label="Instant Eye Gel"
                      value="Instant Eye Gel"
                    />,
                    <Picker.Item
                      label="Interfuse Face & Neck 1oz"
                      value="Interfuse Face & Neck 1oz"
                    />,
                    <Picker.Item
                      label="Interfuse Face & Neck 1.7oz"
                      value="Interfuse Face & Neck 1.7oz"
                    />,
                    <Picker.Item
                      label="Techno Neck Perfecting Cream"
                      value="Techno Neck Perfecting Cream"
                    />,
                    <Picker.Item label="Even" value="Even" />,
                    <Picker.Item
                      label="Hydration Boosting Cream"
                      value="Hydration Boosting Cream"
                    />,
                    <Picker.Item
                      label="Trio Rebalancing Moisturizer"
                      value="Trio Rebalancing Moisturizer"
                    />,
                    <Picker.Item label="AlphaRet 1oz" value="AlphaRet 1oz" />,
                    <Picker.Item
                      label="AlphaRet Clearing Serum .5oz"
                      value="AlphaRet Clearing Serum .5oz"
                    />,
                    <Picker.Item label="A-Team Duo" value="A-Team Duo" />,
                    <Picker.Item
                      label="TONE SMART Lotion SPF 75"
                      value="TONE SMART Lotion SPF 75"
                    />,
                    <Picker.Item
                      label="TONE SMART Compact SPF 68"
                      value="TONE SMART Compact SPF 68"
                    />,
                    <Picker.Item
                      label="SHEER Lotion SPF 70"
                      value="SHEER Lotion SPF 70"
                    />,
                    <Picker.Item
                      label="SHEER Stick SPF 56"
                      value="SHEER Stick SPF 56"
                    />,
                    <Picker.Item
                      label="SHEER Compact SPF 56"
                      value="SHEER Compact SPF 56"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={11}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"PCA"}
                  pickerItems={[
                    <Picker.Item
                      label="BPO 5% Cleanser"
                      value="BPO 5% Cleanser"
                    />,
                    <Picker.Item
                      label="Creamy Cleanser"
                      value="Creamy Cleanser"
                    />,
                    <Picker.Item
                      label="Daily Cleansing Oil"
                      value="Daily Cleansing Oil"
                    />,
                    <Picker.Item
                      label="Daily Exfoliant"
                      value="Daily Exfoliant"
                    />,
                    <Picker.Item label="Facial Wash" value="Facial Wash" />,
                    <Picker.Item
                      label="Facial Wash Oily/Problem"
                      value="Facial Wash Oily/Problem"
                    />,
                    <Picker.Item
                      label="Makeup Removing Wipes"
                      value="Makeup Removing Wipes"
                    />,
                    <Picker.Item
                      label="Blemish Control Bar"
                      value="Blemish Control Bar"
                    />,
                    <Picker.Item
                      label="Dry Skin Relief Bar"
                      value="Dry Skin Relief Bar"
                    />,
                    <Picker.Item label="Pigment Bar" value="Pigment Bar" />,
                    <Picker.Item
                      label="Daily Cleansing Bar"
                      value="Daily Cleansing Bar"
                    />,
                    <Picker.Item
                      label="Hydrating Toner"
                      value="Hydrating Toner"
                    />,
                    <Picker.Item
                      label="Nutrient Toner"
                      value="Nutrient Toner"
                    />,
                    <Picker.Item
                      label="Smoothing Toner"
                      value="Smoothing Toner"
                    />,
                    <Picker.Item
                      label="Detoxifying Mask"
                      value="Detoxifying Mask"
                    />,
                    <Picker.Item
                      label="Hyaluronic Acid Overnight Mask"
                      value="Hyaluronic Acid Overnight Mask"
                    />,
                    <Picker.Item
                      label="Hydrating Mask"
                      value="Hydrating Mask"
                    />,
                    <Picker.Item
                      label="Pore Refining Treatment"
                      value="Pore Refining Treatment"
                    />,
                    <Picker.Item
                      label="Purifying Mask"
                      value="Purifying Mask"
                    />,
                    <Picker.Item
                      label="Daily Defense Mist"
                      value="Daily Defense Mist"
                    />,
                    <Picker.Item
                      label="Dual Action Redness Relief"
                      value="Dual Action Redness Relief"
                    />,
                    <Picker.Item
                      label="ExLinea Peptide Smoothing Serum"
                      value="ExLinea Peptide Smoothing Serum"
                    />,
                    <Picker.Item
                      label="Hyaluronic Acid Lip Booster"
                      value="Hyaluronic Acid Lip Booster"
                    />,
                    <Picker.Item
                      label="Hydrating Serum"
                      value="Hydrating Serum"
                    />,
                    <Picker.Item
                      label="Ideal Complex Restorative Eye Cream I year"
                      value="Ideal Complex Restorative Eye Cream I year"
                    />,
                    <Picker.Item
                      label="Ideal Complex® Revitalizing Eye Gel 4-5 months"
                      value="Ideal Complex® Revitalizing Eye Gel 4-5 months"
                    />,
                    <Picker.Item
                      label="Intensive Age Refining Treatment"
                      value="Intensive Age Refining Treatment"
                    />,
                    <Picker.Item
                      label="Intensive Brightening Treatment"
                      value="Intensive Brightening Treatment"
                    />,
                    <Picker.Item
                      label="Intensive Clarity Treatment"
                      value="Intensive Clarity Treatment"
                    />,
                    <Picker.Item
                      label="Peptide Lip Therapy"
                      value="Peptide Lip Therapy"
                    />,
                    <Picker.Item
                      label="Perfecting Neck & Decollete"
                      value="Perfecting Neck & Decollete"
                    />,
                    <Picker.Item
                      label="Pigment Gel HQ Free"
                      value="Pigment Gel HQ Free"
                    />,
                    <Picker.Item
                      label="Pore Minimizer Skin Mattifying Gel"
                      value="Pore Minimizer Skin Mattifying Gel"
                    />,
                    <Picker.Item
                      label="Rejuvenating Serum"
                      value="Rejuvenating Serum"
                    />,
                    <Picker.Item
                      label="Resveratrol Restorative Complex"
                      value="Resveratrol Restorative Complex"
                    />,
                    <Picker.Item
                      label="Retinol Renewal with RestorAtive Complex"
                      value="Retinol Renewal with RestorAtive Complex"
                    />,
                    <Picker.Item
                      label="Retinol Treatment for Sensitive Skin"
                      value="Retinol Treatment for Sensitive Skin"
                    />,
                    <Picker.Item
                      label="Total Strength Serum"
                      value="Total Strength Serum"
                    />,
                    <Picker.Item
                      label="Vitamin b3 Brightening Serum"
                      value="Vitamin b3 Brightening Serum"
                    />,
                    <Picker.Item
                      label="Active Broad Spectrum SPF 45"
                      value="Active Broad Spectrum SPF 45"
                    />,
                    <Picker.Item
                      label="Active Protection Body Broad Spectrum SPF 30"
                      value="Active Protection Body Broad Spectrum SPF 30"
                    />,
                    <Picker.Item
                      label="Daily Defense SPF 50"
                      value="Daily Defense SPF 50"
                    />,
                    <Picker.Item
                      label="Hydrator Plus Broad Spectrum SPF 30"
                      value="Hydrator Plus Broad Spectrum SPF 30"
                    />,
                    <Picker.Item
                      label="Sheer Tint Broad Spectrum SPF 45"
                      value="Sheer Tint Broad Spectrum SPF 45"
                    />,
                    <Picker.Item
                      label="Sheer Tint Eye Broad Spectrum SPF 30"
                      value="Sheer Tint Eye Broad Spectrum SPF 30"
                    />,
                    <Picker.Item
                      label="Weightless Protection Broad Spectrum SPF 45"
                      value="Weightless Protection Broad Spectrum SPF 45"
                    />,
                    <Picker.Item
                      label="Apres Peel Hydrating Balm"
                      value="Apres Peel Hydrating Balm"
                    />,
                    <Picker.Item label="Clearskin" value="Clearskin" />,
                    <Picker.Item
                      label="Collagen Hydrator"
                      value="Collagen Hydrator"
                    />,
                    <Picker.Item label="HydraLuxe" value="HydraLuxe" />,
                    <Picker.Item label="ReBalance" value="ReBalance" />,
                    <Picker.Item label="Silkcoat Balm" value="Silkcoat Balm" />,
                    <Picker.Item
                      label="Skin Procedure Oinment"
                      value="Skin Procedure Oinment"
                    />,
                    <Picker.Item label="Body Therapy" value="Body Therapy" />,
                    <Picker.Item
                      label="Daily care|Kits"
                      value="Daily care|Kits"
                    />,
                    <Picker.Item
                      label="Micro Peel At Home Kit"
                      value="Micro Peel At Home Kit"
                    />,
                    <Picker.Item
                      label="The Post-Procedure Solution"
                      value="The Post-Procedure Solution"
                    />,
                    <Picker.Item
                      label="The Skin Recovery Kit"
                      value="The Skin Recovery Kit"
                    />,

                    <Picker.Item
                      label="The Skin Protection Kit"
                      value="The Skin Protection Kit"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={12}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <MISListItem
                  titleOfList={"Phlebotomy"}
                  pickerItems={[
                    <Picker.Item label="Lab Draw" value="Lab Draw" />,
                    <Picker.Item
                      label="Therapeutic Phlebotomy"
                      value="Therapeutic Phlebotomy"
                    />,
                    <Picker.Item
                      label="Other Phlebotomy"
                      value="Other Phlebotomy"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={13}
                  listOfProductsToRemoveFromInventory={
                    listOfProductsToRemoveFromInventory
                  }
                />
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Discount
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={discount}
                  onValueChange={(itemValue, itemIndex) =>
                    setDiscount(itemValue)
                  }
                >
                  <Picker.Item label="0%" value={0} />
                  <Picker.Item label="5%" value={5} />
                  <Picker.Item label="10%" value={10} />
                  <Picker.Item label="15%" value={15} />
                  <Picker.Item label="20%" value={20} />
                  <Picker.Item label="25%" value={25} />
                  <Picker.Item label="30%" value={30} />
                  <Picker.Item label="35%" value={35} />
                  <Picker.Item label="40%" value={40} />
                  <Picker.Item label="45%" value={45} />
                  <Picker.Item label="50%" value={50} />
                  <Picker.Item label="55%" value={55} />
                  <Picker.Item label="60%" value={60} />
                  <Picker.Item label="65%" value={65} />
                  <Picker.Item label="70%" value={70} />
                  <Picker.Item label="75%" value={75} />
                  <Picker.Item label="80%" value={80} />
                  <Picker.Item label="85%" value={85} />
                  <Picker.Item label="90%" value={90} />
                  <Picker.Item label="95%" value={95} />
                  <Picker.Item label="100%" value={100} />
                </Picker>
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Total Before Discount {totalBeforeDiscount}
                </Text>
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Total {total}
                </Text>
                <MainButton
                  text={"Add MIS"}
                  onPress={() => {
                    //add mis to db
                    if (firstName == null && lastName == null) {
                      alert("Please select a patient");
                    } else if (totalList.length == 0) {
                      alert("Please select a service");
                    } else if (
                      visitNumber != null &&
                      timePatientWasSeen != null
                    ) {
                      addMIS({
                        typeOfIvBag: ivBagList,
                        providerRefural: providerRefural,
                        typeOfInjections: injectionsList,
                        firstName: firstName,
                        lastName: lastName,
                        DOB: dob,
                        email: email,
                        typeofReferral: typeOfRefural,
                        typeOfAppointment: typeOfAppoinment,
                        typeOfaddons: addOnsList,
                        ulitmaList: ulitmaList,
                        discount: discount,
                        paymentMethod: paymentMethod,
                        visitId: visitNumber,
                        typeOfboosters: boosterList,
                        typeOfPatient: typeOfPatient,
                        total: total,
                        stykuList: stykuList,
                        phlebotomyList: PhlebotomyList,
                        totalBeforeDiscount: totalBeforeDiscount,
                        timePatientWasSeen: timePatientWasSeen,
                        listOfProductsToRemoveFromInventory:
                          listOfProductsToRemoveFromInventory,
                        year: year,
                        month: month,
                        day: day,
                        hour: hour,
                      })
                        .then(() => {
                          try {
                            listOfProductsToRemoveFromInventory.forEach(
                              (item) => {
                                allProducts.forEach((product) => {
                                  if (product.barcode == item.barcode) {
                                    console.log("itemhhhhhhhhhhhhhhh" + item);
                                    //TODO:make it loop through products to rab descriptions and stuff
                                    UseExistingItemOnDb({
                                      barcode: product.barcode,
                                      itemName: product.product,
                                      quantity: product.quantity,
                                      description: product.description,
                                      selectedCompany: "Vitalize Nation",
                                      location: product.itemLocation,
                                      data: item.barcode,
                                      year: year.toString(),
                                      month: month.toString(),
                                      day: day.toString(),
                                      hours: hour.toString(),
                                      type: "org.iso.Code128",
                                      ItemType: "products",
                                      patientThatUsedItem: email,
                                    });
                                  }
                                });
                              }
                            );
                          } catch (error) {
                            console.log(`alert ${error}}`);
                          }
                        })
                        .then(() => {
                          setIvBagList([]);
                          setProviderRefural(null);
                          setInjectionsList([]);
                          setTotalList([]);
                          setTypeOfRefural(null);
                          setTypeOfAppoinment(null);
                          setAddOnsList([]);
                          setUlitmaList([]);
                          setDiscount(0);
                          setPaymentMethod(null);
                          setVisitNumber(null);
                          setBoosterList([]);
                          setTypeOfPatient(null);
                          setTotal(0);
                          setStykuList([]);
                          setPhlebotomyList([]);
                          setTotalBeforeDiscount(0);
                          setTimePatientWasSeen("9:00AM");

                          dispatch(setPatientDOB(null));
                          dispatch(setPatientFirstName(""));
                          dispatch(setPatientLastName(""));
                          setRefresh(!refresh);
                          setListOfProductsToRemoveFromInventory([]);
                          alert("MIS Added");
                        });
                    }
                  }}
                  buttonWidth={Dimensions.get("screen").width / 1.2}
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MISscreen;

const styles = StyleSheet.create({});

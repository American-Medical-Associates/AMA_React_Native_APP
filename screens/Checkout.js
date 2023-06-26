import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MainButton from "../components/MainButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  searchPatientByGiftCardNumber,
  useAmountGiftCard,
  searchGiftCardByNumber,
  addGiftCardToGiftCardNumber,
  addGiftCardToPatient,
} from "../firebase";
import { useSelector } from "react-redux";
import {
  selectCompany,
  selectPatientFirstName,
  selectPatientLastName,
  selectPatientEmail,
  selectPatientDOB,
  selectPatientPhoneNumber,
} from "../slices/globalSlice";
import InputBox from "../components/InputBox";
import Picker from "../components/Picker";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import PatientSearch from "../components/PatientSearch";
import BigSquareButton from "../components/BigSquareButton";
import { useNavigation } from "@react-navigation/native";

//import hero icons

const Checkout = () => {
  const [scanGiftCard, setScanGiftCard] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [patient, setPatient] = useState(null);
  const [useGiftCard, setUseGiftCard] = useState(false);
  const [amountUsedOnGiftCard, setAmountUsedOnGiftCard] = useState("");
  const [addGiftCard, setAddGiftCard] = useState(false);
  const [giftCardInfo, setGiftCardInfo] = useState(null);
  const company = useSelector(selectCompany);
  const [totalOnGiftCard, setTotalOnGiftCard] = useState(0);
  const [addGiftCardTotal, setAddGiftCardTotal] = useState(false);
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const patientFirstName = useSelector(selectPatientFirstName);
  const patientLastName = useSelector(selectPatientLastName);
  const patientEmail = useSelector(selectPatientEmail);
  const patientDOB = useSelector(selectPatientDOB);
  const patientPhoneNumber = useSelector(selectPatientPhoneNumber);
  const [searchedGiftCarNumber, setSearchedGiftCarNumber] = useState(null);
  const [searchedGiftCardOriginalValue, setSearchedGiftCardOriginalValue] =
    useState(null);
  const [searchedGiftCardCurrentBalance, setSearchedGiftCardCurrentBalance] =
    useState(null);
  const [
    searchedGiftCardDateWasPurchased,
    setSearchedGiftCardDateWasPurchased,
  ] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (showPatientSearch) {
      setShowPatientSearch(false);
      addGiftCardToPatient({
        giftCardNumber: searchedGiftCarNumber,
        company: company,
        email: patientEmail,
        firstName: patientFirstName,
        lastName: patientLastName,
        phoneNumber: patientPhoneNumber,
        DOB: patientDOB,
        totalOnGiftCard: searchedGiftCardOriginalValue,
        currentAmountOnGiftCard: searchedGiftCardCurrentBalance,
        dateGiftCardWasAdded: searchedGiftCardDateWasPurchased,
      });
    }
  }, [patientEmail]);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      if (company !== null) {
        setScanGiftCard(false);
        // searchPatientByGiftCardNumber({
        //   giftCardNumber: data,
        //   company: company,
        //   patientArray: setPatient,
        // }).then(() => {
        if (
          patient == null ||
          patient == undefined ||
          patient == [] ||
          patient.length == 0
        ) {
          searchGiftCardByNumber({
            giftCardNumber: data,
            company: company,
            giftCardArray: setGiftCardInfo,
          });
        }
        // });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setRefresh(!refresh);
      } else {
        alert("no company");
      }
    } catch (e) {
      alert(e);
    }
  };
  const handleBarCodeScannedAddNew = async ({ type, data }) => {
    try {
      if (company !== null) {
        setScanned(true);
        setAddGiftCard(false);
        setAddGiftCardTotal(false);
        setTotalOnGiftCard(0);

        addGiftCardToGiftCardNumber({
          giftCardNumber: data,
          company: company,
          totalOnGiftCard: totalOnGiftCard,
          currentAmountOnGiftCard: totalOnGiftCard,
        }).then(() => {
          setScanned(false);
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setRefresh(!refresh);
      } else {
        alert("no company");
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
    >
      <FlatList
        data={[true]}
        bounces={false}
        style={{
          width: "100%",
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <View
                style={{
                  padding: 10,
                  margin: 30,

                  alignItems: "center",
                  flex: 1,
                  borderRadius: 30,
                  width: Dimensions.get("window").width / 1.3,
                  backgroundColor: "#E2E2E2C2",
                }}
              >
                <MainButton
                  text={scanGiftCard ? "Cancel" : "Scan Gift Card"}
                  onPress={() => {
                    setScanGiftCard(true);
                    if (scanGiftCard) {
                      setScanGiftCard(false);
                    }
                  }}
                />

                {scanGiftCard && (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 20,
                      height: 80,
                      width: Dimensions.get("screen").width / 1.5,
                    }}
                  >
                    <BarCodeScanner
                      onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                      }
                      style={StyleSheet.absoluteFillObject}
                    />
                  </View>
                )}
              </View>
              {showPatientSearch && <PatientSearch globalRefresh={refresh} />}
              <View
                style={{
                  backgroundColor: "#E2E2E2C2",
                  alignSelf: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  width: Dimensions.get("window").width / 1.5,
                  borderRadius: 30,
                  marginTop: 20,
                  marginBottom: 50,
                }}
              >
                {/* {patient !== null && patient !== undefined && (
                  <FlatList
                    data={patient}
                    bounces={false}
                    style={{ width: "90%" }}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            marginVertical: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            First Name:
                          </Text>
                          <Text style={{ fontSize: 20 }}>{item.firstName}</Text>
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            Last Name:
                          </Text>
                          <Text style={{ fontSize: 20 }}>{item.lastName}</Text>
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            DOB:
                          </Text>
                          <Text style={{ fontSize: 20 }}>{item.DOB}</Text>
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            Gift Card Number:
                          </Text>
                          <Text style={{ fontSize: 20 }}>
                            {item.giftCardNumber}
                          </Text>
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            Original Value:
                          </Text>
                          <Text style={{ fontSize: 20 }}>
                            {item.totalOnGiftCard}
                          </Text>
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            Current Balance:
                          </Text>

                          <Text style={{ fontSize: 20 }}>
                            {item.currentAmountOnGiftCard}
                          </Text>
                          <Text
                            style={{
                              marginVertical: 10,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#1F52ED",
                            }}
                          >
                            Date Was Purchased
                          </Text>
                          {item.dateGiftCardWasAdded != null && (
                            <Text style={{ fontSize: 20 }}>
                              {item.dateGiftCardWasAdded
                                .toDate()
                                .toDateString()}
                            </Text>
                          )}
                          <MainButton
                            text={!useGiftCard ? "Use Gift Card" : "Cancel"}
                            onPress={() => {
                              setUseGiftCard(!useGiftCard);
                              console.log(useGiftCard);
                            }}
                          />

                          {useGiftCard && (
                            <View>
                              <InputBox
                                placeholder={"Amount to Used"}
                                onChangeText={(text) => {
                                  setAmountUsedOnGiftCard(text);
                                }}
                                value={amountUsedOnGiftCard}
                                width={Dimensions.get("screen").width / 1.8}
                                color={"#0008ff"}
                                keyboardType={"numeric"}
                              />
                              <MainButton
                                text={"Submit"}
                                onPress={() => {
                                  setUseGiftCard(false);
                                  //subtract amountToUse from gift card

                                  useAmountGiftCard({
                                    email: item.email,
                                    amountToUse:
                                      item.currentAmountOnGiftCard -
                                      amountUsedOnGiftCard,

                                    company: company,
                                    giftCardNumber: item.giftCardNumber,
                                  });
                                }}
                              />
                            </View>
                          )}
                          <MainButton
                            text={"Clear Search"}
                            onPress={() => {
                              setPatient(null);
                              setGiftCardInfo(null);
                            }}
                          />
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index}
                    listKey={1}
                  />
                )} */}

                {giftCardInfo && (
                  <View>
                    <FlatList
                      data={giftCardInfo}
                      bounces={false}
                      style={{ width: "90%" }}
                      renderItem={({ item, index }) => {
                        return (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              marginVertical: 10,
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                width: "100%",
                              }}
                            >
                              {/* TODO:add patient search to look up patient the assign gift car to them. */}
                              <TouchableOpacity
                                style={{
                                  backgroundColor: showPatientSearch
                                    ? "#0CEA0CA6"
                                    : null,
                                  borderRadius: 999,
                                  padding: 11,
                                }}
                                onPress={() => {
                                  setShowPatientSearch(!showPatientSearch);
                                  setSearchedGiftCarNumber(item.giftCardNumber);
                                  setSearchedGiftCardCurrentBalance(
                                    item.currentAmountOnGiftCard
                                  );
                                  setSearchedGiftCardDateWasPurchased(
                                    item.dateGiftCardWasAdded
                                  );
                                  setSearchedGiftCardOriginalValue(
                                    item.totalOnGiftCard
                                  );
                                }}
                              >
                                <Ionicons
                                  name="person-add-outline"
                                  size={28}
                                  color={
                                    showPatientSearch ? "#E9E9E9" : "#025FC3"
                                  }
                                  // style={{ marginRight: 10 }}
                                />
                              </TouchableOpacity>
                            </View>

                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              First Name:
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                              {item.firstName}
                            </Text>
                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              Last Name:
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                              {item.lastName}
                            </Text>
                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              DOB:
                            </Text>
                            <Text style={{ fontSize: 20 }}>{item.DOB}</Text>
                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              Gift Card Number:
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                              {item.giftCardNumber}
                            </Text>
                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              Original Value:
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                              {item.totalOnGiftCard}
                            </Text>
                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              Current Balance:
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                              {item.currentAmountOnGiftCard}
                            </Text>
                            <Text
                              style={{
                                marginVertical: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#1F52ED",
                              }}
                            >
                              Date Was Purchased
                            </Text>
                            {item.dateGiftCardWasAdded != null && (
                              <Text style={{ fontSize: 20 }}>
                                {item.dateGiftCardWasAdded
                                  .toDate()
                                  .toDateString()}
                              </Text>
                            )}
                            <MainButton
                              text={!useGiftCard ? "Use Gift Card" : "Cancel"}
                              onPress={() => {
                                setUseGiftCard(!useGiftCard);
                                console.log(useGiftCard);
                              }}
                            />
                            {useGiftCard && (
                              <View>
                                <InputBox
                                  placeholder={"Amount to Used"}
                                  onChangeText={(text) => {
                                    setAmountUsedOnGiftCard(text);
                                  }}
                                  value={amountUsedOnGiftCard}
                                  width={Dimensions.get("screen").width / 1.8}
                                  color={"#0008ff"}
                                  keyboardType={"numeric"}
                                />
                                <MainButton
                                  text={"Submit"}
                                  onPress={() => {
                                    setUseGiftCard(false);
                                    //subtract amountToUse from gift card

                                    useAmountGiftCard({
                                      email: item.email,
                                      amountToUse:
                                        item.currentAmountOnGiftCard -
                                        amountUsedOnGiftCard,

                                      company: company,
                                      giftCardNumber: item.giftCardNumber,
                                    });
                                  }}
                                />
                              </View>
                            )}
                            <MainButton
                              text={"Clear Search"}
                              onPress={() => {
                                setPatient(null);
                                setGiftCardInfo(null);
                              }}
                              buttonColor={"#ff0000"}
                            />
                          </View>
                        );
                      }}
                      keyExtractor={(item, index) => index}
                      listKey={2}
                    />
                  </View>
                )}

                {!giftCardInfo && (
                  <View
                    style={{
                      margin: 10,
                      //flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MainButton
                      text={!addGiftCard ? "Add GiftCard" : "Cancel"}
                      onPress={() => {
                        setAddGiftCard(!addGiftCard);
                        if (addGiftCard) {
                          setAddGiftCard(!addGiftCard);

                          setAddGiftCardTotal(false);
                          setTotalOnGiftCard(0);
                        }
                      }}
                    />

                    {addGiftCard && (
                      <View
                        style={{
                          height: 100,
                          width: Dimensions.get("screen").width / 1.5,
                          alignItems: "center",
                          flex: 1,
                          flexDirection: "column",
                          marginBottom: 120,
                        }}
                      >
                        {addGiftCard && !addGiftCardTotal && (
                          <View style={{ marginVertical: 50 }}>
                            <InputBox
                              placeholder={"Total on Gift Card"}
                              width={Dimensions.get("screen").width / 1.8}
                              color={"#0008ff"}
                              onChangeText={(text) => {
                                setTotalOnGiftCard(text);
                              }}
                              keyboardType={"numeric"}
                            />
                            <MainButton
                              text={"Add Total"}
                              onPress={() => {
                                setAddGiftCardTotal(true);
                              }}
                            />
                          </View>
                        )}
                        {addGiftCard &&
                          totalOnGiftCard != 0 &&
                          addGiftCardTotal &&
                          !scanned && (
                            <View
                              style={{
                                marginVertical: 50,

                                flex: 1,
                                width: Dimensions.get("screen").width / 1.5,
                              }}
                            >
                              <BarCodeScanner
                                onBarCodeScanned={
                                  scanned
                                    ? undefined
                                    : handleBarCodeScannedAddNew
                                }
                                style={StyleSheet.absoluteFillObject}
                              />
                            </View>
                          )}
                      </View>
                    )}

                    {giftCardInfo != null &&
                      addGiftCard &&
                      !giftCardInfo.giftCardNumber && (
                        <View style={{ marginVertical: 20 }}>
                          <MainButton
                            text={"Cancel"}
                            onPress={() => {
                              setAddGiftCard(false);
                              setAddGiftCardTotal(false);
                              setTotalOnGiftCard(0);
                            }}
                          />
                        </View>
                      )}
                    {addGiftCardTotal && (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "800",
                          color: "#30303091",
                        }}
                      >
                        Total:{totalOnGiftCard}
                      </Text>
                    )}
                  </View>
                )}
              </View>
              {!giftCardInfo && (
                <BigSquareButton
                  onPress={() => {
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success
                    );
                    navigation.navigate("Gift Cards");
                  }}
                  buttonText={"See All GiftCards"}
                />
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </KeyboardAvoidingView>
  );
};
export default Checkout;

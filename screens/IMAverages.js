import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useScrollToTop } from "@react-navigation/native";

function IMAverages() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "companys/AMA/InternalMedicineMIS"));

        const querySnapshot = await getDocs(q);
        let fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });

        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <ScrollView ref={ref} contentContainerStyle={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={[styles.text, styles.centeredText]}>
            {item.provider}
          </Text>
          <Text style={[styles.text, styles.centeredText, styles.currentDate]}>
            {item.currentDate}
          </Text>
          {/* Add more fields as needed with appropriate styles */}
          <Text style={styles.text}>Location: {item.location}</Text>
          <Text style={styles.text}>
            Number of Patients: {item.NumOfPatients}
          </Text>
          <Text style={styles.text}>
            Number of New Patients: {item.NumOfNewPatients}
          </Text>
          <Text style={styles.text}>
            Number of TeleVisits: {item.NumOfTeleVisits}
          </Text>
          <Text style={styles.text}>
            Hours Scheduled: {item.HoursScheduled}
          </Text>
          <Text style={styles.text}>Referred by: {item.RefferedBy}</Text>
          <Text style={styles.text}>
            Number of Trigger or Joint Injections:{" "}
            {item.NumOfTriggerOrJointInjections}
          </Text>
          <Text style={styles.text}>
            Number of New Sign Ups: {item.NumOfNewSignUp}
          </Text>
          <Text style={styles.text}>
            Number of Patients Contacted: {item.NumOfPatientsContacted}
          </Text>
          <Text style={styles.text}>
            Dollars Collected: {item.DollarsCollected}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: "90%", // or fixed width
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    textAlign: "center",
  },
  currentDate: {
    marginBottom: 20,
  },
});

export default IMAverages;

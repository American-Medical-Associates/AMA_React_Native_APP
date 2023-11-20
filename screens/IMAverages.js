import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import DividerLine from "../components/DividerLine";

function IMAverages() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ items: [], averages: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "companys/AMA/InternalMedicineMIS"));

        const querySnapshot = await getDocs(q);
        let fetchedData = [];
        let sums = {
          NumOfPatients: 0,
          NumOfNewPatients: 0,
          NumOfTeleVisits: 0,
          HoursScheduled: 0,
          NumOfTriggerOrJointInjections: 0,
          NumOfNewSignUp: 0,
          NumOfPatientsContacted: 0,
          NoShows: 0,
          EKG: 0,
          SkinTagRemovals: 0,
          NoShowFDCollections: 0,
          Paps: 0,
          AnnualPhysicals: 0,
          PsychiatricServices: 0,
          Counseling: 0,
          ChronicCareManagement: 0,
          WeightLoss: 0,
          IvyInfusions: 0,
          HormoneReplacementTherapy: 0,
          AestheticTreatments: 0,
          LevelCoding: 0,
          CcmNumberOfPatientsContacted: 0,
          DollarsCollected: 0,
        };

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedData.push({ id: doc.id, ...data });

          sums.NumOfPatients += data.NumOfPatients || 0;
          sums.NumOfNewPatients += data.NumOfNewPatients || 0;
          sums.NumOfTeleVisits += data.NumOfTeleVisits || 0;
          sums.HoursScheduled += data.HoursScheduled || 0;
          sums.NumOfTriggerOrJointInjections += data.NumOfTriggerOrJointInjections || 0;
          sums.NumOfNewSignUp += data.NumOfNewSignUp || 0;
          sums.NumOfPatientsContacted += data.NumOfPatientsContacted || 0;
          sums.NoShows += data.NoShows || 0;
          sums.EKG += data.EKG || 0;
          sums.SkinTagRemovals += data.SkinTagRemovals || 0;
          sums.NoShowFDCollections += data.NoShowFDCollections || 0;
          sums.Paps += data.Paps || 0;
          sums.AnnualPhysicals += data.AnnualPhysicals || 0;
          sums.PsychiatricServices += data.PsychiatricServices || 0;
          sums.Counseling += data.Counseling || 0;
          sums.ChronicCareManagement += data.ChronicCareManagement || 0;
          sums.WeightLoss += data.WeightLoss || 0;
          sums.IvyInfusions += data.IvyInfusions || 0;
          sums.HormoneReplacementTherapy += data.HormoneReplacementTherapy || 0;
          sums.AestheticTreatments += data.AestheticTreatments || 0;
          sums.LevelCoding += data.LevelCoding || 0;
          sums.CcmNumberOfPatientsContacted += data.CcmNumberOfPatientsContacted || 0;
          sums.DollarsCollected += data.DollarsCollected || 0;
        });

        let averages = {};
        const itemCount = fetchedData.length;
        for (let key in sums) {
          averages[key] = sums[key] / itemCount;
        }

        setData({ items: fetchedData, averages: averages });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderHeader = () => (
    <View>
      <Text style={styles.headerText}>Previous Month's Averages</Text>
      <Text>Number of Patients: {data.averages.NumOfPatients?.toFixed(2)}</Text>
      <Text>Number of New Patients: {data.averages.NumOfNewPatients?.toFixed(2)}</Text>
      <Text>Number of TeleVisits: {data.averages.NumOfTeleVisits?.toFixed(2)}</Text>
      <Text>Hours Scheduled: {data.averages.HoursScheduled?.toFixed(2)}</Text>
      <Text>Number of Trigger or Joint Injections: {data.averages.NumOfTriggerOrJointInjections?.toFixed(2)}</Text>
      <Text>Number of New Sign Ups: {data.averages.NumOfNewSignUp?.toFixed(2)}</Text>
      <Text>Number of Patients Contacted: {data.averages.NumOfPatientsContacted?.toFixed(2)}</Text>
      <Text>No Shows: {data.averages.NoShows?.toFixed(2)}</Text>
      <Text>EKG: {data.averages.EKG?.toFixed(2)}</Text>
      <Text>SkinTagRemovals: {data.averages.SkinTagRemovals?.toFixed(2)}</Text>
      <Text>No Show Front Desk Collections: {data.averages.NoShowFDCollections?.toFixed(2)}</Text>
      <Text>Paps: {data.averages.Paps?.toFixed(2)}</Text>
      <Text>Annual Physicals: {data.averages.AnnualPhysicals?.toFixed(2)}</Text>
      <Text>Psychiatric Services: {data.averages.PsychiatricServices?.toFixed(2)}</Text>
      <Text>Counseling: {data.averages.Counseling?.toFixed(2)}</Text>
      <Text>Chronic Care Management: {data.averages.ChronicCareManagement?.toFixed(2)}</Text>
      <Text>Weight Loss: {data.averages.WeightLoss?.toFixed(2)}</Text>
      <Text>Ivy Infusions: {data.averages.IvyInfusions?.toFixed(2)}</Text>
      <Text>Hormone Replacement Therapies: {data.averages.HormoneReplacementTherapy?.toFixed(2)}</Text>
      <Text>Aesthetic Treatments: {data.averages.AestheticTreatments?.toFixed(2)}</Text>
      <Text>Level Coding: {data.averages.LevelCoding?.toFixed(2)}</Text>
      <Text>Number of CCM Patients Contacted: {data.averages.CcmNumberOfPatientsContacted?.toFixed(2)}</Text>
      <Text>Dollars Collected: {data.averages.DollarsCollected?.toFixed(2)}</Text>
      <DividerLine />
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[styles.text, styles.centeredText]}>{item.provider}</Text>
      <Text style={[styles.text, styles.centeredText, styles.currentDate]}>
        {item.currentDate}
      </Text>
      <Text style={styles.text}>Location: {item.location}</Text>
      <Text style={styles.text}>Number of Patients: {item.NumOfPatients}</Text>
      <Text style={styles.text}>
        Number of New Patients: {item.NumOfNewPatients}
      </Text>
      <Text style={styles.text}>
        Number of TeleVisits: {item.NumOfTeleVisits}
      </Text>
      <Text style={styles.text}>Hours Scheduled: {item.HoursScheduled}</Text>
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
      <Text style={styles.text}>No Shows: {item.NoShows}</Text>
      <Text style={styles.text}>EKG: {item.EKG}</Text>
      <Text style={styles.text}>SkinTagRemovals: {item.SkinTagRemovals}</Text>
      <Text style={styles.text}>
        No Show Front Desk Collections: {item.NoShowFDCollections}
      </Text>
      <Text style={styles.text}>Paps: {item.Paps}</Text>
      <Text style={styles.text}>Annual Physicals: {item.AnnualPhysicals}</Text>
      <Text style={styles.text}>
        Psychiatric Services: {item.PsychiatricServices}
      </Text>
      <Text style={styles.text}>Counseling: {item.Counseling}</Text>
      <Text style={styles.text}>
        Chronic Care Management: {item.ChronicCareManagement}
      </Text>
      <Text style={styles.text}>Weight Loss: {item.WeightLoss}</Text>
      <Text style={styles.text}>Ivy Infusions: {item.IvyInfusions}</Text>
      <Text style={styles.text}>
        Hormone Replacement Therapies: {item.HormoneReplacementTherapy}
      </Text>
      <Text style={styles.text}>
        Aesthetic Treatments: {item.AestheticTreatments}
      </Text>
      <Text style={styles.text}>Level Coding: {item.LevelCoding}</Text>
      <Text style={styles.text}>
        Number of CCM Patients Contacted: {item.CcmNumberOfPatientsContacted}
      </Text>
      <Text style={styles.text}>
        Dollars Collected: {item.DollarsCollected}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <FlatList
      data={data.items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
  />
  );
}

const styles = StyleSheet.create({
  // container: {
  //   padding: 16,
  // },
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
    width: "90%",
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
});

export default IMAverages;

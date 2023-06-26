import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import {
  collectionGroup,
  deleteDoc,
  documentId,
  DocumentSnapshot,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {
  db,
  auth,
  addNewTask,
  companyTeamsToDo,
  addTeam,
  checkForEmployees,
} from "../firebase";

import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import DividerLine from "../components/DividerLine";
import MainButton from "../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompany,
  setCompany,
  selectDate,
  setTaskID,
} from "../slices/globalSlice";

import IconButton from "../components/IconButton";
import InputBox from "../components/InputBox";

const ToDo = () => {
  const [todoHight, setTodoHeight] = useState();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const [companyBD, setCompanyDB] = useState(null);
  const [addButton, setAddButton] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [importance, setImportance] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [deleteToDo, setDeleteToDo] = useState(false);
  // const [taskID, setTaskID] = useState(null);
  var currentDate = new Date();

  const [todaysHours, setTodaysHours] = useState(null);

  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const min = currentDate.getMinutes();
  const year = currentDate.getFullYear();
  const monthsDays = day.toString();
  const hoursToString = hours.toString();
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  //   const time = useSelector(selectTime1);
  const fulldate = useSelector(selectDate);
  //   const companyAddress = useSelector(selectCompanyAddress);
  //   const lat = useSelector(selectLat);
  //   const long = useSelector(selectLong);
  //   const workLocationLat = useSelector(selectWorkLat);
  //   const workLocationLong = useSelector(selectWorkLong);
  const [todaysMin, setTodaysMin] = useState(null);
  //   const clockinButtonState = useSelector(selectClockinButtonState);
  const [isActive, setIsActive] = useState(null);
  const [trialActive, setTrialActive] = useState(null);
  //   const userSubscriptionStatus = useSelector(selectUserSubscriptionStatus);
  const dateInMM = Date.now();
  const isMounted = useRef(false);
  const [settings, setSettings] = useState(false);
  const [userTeams, setuserTeams] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState(null);
  const [newTeam, setNewTeam] = useState(null);
  const [teamRecipient, setTeamRecipient] = useState([]);
  const [teamRecipientArray, setTeamRecipientArray] = useState([]);
  //   const companySubscriptionStatus = useSelector(
  //     // selectCompanySubscriptionStatus
  //   );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: " To Do",

      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
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
    companyTeamsToDo({ setTeam: setuserTeams });
    console.log("selectCompany " + userTeams);
  }, []);

  const getCompany = onSnapshot(
    doc(db, "users", auth.currentUser.email),
    (doc) => {
      // setCompanyDB(doc.get("company"));
      dispatch(setCompany(doc.get("company")));
      setCompanyDB(doc.get("company"));
    }
  );
  useEffect(() => {
    isMounted.current = true;
    getCompany();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (company !== null) {
      onSnapshot(
        query(
          collection(db, "tasks"),
          where("company", "==", company),
          orderBy("importance", "desc")
        ),
        (querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((snap) => {
            tasks.push(snap.data());
            // key: snap.id;
          });
          // console.log(tasks);
          setTasks(tasks);
          setLoading(true);
        }
      );
    } else {
      setTasks("null");
    }

    // return () => {
    //   getData();
    // };
  }, [company, refresh]);

  if (importance > 10) {
    Alert.alert(
      "Invalid Importance",
      "Task importance can only be a number 1-10",
      [{ text: "Sounds Good", onPress: () => setImportance(10) }]
    );
  }

  useEffect(() => {
    // const theTime = () => {
    if (hours > 12) {
      const todayHoursOverTwelve = hours - 12;
      const todayHoursOverTwelveString = todayHoursOverTwelve.toString();
      // console.log("OVER 12 " + todayHoursOverTwelveString);
      setTodaysHours(todayHoursOverTwelveString);
      setTodaysHours(todayHoursOverTwelveString);
    } else {
      if (hoursToString == 0) {
        setTodaysHours("12");
      } else {
        setTodaysHours(hoursToString), console.log("hhhhhh", todaysHours);
      }
    }
    if (min < 10) {
      setTodaysMin(0 + "" + min);
    } else {
      setTodaysMin(min);
    }
    // };

    // return () => {
    //   theTime();
    // };
  }, []);
  try {
  } catch (error) {}

  // dispatch(setTime1(todaysHours + ":" + todaysMin));
  // // console.log(time);
  // dispatch(setDate(month + "/" + day));
  // // console.log(fulldate);

  useEffect(() => {
    if (company !== null) {
      try {
        const checkadminUsers = onSnapshot(
          doc(db, "companys", company),

          (doc) => {
            const adminlist = doc.get("adminUsers");
            try {
              adminlist.forEach((item) => {
                try {
                  if (auth.currentUser.email == item) {
                    dispatch(setAdminUsers(true));
                    // console.log(" is admin");
                  }
                } catch (error) {
                  console.long("not admin " + error);
                }
              });
            } catch (e) {
              console.log(e);
            }
            // console.log(adminlist);
          }
        );

        return () => {
          checkadminUsers();
        };
      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  }, [company, refresh]);
  useEffect(() => {
    if (teamRecipient != null && teamRecipient != "") {
      checkForEmployees({
        teamRecipient: teamRecipient,
        teamRecipientArray: setTeamRecipientArray,
      });
      console.log(teamRecipientArray);
    }
  }, [teamRecipient]);

  // add to flow team
  const toDoSettings = () => {
    const listOfTeams = userTeams.map((item) => {
      return <Picker.Item label={item} value={item} />;
    });
    if (settings) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputBox
            color={"#0008ff"}
            width={Dimensions.get("window").width / 2.1}
            placeholder="Add New Team"
            type="text"
            onChangeText={setNewTeam}
            value={newTeam}
          />
          <InputBox
            color={"#0008ff"}
            width={Dimensions.get("window").width / 2.5}
            placeholder="Team Members"
            type="text"
            onChangeText={setTeamRecipient}
            value={teamRecipient}
          />
          {teamRecipient != null && teamRecipient != "" && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 200,
                borderColor: "#A7A7A91A",
              }}
            >
              <FlatList
                style={{ flex: 1 }}
                data={teamRecipientArray}
                renderItem={({ item, circleColor }) => {
                  return (
                    <View
                      style={{
                        backgroundColor: "#807F7F4D",
                        margin: 8,
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                      }}
                    >
                      <TouchableOpacity>
                        <Text style={{ text: "#ffffff" }}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                key={(item, index) => index}
                keyExtractor={(item, index) => index}
                // keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              ></FlatList>
            </View>
          )}

          <MainButton
            text={"Add Team"}
            onPress={() => {
              addTeam({ team: newTeam, teamRecipientArray: null });
            }}
            buttonWidth={200}
          />
          <Text style={{ textAlign: "center", paddingTop: 20, fontSize: 20 }}>
            Select Team
          </Text>
          <Picker
            style={{
              height: 100,
              width: Dimensions.get("screen").width / 2,

              marginBottom: 100,
            }}
            selectedValue={selectedTeams}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTeams(itemValue)
            }
          >
            {listOfTeams}
          </Picker>
        </View>
      );
    }
  };
  const addtodo = () => {
    if (addButton == true) {
      return (
        <View
          style={{
            backgroundColor: "#DBDADADF",
            paddingVertical: 10,
            width: Dimensions.get("screen").width / 1.3,
            borderRadius: 20,
            // marginVertical: 30,
            shadowColor: "#000000EF",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            alignItems: "center",
            // flex: 1,
          }}
        >
          <View
            style={{
              height: 50,
              width: Dimensions.get("screen").width / 1.3,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                width: Dimensions.get("window").width / 2,

                alignItems: "flex-start",
              }}
            ></View>
            <View
              style={{
                flex: 1,
                width: Dimensions.get("window").width / 2,
                marginRight: 70,
                alignItems: "flex-end",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSettings(!settings);
                }}
              >
                <AntDesign name="setting" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {toDoSettings()}
          <InputBox
            color={"#0008ff"}
            width={Dimensions.get("window").width / 1.5}
            placeholder="Title"
            type="name"
            onChangeText={setTitle}
            value={title}
          />
          <InputBox
            color={"#0008ff"}
            width={Dimensions.get("window").width / 1.5}
            placeholder="Task Description"
            type="description"
            onChangeText={setDescription}
            value={description}
          />
          <InputBox
            color={"#0008ff"}
            width={Dimensions.get("window").width / 1.5}
            placeholder="Importance (Ex:1-10)"
            type="importance"
            value={importance}
            onChangeText={setImportance}
          />

          <MainButton
            text={"Add Task"}
            onPress={() => {
              addNewTask({
                description: description,
                title: title,
                importance: importance,
                todaysHours: todaysHours,
                todaysMin: todaysMin,
                fulldate: fulldate,
                company: company,
                team: selectedTeams,
              });
              setDeleteToDo(false);
              setImportance(null);
              setTitle(null);
              setDescription(null);
            }}
            buttonWidth={300}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", alignContent: "center" }}>
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
                if (refresh == 0) {
                  setRefresh(1);
                }
                if (refresh == 1) {
                  setRefresh(0);
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
            <View>
              <Text style={styles.toDo}>To-Do</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <DividerLine
                lineWidth={Dimensions.get("window").width / 2.5}
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
                setDeleteToDo(false);
                if (addButton == false) {
                  setAddButton(true);
                } else {
                  setAddButton(false);
                }
              }}
            >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{ flex: 1, flexDirection: "column", alignContent: "center" }}
        >
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              {addtodo()}
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={tasks}
              renderItem={({ item, circleColor }) => {
                // setImportance2(item.importance);
                const importanceconst = item.importance;
                if (importanceconst == 10) {
                  circleColor = "#FF0000";
                }
                if (importanceconst == 9) {
                  circleColor = "#FF5E00";
                }
                if (importanceconst == 8) {
                  circleColor = "#FF8800";
                }
                if (importanceconst == 7) {
                  circleColor = "#FFA600";
                }
                if (importanceconst == 6) {
                  circleColor = "#FFC400";
                }
                if (importanceconst == 5) {
                  circleColor = "#FFFB00";
                }
                if (importanceconst == 4) {
                  circleColor = "#E5FF00";
                }
                if (importanceconst == 3) {
                  circleColor = "#C3FF00";
                }
                if (importanceconst == 2) {
                  circleColor = "#A6FF00";
                }
                if (importanceconst == 1) {
                  circleColor = "#48FF00";
                }

                const deletetask = () => {
                  if (deleteToDo == true) {
                    return (
                      <View style={{ marginVertical: 20 }}>
                        <TouchableOpacity
                          onLongPress={() => {
                            if (deleteToDo == false) {
                              setDeleteToDo(true);
                            } else {
                              setDeleteToDo(false);
                            }
                          }}
                          onPress={() => {
                            navigation.navigate("ToDo Screen");
                            dispatch(setTaskID(item.taskID));
                          }}
                        >
                          <View style={styles.taskList}>
                            <View style={{ flex: 1 }}>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                  // alignContent: "center",
                                  justifyContent: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    flex: 0.3,
                                    justifyContent: "center",
                                    alignContent: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      justifyContent: "center",
                                      marginTop: 5,
                                    }}
                                  >
                                    {item.lastUpdateDate}
                                    {"\n"}
                                    {item.lastUpdateTime}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 0.3,
                                    // backgroundColor: "blue",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.taskTitle,
                                      windowWidth < 325 &&
                                        styles.taskTitleSmall,
                                    ]}
                                  >
                                    {item.name}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flex: 0.3,
                                    justifyContent: "center",
                                    marginTop: 12,
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <IconButton
                                    buttonWidth={50}
                                    color={"#FF0000"}
                                    icon={
                                      <FontAwesome
                                        name="trash-o"
                                        size={24}
                                        color="black"
                                      />
                                    }
                                    onPress={() => {
                                      // Alert.alert(
                                      //   "Are you sure you would like to delete?",
                                      //   [
                                      //     {
                                      //       text: "cancel",
                                      //       onPress: () =>
                                      //         console.log("Cancel Pressed"),
                                      //     },
                                      //   ]
                                      // );
                                      try {
                                        deleteDoc(
                                          doc(db, "tasks", item.taskID)
                                        );
                                      } catch (error) {
                                        alert("Item not deleted " + error);
                                      }
                                    }}
                                  ></IconButton>
                                  {/* <View
                                    style={{
                                      borderRadius: 80,
                                      backgroundColor: circleColor,
                                      width: 20,
                                      height: 20,
                                    }}
                                  ></View> */}
                                </View>
                              </View>
                            </View>

                            <Text style={styles.taskDescription}>
                              {item.description}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  } else {
                    return (
                      <View style={{ marginVertical: 20 }}>
                        <TouchableOpacity
                          onLongPress={() => {
                            if (deleteToDo == false) {
                              setDeleteToDo(true);
                            } else {
                              setDeleteToDo(false);
                            }
                          }}
                          onPress={() => {
                            navigation.navigate("ToDo Screen");
                            dispatch(setTaskID(item.taskID));
                          }}
                        >
                          <View style={styles.taskList}>
                            <View style={{ flex: 1 }}>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                  // alignContent: "center",
                                  justifyContent: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  style={{
                                    flex: 0.3,
                                    justifyContent: "center",
                                    alignContent: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      justifyContent: "center",
                                      marginTop: 5,
                                    }}
                                  >
                                    {item.lastUpdateDate}
                                    {"\n"}
                                    {item.lastUpdateTime}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 0.3,
                                    // backgroundColor: "blue",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.taskTitle,
                                      windowWidth < 325 &&
                                        styles.taskTitleSmall,
                                    ]}
                                  >
                                    {item.name}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flex: 0.3,

                                    alignItems: "flex-end",
                                  }}
                                >
                                  <View
                                    style={{
                                      borderRadius: 80,
                                      backgroundColor: circleColor,
                                      width: 20,
                                      height: 20,
                                      overflow: "hidden",
                                    }}
                                  ></View>
                                </View>
                              </View>
                            </View>

                            <Text style={styles.taskDescription}>
                              {item.description}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                };

                return <View style={{ flex: 1 }}>{deletetask()}</View>;

                //export default importanceconst
              }}
              key={(item, index) => index}
              keyExtractor={(item, index) => index}
              // keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            ></FlatList>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: "column",
  },

  taskList: {
    // height: 100,
    width: Dimensions.get("screen").width / 1.4,

    backgroundColor: "#F0EFEF",
    borderRadius: 30,
    flex: 1,
    alignSelf: "center",
    marginHorizontal: 15,
    paddingHorizontal: 15,
    shadowColor: "#000000EF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    // elevation: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 3,
    flexWrap: "wrap",
    textAlign: "center",
  },
  taskTitleSmall: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 3,
    flexWrap: "wrap",
    textAlign: "center",
  },
  taskDescription: {
    fontSize: 15,
    margin: 2,
    marginBottom: 5,
    flexWrap: "wrap",
    textAlign: "center",
  },
  postedTime: {
    marginVertical: 3,
    textAlign: "center",
    paddingTop: 10,
  },
  toDo: {
    textAlign: "center",
    fontSize: 20,
  },
  inputTitle: {
    borderRadius: 50,
    height: 60,
    width: Dimensions.get("window").width / 1.5,
    borderColor: "#7DCEF38A",
    borderWidth: 2,
    marginBottom: 15,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#D8D8D84D",
    marginHorizontal: 300,
  },
});

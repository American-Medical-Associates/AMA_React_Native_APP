import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFunctions } from "firebase/functions";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  deleteField,
  getDoc,
  getFirestore,
  where,
  updateDoc,
} from "firebase/firestore";
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
  collection,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCwzGo9wi9_EnYzIGBcxUQyS59uEoNXAU",
  authDomain: "ama-app-a5e7b.firebaseapp.com",
  projectId: "ama-app-a5e7b",
  storageBucket: "ama-app-a5e7b.appspot.com",
  messagingSenderId: "137084495352",
  appId: "1:137084495352:web:f58d8bce30e6dd6d57e20d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Modify the auth initialization to include persistence
const authWithPersistence = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = authWithPersistence;
export const db = getFirestore(app);
export const functions = getFunctions(app);

export async function AddNewItemToDbManualy({
  barcode,
  itemName,
  quantity,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
  incrementQuantity,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        barcode: barcode,
        ItemType: ItemType,
        id: barcode,
        product: itemName,
        quantity: quantity,
        description: description,
        company: selectedCompany,
        timestamp: serverTimestamp(),
        itemLocation: location,
        lastPersonToScan: auth.currentUser.email,
        peopleWhoScanned: arrayUnion(auth.currentUser.email),

        // quantity: increment(1),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            year: year,
            ItemType: ItemType,
            company: selectedCompany,
            timestamp: serverTimestamp(),
            quantity: quantity,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            ItemType: ItemType,
            company: selectedCompany,
            timestamp: serverTimestamp(),
            quantity: quantity,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            company: selectedCompany,
            timestamp: serverTimestamp(),
            quantity: quantity,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        console.log("itemAdded");
        try {
          await setDoc(
            doc(
              db,
              "companys",
              selectedCompany,
              ItemType,
              data,
              "year added",
              year,
              "month",
              month,
              "day",
              day,
              "hours",
              hours
            ),
            {
              // type_of_barcode: type,
              // barcode: data,
              // id: data,
              // product: name,
              hours: hours,
              type_of_barcode: type,
              barcode: data,
              id: data,
              product: itemName,
              quantity: quantity,
              description: description,
              company: selectedCompany,
              ItemType: ItemType,

              itemLocation: location,
              lastPersonToScan: auth.currentUser.email,
              timestamp: serverTimestamp(),

              peopleWhoScanned: arrayUnion(auth.currentUser.email),
            },
            { merge: true }
          );
        } catch (e) {
          alert(e);
        }
      })
      .then(async () => {
        await addDoc(
          collection(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "allUsages"
          ),
          {
            type_of_barcode: type,
            barcode: barcode,
            id: barcode,
            product: itemName,
            quantity: quantity,
            description: description,
            company: selectedCompany,
            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: increment(incrementQuantity),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            typeOfUsage: "added",
          },
          { merge: true }
        );
      });
  } catch (e) {
    alert(e);
  }
}
export async function addExisitingItemToDb({
  barcode,
  itemName,
  quantity,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        timestamp: serverTimestamp(),
        quantity: increment(1),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            year: year,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day,
            "hours",
            hours
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            hours: hours,
            type_of_barcode: type,
            barcode: barcode,
            id: data,
            product: itemName,
            quantity: quantity,
            description: description,
            company: selectedCompany,
            timestamp: serverTimestamp(),
            itemLocation: location,
            lastPersonToScan: auth.currentUser.uid,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await addDoc(
          collection(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "allUsages"
          ),
          {
            type_of_barcode: type,
            barcode: barcode,
            id: barcode,
            product: itemName,
            quantity: quantity,
            description: description,
            company: selectedCompany,
            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            typeOfUsage: "added",
          },
          { merge: true }
        );
      });
  } catch (error) {
    console.log(`i got an error ${error}`);
  }
}

export async function AddNewItemToDb({
  barcode,
  itemName,
  quantity,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        barcode: barcode,
        id: barcode,
        product: itemName,
        quantity: quantity,
        description: description,
        company: selectedCompany,
        ItemType: ItemType,
        timestamp: serverTimestamp(),
        itemLocation: location,
        lastPersonToScan: auth.currentUser.email,
        peopleWhoScanned: arrayUnion(auth.currentUser.email),
        type_of_barcode: type,

        // quantity: increment(1),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            year: year,
            company: selectedCompany,
            ItemType: ItemType,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            company: selectedCompany,
            timestamp: serverTimestamp(),
            ItemType: ItemType,
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            company: selectedCompany,
            ItemType: ItemType,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        console.log("itemAdded");
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day,
            "hours",
            hours
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            hours: hours,
            type_of_barcode: type,
            barcode: data,
            id: data,
            product: itemName,
            quantity: quantity,
            company: selectedCompany,
            description: description,
            company: selectedCompany,
            ItemType: ItemType,

            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await addDoc(
          collection(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "allUsages"
          ),
          {
            type_of_barcode: type,
            barcode: barcode,
            id: barcode,
            product: itemName,
            quantity: quantity,
            description: description,
            company: selectedCompany,
            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            typeOfUsage: "added",
          },
          { merge: true }
        );
      });
  } catch (e) {
    alert(e);
  }
}
export async function UseExistingItemOnDb({
  barcode,
  itemName,
  quantity,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
  patientThatUsedItem,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        timestamp: serverTimestamp(),
        quantity: increment(-1),
      },
      { merge: true }
    );
  } catch (error) {
    console.log(`i got an error ${error}`);
  }
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data, "year used", year),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        year: year,
        timestamp: serverTimestamp(),
        quantity: increment(1),
        peopleWhoScanned: arrayUnion(auth.currentUser.email),
        patientThatUsedItem: arrayUnion(patientThatUsedItem),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year used",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            patientThatUsedItem: arrayUnion(patientThatUsedItem),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year used",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            patientThatUsedItem: arrayUnion(patientThatUsedItem),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year used",
            year,
            "month",
            month,
            "day",
            day,
            "hours",
            hours
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            hours: hours,
            type_of_barcode: type,
            barcode: barcode,
            id: barcode,
            product: itemName,
            quantity: quantity,
            description: description,
            company: selectedCompany,

            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            patientThatUsedItem: arrayUnion(patientThatUsedItem),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await addDoc(
          collection(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "allUsages"
          ),
          {
            type_of_barcode: type,
            barcode: barcode,
            id: barcode,
            product: itemName,
            quantity: quantity,
            description: description,
            company: selectedCompany,
            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: increment(-1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
            typeOfUsage: "used",
            patientThatUsedItem: arrayUnion(patientThatUsedItem),
          },
          { merge: true }
        );
      });
  } catch (error) {
    console.log(`i got an error ${error}`);
    alert(error);
  }
}
export async function DeleteItemOnDB({
  selectedCompany,
  data,
  year,
  month,
  day,
  hours,
  ItemType,
}) {
  try {
    deleteDoc(doc(db, "companys", selectedCompany, ItemType, data));
    // .then(() => {
    //   deleteDoc(
    //     doc(
    //       db,
    //       "companys",
    //       selectedCompany,
    //       ItemType,
    //       data,
    //       "year added",
    //       year,
    //       "month",
    //       month,
    //       "day",
    //       day
    //     )
    //   );
    // })
    // .then(() => {
    //   deleteDoc(
    //     doc(
    //       db,
    //       "companys",
    //       selectedCompany,
    //       ItemType,
    //       data,
    //       "year added",
    //       year,
    //       "month",
    //       month
    //     )
    //   );
    // })
    // .then(() => {
    //   deleteDoc(
    //     doc(
    //       db,
    //       "companys",
    //       selectedCompany,
    //       ItemType,
    //       data,
    //       "year added",
    //       year
    //     )
    //   );
    // })
    // .then(() => {
    //   deleteDoc(doc(db, "companys", selectedCompany, ItemType, data));
    // });
  } catch (error) {
    alert("Item not deleted " + e);
  }
}
export const productsFirebase = [];
export async function GetProducts({
  selectedCompany,
  typeOfProduct,

  productState,
}) {
  try {
    onSnapshot(
      query(
        collection(db, "companys", selectedCompany, typeOfProduct),
        orderBy("timestamp", "desc")
      ),
      (querySnapshot) => {
        const arrays = [];
        querySnapshot.forEach((snap) => {
          arrays.push(snap.data());
          // key: snap.id;
        });
        productState(arrays);
        // console.log(products);
      }
    );
  } catch (e) {
    // alert("hi");
  }
}
export function GetYearForSelectedItem({
  selectedCompany,
  typeOfProduct,
  barcode,
  YearState,
  addOrUsed,
  year,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month"
      ),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const yearArray = [];
      querySnapshot.forEach((snap) => {
        // const data = snap.data();
        yearArray.push(snap.get("month"));
        // console.log(data.year);
        // key: snap.id;
      });
      if (yearArray > 99999999999) {
        YearState(["Na"]);
      } else {
        YearState(yearArray);
      }
    }
  );
}
export function GetProductQuantityYear({
  selectedCompany,
  typeOfProduct,
  barcode,
  QuantityState,
  addOrUsed,
  year,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month"
      )
    ),
    (querySnapshot) => {
      const quantitysnap = [];
      querySnapshot.forEach((snap) => {
        quantitysnap.push(snap.get("quantity"));

        // key: snap.id;
      });
      if (quantitysnap < 9999999999) {
        QuantityState(quantitysnap);
      } else {
        QuantityState([0]);
      }
      console.log("Q " + quantitysnap);
    }
  );
}
export function GetMonthsForSelectedItems({
  selectedCompany,
  typeOfProduct,
  barcode,
  MonthState,
  addOrUsed,
  year,
  month,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day"
      ),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const monthArray = [];
      querySnapshot.forEach((snap) => {
        // const data = snap.data();
        monthArray.push(snap.get("day"));
        // console.log(data.year);
        // key: snap.id;
      });
      if (monthArray > 99999999999) {
        MonthState(["Na"]);
      } else {
        MonthState(monthArray);
      }
      console.log("M " + monthArray);
    }
  );
}
export function GetProductQuantityMonth({
  selectedCompany,
  typeOfProduct,
  barcode,
  QuantityState,
  addOrUsed,
  year,
  month,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day"
      )
    ),
    (querySnapshot) => {
      const quantitysnap = [];
      querySnapshot.forEach((snap) => {
        quantitysnap.push(snap.get("quantity"));

        // key: snap.id;
      });
      if (quantitysnap < 9999999999) {
        QuantityState(quantitysnap);
      } else {
        QuantityState([0]);
      }
      console.log("Q " + quantitysnap);
    }
  );
}
export function GetDayForSelectedItems({
  selectedCompany,
  typeOfProduct,
  barcode,
  DayState,
  addOrUsed,
  year,
  month,
  day,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day",
        day,
        "hours"
      ),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const dayArray = [];
      querySnapshot.forEach((snap) => {
        // const data = snap.data();
        dayArray.push(snap.get("hours"));
        // console.log(data.year);
        // key: snap.id;
      });
      if (dayArray > 99999999999) {
        DayState(["Na"]);
      } else {
        DayState(dayArray);
      }
    }
  );
}
export function GetProductQuantityDay({
  selectedCompany,
  typeOfProduct,
  barcode,
  QuantityState,
  addOrUsed,
  year,
  month,
  day,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day",
        day,
        "hours"
      )
    ),
    (querySnapshot) => {
      const quantitysnap = [];
      querySnapshot.forEach((snap) => {
        quantitysnap.push(snap.get("quantity"));

        // key: snap.id;
      });
      if (quantitysnap < 9999999999) {
        QuantityState(quantitysnap);
      } else {
        QuantityState([0]);
      }
      console.log(quantitysnap);
    }
  );
}
export async function VIC_MIS_addToDb({
  year,
  month,
  day,
  firstName,
  lastName,
  vistId,
  typeOfAppointment,
  typeofRefurel,
  typeOfPatient,
  typeOfIvBag,
  typeOfaddons,
  typeOfboosters,
  typeOfInjections,
}) {
  try {
    await setDoc(
      doc(db, "companys", "Vitalize Infusion", "MIS"),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        typeOfInjections: typeOfInjections,
        typeOfPatient: typeOfPatient,
        typeOfIvBag: typeOfIvBag,
        typeOfaddons: typeOfaddons,
        typeOfboosters: typeOfboosters,
        typeofRefurel: typeofRefurel,
        typeOfAppointment: typeOfAppointment,
        fullName: firstName + " " + lastName,
        firstName: firstName,
        lastName: lastName,
        visitId: vistId,
        year: year,
        timestamp: serverTimestamp(),
        fullName,
        peopleWhoAdded: arrayUnion(auth.currentUser.email),
      },
      { merge: true }
    );
  } catch (e) {
    console.log(e);
  }
}
export const companyTeamsToDo = ({ setTeam }) => {
  onSnapshot(
    doc(db, "users", auth.currentUser.email),

    (doc) => {
      setTeam(doc.get("teams"));
    }
  );
};
export const addNewTask = async ({
  description,
  title,
  importance,
  todaysHours,
  todaysMin,
  fulldate,
  company,
  team,
}) => {
  try {
    const randomNumberTaskId = Math.random() * 1000000 + 1;
    const randomnumberString = randomNumberTaskId.toString();

    await setDoc(
      doc(db, "tasks", randomnumberString),
      {
        description: description,
        name: title,
        importance: parseInt(importance),
        lastUpdateTime: todaysHours + ":" + todaysMin,
        lastUpdateDate: fulldate,
        company: company,
        team: team,
        taskID: randomnumberString,
        whoPostedIt: auth.currentUser.email,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    ).then(async () => {
      await setDoc(
        doc(db, "users", auth.currentUser.email),
        {
          teams: arrayUnion(team),
        },
        { merge: true }
      );
    });
  } catch (error) {
    alert(error);
    console.log("i got an error ${error}");
  }
};
export const addTeam = async (newTeam, teamRecipientArray) => {
  await setDoc(
    doc(db, "users", auth.currentUser.email),
    {
      teams: arrayUnion(newTeam),
    },
    { merge: true }
  ).then(() => {
    teamRecipientArray.forEach(async (item) => {
      await setDoc(
        doc(db, "users", item),
        {
          teams: arrayUnion(newTeam),
        },
        { merge: true }
      );
    });
  });
};
export const checkForEmployees = ({ teamRecipientArray, teamRecipient }) => {
  try {
    onSnapshot(
      query(collection(db, "users"), where("email", ">=", teamRecipient)),
      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.get("email"));

          // key: snap.id;
        });
        teamRecipientArray(quantitysnap);

        console.log(" fireeee x" + quantitysnap);
      }
    );
  } catch (e) {
    e;
  }
};
//add function to add MIS to db
export const addMIS = async ({
  year,
  month,
  day,
  firstName,
  lastName,
  email,
  typeOfAppointment,
  typeofReferral,
  typeOfPatient,
  typeOfIvBag,
  typeOfaddons,
  typeOfboosters,
  typeOfInjections,
  providerRefural,
  discount,
  paymentMethod,
  ulitmaList,
  visitId,
  DOB,
  stykuList,
  phlebotomyList,
  total,
  totalBeforeDiscount,
  timePatientWasSeen,
  listOfProductsToRemoveFromInventory,
  hour,
}) => {
  try {
    await setDoc(
      doc(db, "companys", "Vitalize Nation", "MIS", visitId.toString()),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,

        typeOfInjections: typeOfInjections,
        typeOfPatient: typeOfPatient,
        typeOfIvBag: typeOfIvBag,
        typeOfaddons: typeOfaddons,
        typeOfBoosters: typeOfboosters,
        typeofReferral: typeofReferral,
        typeOfAppointment: typeOfAppointment,
        fullName: lastName + ", " + firstName,
        firstName: firstName,
        lastName: lastName,
        visitId: visitId,
        email: email,
        providerReferral: providerRefural,
        timestamp: serverTimestamp(),
        whoSubmitted: auth.currentUser.email,
        discount: discount,
        paymentMethod: paymentMethod,
        ulitma: ulitmaList,
        boosters: typeOfboosters,
        total: total,
        phlebotomyList: phlebotomyList,
        stykuList: stykuList,
        DOB: DOB,
        totalBeforeDiscount: totalBeforeDiscount,
        timePatientWasSeen: timePatientWasSeen,
        listOfProductsToRemoveFromInventory:
          listOfProductsToRemoveFromInventory,
      },
      { merge: true }
    ).then(() => {
      //add visit Info to Patient
      setDoc(
        doc(
          db,
          "companys",
          "Vitalize Nation",
          "patients",
          email,
          "visits",
          visitId.toString()
        ),
        {
          visitId: visitId.toString(),
          timestamp: serverTimestamp(),
          whoSubmitted: auth.currentUser.email,
          total: total,
          timePatientWasSeen: timePatientWasSeen,
          typeOfInjections: typeOfInjections,
          typeOfPatient: typeOfPatient,
          typeOfIvBag: typeOfIvBag,
          typeOfaddons: typeOfaddons,
          typeOfBoosters: typeOfboosters,
          typeofReferral: typeofReferral,
          typeOfAppointment: typeOfAppointment,
          fullName: lastName + ", " + firstName,
          firstName: firstName,
          lastName: lastName,
          visitId: visitId,
          email: email,
          providerReferral: providerRefural,
          timestamp: serverTimestamp(),
          whoSubmitted: auth.currentUser.email,
          discount: discount,
          paymentMethod: paymentMethod,
          ulitma: ulitmaList,
          boosters: typeOfboosters,
          total: total,
          phlebotomyList: phlebotomyList,
          stykuList: stykuList,
          DOB: DOB,
          totalBeforeDiscount: totalBeforeDiscount,
          timePatientWasSeen: timePatientWasSeen,
          listOfProductsToRemoveFromInventory:
            listOfProductsToRemoveFromInventory,
        },
        { merge: true }
      );
    });
  } catch (e) {
    alert(e);
  }
};
export function patientSearchList({ patientArray, company }) {
  try {
    onSnapshot(
      query(
        collection(db, "companys", "Vitalize Nation", "patients")
        // where('fullName', '>=', searchName)
      ),

      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data());

          // key: snap.id;
        });
        patientArray(quantitysnap);

        // console.log(' fireeee x  ' + quantitysnap)
      }
    );
  } catch (e) {
    e;
  }
}
export async function addNewPatient({
  email,
  lastName,
  firstName,
  phoneNumber,
  DOB,
  address,
  company,
}) {
  await setDoc(
    doc(db, "companys", company, "patients", email),
    {
      fullName: lastName + ", " + firstName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      address: address,
      dateAdded: serverTimestamp(),
    },
    { merge: true }
  );
}
export async function addGiftCardToPatient({
  email,
  company,
  giftCardNumber,
  totalOnGiftCard,
  currentAmountOnGiftCard,
  firstName,
  lastName,

  phoneNumber,
  DOB,
}) {
  await setDoc(
    doc(db, "companys", company, "patients", email),
    {
      dateGiftCardWasAdded: serverTimestamp(),
      giftCardNumber: giftCardNumber,
      totalOnGiftCard: totalOnGiftCard,
      currentAmountOnGiftCard: currentAmountOnGiftCard,
    },
    { merge: true }
  ).then(async () => {
    await setDoc(
      doc(db, "companys", company, "giftCards", giftCardNumber),
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        DOB: DOB,
        dateGiftCardWasAdded: serverTimestamp(),
        giftCardNumber: giftCardNumber,
        totalOnGiftCard: totalOnGiftCard,
        currentAmountOnGiftCard: currentAmountOnGiftCard,
      },
      { merge: true }
    );
  });
}
//remove gift card from patient
export async function removeGiftCardFromPatient({
  giftCardNumber,
  email,
  company,
}) {
  await deleteDoc(
    doc(db, "companys", company, "patients", email),
    {
      giftCardNumber: deleteField(),
      totalOnGiftCard: deleteField(),
      currentAmountOnGiftCard: deleteField(),
      // dateGiftCardWasAdded: deleteField(),
    },
    { merge: true }
  ).then(async () => {
    await deleteDoc(doc(db, "companys", company, "giftCards", giftCardNumber));
  });
}
//get one patient
export function getOnePatient({ patientArray, email, company }) {
  try {
    getDoc(doc(db, "companys", company, "patients", email)).then((doc) => {
      if (doc.exists()) {
        patientArray(doc.data());
      } else {
        patientArray("no such document");
      }
    });
  } catch (e) {
    e;
  }
}
// search patient by gift card number
export async function searchPatientByGiftCardNumber({
  patientArray,
  giftCardNumber,
  company,
}) {
  try {
    onSnapshot(
      query(
        collection(db, "companys", company, "patients"),
        where("giftCardNumber", "==", giftCardNumber)
      ),
      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data());

          // key: snap.id;
        });
        if (quantitysnap.length !== 0) {
          patientArray(quantitysnap);
        }

        // console.log(' fireeee x  ' + quantitysnap)
      }
    );
  } catch (e) {
    e;
  }
}
//useGiftCard
export async function useAmountGiftCard({
  email,
  company,
  currentAmountOnGiftCard,
  amountToUse,
  giftCardNumber,
}) {
  try {
    await setDoc(
      doc(db, "companys", company, "giftCards", giftCardNumber),
      {
        currentAmountOnGiftCard: amountToUse,
      },
      { merge: true }
    ).then(async () => {
      await setDoc(
        doc(db, "companys", company, "patients", email),
        {
          currentAmountOnGiftCard: amountToUse,
        },
        { merge: true }
      );
    });
  } catch (error) {
    console.log(error);
  }
}
//add gift card under gift card number
export async function addGiftCardToGiftCardNumber({
  giftCardNumber,
  company,
  totalOnGiftCard,
  currentAmountOnGiftCard,
}) {
  await setDoc(
    doc(db, "companys", company, "giftCards", giftCardNumber),
    {
      totalOnGiftCard: totalOnGiftCard,
      currentAmountOnGiftCard: currentAmountOnGiftCard,
      dateGiftCardWasAdded: serverTimestamp(),
      timestamp: serverTimestamp(),
      personWhoCheckPatientOut: auth.currentUser.email,
      giftCardNumber: giftCardNumber,
    },
    { merge: true }
  );
}
//search gift card by number
export async function searchGiftCardByNumber({
  giftCardArray,
  giftCardNumber,
  company,
}) {
  try {
    onSnapshot(
      query(
        collection(db, "companys", company, "giftCards"),
        where("giftCardNumber", "==", giftCardNumber)
      ),
      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data());

          // key: snap.id;
        });
        if (quantitysnap.length !== 0) {
          giftCardArray(quantitysnap);
        }

        // console.log(' fireeee x  ' + quantitysnap)
      }
    );
  } catch (e) {
    e;
  }
}
//add patient to gift card
export async function addPatientToGiftCard({
  giftCardNumber,
  company,
  email,
  firstName,
  lastName,
  phoneNumber,
  DOB,
  totalOnGiftCard,
  currentAmountOnGiftCard,
  dateGiftCardWasAdded,
}) {
  await setDoc(
    doc(db, "companys", company, "giftCards", giftCardNumber),
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      dateGiftCardWasAdded: dateGiftCardWasAdded(),
    },
    { merge: true }
  ).then(async () => {
    await setDoc(
      doc(db, "companys", company, "patients", email),
      {
        giftCardNumber: giftCardNumber,
        totalOnGiftCard: totalOnGiftCard,
        currentAmountOnGiftCard: currentAmountOnGiftCard,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        DOB: DOB,
        dateGiftCardWasAdded: dateGiftCardWasAdded,
      },
      { merge: true }
    );
  });
}
export function GetAllGiftCards({ giftCardArray, company }) {
  try {
    onSnapshot(
      query(collection(db, "companys", "Vitalize Nation", "giftCards")),
      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data());

          // key: snap.id;
        });
        if (quantitysnap.length !== 0) {
          giftCardArray(quantitysnap);
        }

        // console.log(' fireeee x  ' + quantitysnap)
      }
    );
  } catch (e) {
    e;
  }
}

// This is for the Internal Medicine team in AMA for their MIS results
export async function DailyInternalMedMis({
  currentDate,
  provider,
  location,
  NumOfPatients,
  NumOfNewPatients,
  NumOfTeleVisits,
  HoursScheduled,
  RefferedBy,
  NumOfInjections,
  NumOfTriggerOrJointInjections,
  NumOfNewSignUp,
  NumOfPatientsContacted,
  DollarsCollected,
}) {
  // Cleans up the date and providers name to make it all match and allow
  // for no duplicates of providers.
  const cleanedCurrentDate = currentDate.trim();
  const cleanedProvider = provider.trim().toLowerCase();

  // Sets a uniqueId using the date and provider
  const uniqueId = `${cleanedCurrentDate}_${cleanedProvider}`;

  // New function that presets our doc
  const providerDocRef = doc(
    db,
    "companys",
    "AMA",
    "InternalMedicineMIS",
    uniqueId
  );

  const providerSnapshot = await getDoc(providerDocRef);

  // Checks to see if the uniqueId exists. If it does then update it.
  // If it doesn't, then create a new submission.
  if (providerSnapshot.exists()) {
    await updateDoc(providerDocRef, {
      submittedBy: auth.currentUser?.email,
      currentDate: currentDate,
      location: location,
      NumOfPatients: NumOfPatients,
      NumOfNewPatients: NumOfNewPatients,
      NumOfTeleVisits: NumOfTeleVisits,
      HoursScheduled: HoursScheduled,
      RefferedBy: RefferedBy,
      NumOfInjections: NumOfInjections,
      NumOfTriggerOrJointInjections: NumOfTriggerOrJointInjections,
      NumOfNewSignUp: NumOfNewSignUp,
      NumOfPatientsContacted: NumOfPatientsContacted,
      DollarsCollected: DollarsCollected,
    });
  } else {
    await setDoc(
      providerDocRef,
      {
        submittedBy: auth.currentUser?.email,
        currentDate: currentDate.trim(),
        provider: provider.trim().toLowerCase(),
        location: location,
        NumOfPatients: NumOfPatients,
        NumOfNewPatients: NumOfNewPatients,
        NumOfTeleVisits: NumOfTeleVisits,
        HoursScheduled: HoursScheduled,
        RefferedBy: RefferedBy,
        NumOfInjections: NumOfInjections,
        NumOfTriggerOrJointInjections: NumOfTriggerOrJointInjections,
        NumOfNewSignUp: NumOfNewSignUp,
        NumOfPatientsContacted: NumOfPatientsContacted,
        DollarsCollected: DollarsCollected,
      },
      { merge: true }
    );
  }
}

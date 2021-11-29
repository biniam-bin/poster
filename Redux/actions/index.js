import firebase from "firebase";
import * as types from "../constants/index";


export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
    //   .doc(firebase.auth().currentUser.uid)
       .doc("Vyik0yoUDlEjHqkezv6Y")
      .get()
      .then((snapshot) => {
          if (snapshot.exists){
            //   console.log(snapshot.data())
              dispatch({type: types.USER_STATE_CHANGE, currentUser: snapshot.data()})
          }
          else{
              console.log("Doesnot exist")
          }
      }).catch((error) => console.log(error))
  };
}

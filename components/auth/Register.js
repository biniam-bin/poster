import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import * as firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    // BIND FUNCTIONS TO THE CLASS
    this.onSignUp = this.onSignUp.bind(this);
  }

  //   ON SIGNUP FUNCTIONN
  onSignUp() {
    const { name, email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button title="Sign Up" onPress={() => this.onSignUp()} />
      </View>
    );
  }
}

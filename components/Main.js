import React, { Component } from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Tab = createMaterialBottomTabNavigator();

import { fetchUser } from "../Redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Feed from './Main/Feed';
import Add from './Main/Add';
import Profile from './Main/Profile';

class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    //   const {name, email} = currentUser
    console.log(currentUser);
    if (currentUser === undefined) {
      return (
        <View>
          <Text>not logged in</Text>
        </View>
      );
    }
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen name="Feed" component={Feed} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={26}/>
            )
        }} />
        <Tab.Screen name="MainAdd" component={Add} listeners={({navigation}) => ({
            tabPress: event => {
                event.preventDefault();
                navigation.navigate("Add")
            }
        })} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
            )
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
            )
        }} />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { Constants, Location, Permissions, MapView } from 'expo';
import get from 'lodash/get';
import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
import * as chatSelectors from '~/store/Chats/reducer';

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
 },
 paragraph: {
   margin: 24,
   fontSize: 18,
   fontWeight: 'bold',
   textAlign: 'center',
   color: '#34495e',
 },
 inputText: {
   height: 60,
   marginTop: 40,
   fontSize: 22,
   margin: 16,
   borderColor: 'gray',
   borderRadius: 4,
   borderWidth: 1,
   alignSelf: 'stretch',
   padding: 10,
 },
});

class GeoScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
    };

    this.artefactCoordinates = {
      latitude: 41.39499773551752,
      longitude: 2.19784090533472,
    }

    this.setTimeoutId = null;
  }

  componentDidMount() {
   this.getLocationAsync();
  }

  componentWillUnmount() {
    clearInterval(this.setTimeoutId);
  }

  getLocationAsync = async () => {
   const { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({ errorMessage: 'Permission to access location was denied' });
   }

   this.setTimeoutId = setInterval(async () => {
     const location = await Location.getCurrentPositionAsync({});
     this.setState({
       location,
     });
   }, 1000);

  };

  getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad = deg => {
    return deg * (Math.PI/180)
  }

  render() {
    let text = 'Waiting..';
    let distance = null;
     if (this.state.errorMessage) {
       text = this.state.errorMessage;
     } else if (this.state.location) {
       text = this.state.location.coords.latitude;
       distance = this.getDistanceFromLatLonInKm(this.artefactCoordinates.latitude, this.artefactCoordinates.longitude, this.state.location.coords.latitude, this.state.location.coords.longitude)
     }
   return (
     <View style={styles.container}>
       <Text>
         Distance: {distance}
       </Text>
     </View>

   );
  }
}

const mapStateToProps = (state) => {
 const artefactsById = chatSelectors.getArtefactsById(state);
 return {
   artefactsById,
 };
};

const mapDispatchToProps = dispatch => ({
 // getArtefacts: () => dispatch(chatActions.getArtefacts()),

});


export default connect(mapStateToProps, mapDispatchToProps)(GeoScreen);

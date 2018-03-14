import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { Constants, Location, Permissions, MapView } from 'expo';
import get from 'lodash/get';
import { connect } from 'react-redux';
import * as chatActions from '~/store/Chats/actions';
// import * as chatSelectors from '~/store/Chats/reducer';
import * as Selectors from '~/store/ArtefactCollection/reducer';
import * as artefactCollectionActions from '~/store/ArtefactCollection/actions';
import ThreadService from '~/services/getThread';


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
      closestArtefact: null,
      closestDistance: null
    };

    this.artefactCoordinates = {
      latitude: 41.39499773551752,
      longitude: 2.19784090533472,
    }

    this.setTimeoutId = null;
  }

  async componentDidMount() {
   await this.getLocation();
   await this.props.getArtefactCollection();
   await this.getClosestArtefact();
   await this.watchLocation();
  }

  componentWillUnmount() {
    clearInterval(this.setTimeoutId);
  }

  getLocation = async () => {
   const { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({ errorMessage: 'Permission to access location was denied' });
   }

   const location = await Location.getCurrentPositionAsync({});
   this.setState({
     location,
   });

  };

  watchLocation = () => {
   this.setTimeoutId = setInterval(() => {
     this.getLocation();
   }, 1000);
  };

  getDistanceFromLatLonInMt = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c * 1000; // Distance in meters
    return d;
  }

  deg2rad = deg => {
    return deg * (Math.PI/180)
  }

  getClosestArtefact = () => {
    this.setState({closestArtefact: this.props.artefactCollection[0]});
    this.setState({closestDistance: this.getDistanceFromLatLonInMt(this.props.artefactCollection[0].coordinates.latitude, this.props.artefactCollection[0].coordinates.longitude, this.state.location.coords.latitude, this.state.location.coords.longitude)});
    this.props.artefactCollection.forEach(artefact => {
      if (this.getDistanceFromLatLonInMt(artefact.coordinates.latitude, artefact.coordinates.longitude, this.state.location.coords.latitude, this.state.location.coords.longitude) < this.state.closestDistance) {
        this.setState({closestArtefact: artefact});
        this.setState({closestDistance: this.getDistanceFromLatLonInMt(artefact.coordinates.latitude, artefact.coordinates.longitude, this.state.location.coords.latitude, this.state.location.coords.longitude)});
      }
    });

  }

  openThread = async (artefact_id, artefact_name) => {
    const response = await ThreadService.fetchThread(artefact_id);
    this.props.openThread(response.message, artefact_id, artefact_name);
  }

  render() {
    let text = 'Waiting..';
    let distance = null;
     if (this.state.errorMessage) {
       text = this.state.errorMessage;
     } else if (this.state.location && this.state.closestArtefact) {
       text = this.state.location.coords.latitude;
       distance = this.getDistanceFromLatLonInMt(this.state.closestArtefact.coordinates.latitude, this.state.closestArtefact.coordinates.longitude, this.state.location.coords.latitude, this.state.location.coords.longitude)
     }
     // if (this.state.closestArtefact && distance && distance < 10) {
     //   this.openThread(this.state.closestArtefact.artefact_id, this.state.closestArtefact.artefact_name)
     // }
   return (
     <View style={styles.container}>
       <Text>
         Hi, I'm {this.state.closestArtefact ? this.state.closestArtefact.artefact_name : null}
       </Text>
       <Text>
         Find me!
       </Text>
       <Text>
         Distance: {distance}
       </Text>
     </View>

   );
  }
}

const mapStateToProps = (state) => ({
  artefactCollection: Selectors.getArtefactCollection(state)
});

const mapDispatchToProps = dispatch => ({
  getArtefactCollection: () => dispatch(artefactCollectionActions.getArtefactCollection()),
  openThread: (threadId, artefactId, artefactName) =>
    dispatch(chatActions.openThread(threadId, artefactId, artefactName)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GeoScreen);

// ! MISE EN SOMMEIL DE L'APPAREIL PHOTO
// import React from 'react';
// import { Camera, Permissions } from 'expo';
// import { View, TouchableHighlight } from 'react-native';
// import { Text, Icon } from 'react-native-elements';
// import { connect } from 'react-redux';

// class CameraChildScreen extends React.Component {
//   state = {
//     permission: null,
//     type: Camera.Constants.Type.back,
//   };
//   async componentDidMount() {
//     let permission = status === 'granted' ? true : false;
//     console.log('-------->', status, '3eme log', permission);
//     let { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ permission });
//     console.log('-------->', status, '4eme log', permission);
//   }

//   onPictureSaved = async photo => {
//     let data = new FormData();

//     data.append('photo', {
//       uri: photo.uri,
//       type: 'image/jpeg',
//       name: 'Food',
//     });

//     const heroku = 'https://eatforgoodbackend.herokuapp.com';

//     await fetch(heroku + '/upload', {
//       method: 'post',
//       body: data,
//     })
//       .then(res => {
//         return res.json();
//       })
//       .then(food => {
//         this.props.handlePicture(food.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   render() {
//     if (this.state.permision === null) {
//       return <View />;
//     } else if (this.state.permision === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera
//             style={{ flex: 1 }}
//             type={this.state.type}
//             ref={ref => {
//               this.camera = ref;
//             }}
//             ratio={'2:1'}
//           />

//           <TouchableHighlight
//             style={{
//               position: 'absolute',
//               bottom: 15,
//               justifyContent: 'center',
//               left: '50%',
//               marginLeft: -50,
//               backgroundColor: 'transparent',
//             }}
//             onPress={() => {
//               if (this.camera) {
//                 this.camera.takePictureAsync({
//                   onPictureSaved: this.onPictureSaved,
//                   quality: 0.7,
//                   base64: true,
//                   exif: true,
//                 });
//                 this.props.navigation.navigate('ConfirmationScreen');
//               }
//             }}
//           >
//             <Icon raised reverse name="ios-camera" size={40} type="ionicon" color="#3C8874" />
//           </TouchableHighlight>
//         </View>
//       );
//     }
//   }
// }
// // My new container component
// mapDispatchToProps = dispatch => {
//   return {
//     handlePicture: function(data) {
//       dispatch({
//         type: 'takePicture',
//         dataFromCamera: data,
//       });
//     },
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps,
// )(CameraChildScreen);

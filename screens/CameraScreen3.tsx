import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View,  Image} from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library'; //to be able to save picturess to our phone

import ButtonComponent from '../components/ButtonComponent';


export default function CameraScreen3() {

  const [cameraPermission, setCameraPermission] = useState<boolean | null>();
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>();

  const [camera, setCamera] = useState<any>();
  const [imageUri, setImageUri] = useState<any>();
  const [type, setType] = useState(CameraType.back);


  const permisionFunction = async () => {

    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    setGalleryPermission(imagePermission.status === 'granted');

    if (
      cameraPermission.status !== 'granted' &&
      imagePermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };



  useEffect(() => {
    permisionFunction();
  }, []);

  
  const takePicture = async () => {
    if (camera) {
      const options = {
        quality: 1,
        base64: true,
        skipProcessing: true,
      };

      const photoNew = await camera.takePictureAsync(options);

      setImageUri(photoNew.uri);

      const source = photoNew.uri;
      await handleSave(source);
    }
  };

  const handleSave = async (photo: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const albumName = '';
    if (status === 'granted') {
      const assert = await MediaLibrary.createAssetAsync(photo);
      await MediaLibrary.createAlbumAsync(albumName, assert);
    } else {
      alert("Oh you missed to give permission");
    }
  }



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };


  const toggleCameraType = () => {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }


  if (cameraPermission === null) {
    return <View >
        </View>
}

if (cameraPermission === false) {
    return <Text>No access to camera.</Text>
}

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        >
          <View >
             <ButtonComponent
              title={'Take a picture'}
              icon="camera"
              onPress={takePicture}
            />
    
          <ButtonComponent
              icon="flip-camera-android"
              onPress={toggleCameraType}
            />
          </View>
        </Camera>
      </View>

      <ButtonComponent title={'Gallery'} icon={"photo-library"} onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1} }/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
   
  },

});



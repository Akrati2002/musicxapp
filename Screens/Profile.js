import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Keyboard } from 'react-native'
import { Footer } from '../Components/Footer'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import db from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

SplashScreen.preventAutoHideAsync();

export function Profile({ navigation }) {

  const screen = 'Profile';

  const [keyVisible, setKeyVisible] = useState(true);

  const keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setKeyVisible(false)
    }
  );
  const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setKeyVisible(true)
    }
  );

  const [muisicName, setMusicName] = useState('');
  const [singerName, setSingerName] = useState('');
  const [musicCoverImg, setMusicCoverImg] = useState('');
  const [musicAudioFile, setMusicAudioFile] = useState('');

  const [savingData, setSavingData] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('New music added successfully');

  const addNewMusic = () => {
    setSavingData(true);
    if (muisicName === '' || singerName === '' || muisicName === null || singerName === null || musicCoverImg === '' || musicAudioFile === '') {
      setAlertMsg('All fields are required');
      setShowAlert(true);
      return;
    }
    else {
      addDoc(collection(db, 'musics'), {
        music: muisicName,
        singer: singerName,
        coverImg: musicCoverImg,
        musicFile: musicAudioFile,
        like: false,
      }).then(() => {
        setAlertMsg('New music added Successfully! ');
        setShowAlert(true);
        setMusicName('');
        setSingerName('');
        setMusicCoverImg('');
        setMusicAudioFile('');
        setSavingData(false);
      }).catch((error) => {
        setSavingData(false);
        console.log(error);
      })
    }
  };

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgUri, setSelectedImgUri] = useState(null);

  const handleImageSelect = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Access denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setSelectedImg(result);
      setSelectedImgUri(result.uri);
      console.log(selectedImg);
    }
  }

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDocUri, setSelectedDocUri] = useState(null);

  const handleDocSelection = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setSelectedDoc(result);
    setSelectedDocUri(result.uri);
  }

  const uploadImage = async () => {

    if (selectedImg == null) return;

    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      }
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      }
      xhr.responseType = 'blob';
      xhr.open("GET", selectedImgUri, true);
      xhr.send(null);
    })

    const storage = getStorage();


    const metadata = {
      contentType: 'image/png'
    };

    const storageRef = ref(storage, 'musicImage/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

     uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {

        switch (error.code) {
          case 'storage/unauthorized':
             break;
          case 'storage/canceled':
            break;

         case 'storage/unknown':
         break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setMusicCoverImg(downloadURL);
        });
      }
    );
  }

  const uploadMusic = async () => {

    if (selectedDoc == null) return;

    const blobFile = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      }
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      }
      xhr.responseType = 'blob';
      xhr.open("GET", selectedDocUri, true);
      xhr.send(null);
    })

    const storage = getStorage();

  
    const metadata = {
      contentType: 'audio/mp3'
    };

    const storageRef = ref(storage, 'mp3Files/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobFile, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {

        switch (error.code) {
          case 'storage/unauthorized':
             break;
          case 'storage/canceled':
           break;


          case 'storage/unknown':
            break;
        }
      },
      () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setMusicAudioFile(downloadURL);
        });
      }
    );
  }    


  const [fontsLoaded] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.subCont}>
        <View style={styles.body}>
          <Text style={styles.text}>
            Data from firestore database
          </Text>
          <TextInput placeholder="Music name" style={styles.inputField} value={muisicName} onChangeText={(text) => setMusicName(text)} />
          <TextInput placeholder="Singer name" style={styles.inputField} value={singerName} onChangeText={(text) => setSingerName(text)} />
          {
            showAlert &&
            <TouchableOpacity style={styles.inputField} onPress={() => setShowAlert(false)}>
              <Text style={{ color: 'red' }}>{alertMsg}</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={addNewMusic}>
            <Text style={styles.text}>Save Data</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={handleImageSelect}>
            <Text style={[styles.text, { backgroundColor: '#000' }]}>Select Image</Text>
          </TouchableOpacity>

          {selectedImg && <Image source={{ uri: selectedImgUri }} style={{ width: 200, height: 200 }} />}

          <TouchableOpacity onPress={handleDocSelection}>
            <Text style={[styles.text, { backgroundColor: '#000' }]}>Select MP3 File</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={uploadImage}>
            <Text style={[styles.text, { backgroundColor: '#000' }]}>Upload Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={uploadMusic}>
            <Text style={[styles.text, { backgroundColor: '#000' }]}>Upload Music</Text>
          </TouchableOpacity>


        </View>
      </View>
      {
        keyVisible === true ?
          <Footer navigation={navigation} screen={screen} />
          :
          <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f7eae',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  subCont: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(000, 000, 000, 0.4)',
    padding: 20,
    gap: 20,
    paddingBottom: 70,
  },
  body: {
    marginTop: 45,
    gap: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  inputField: {
    height: 50,
    width: '100%',
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 20,
  },
})
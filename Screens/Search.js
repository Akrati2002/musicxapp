import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import { Footer } from '../Components/Footer'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const search = require('../assets/icons/search.png');
const backIcon = require('../assets/icons/arrow2.png');


SplashScreen.preventAutoHideAsync();

export function Search({ navigation }) {

    const screen = 'Search';

    const[isKeyboardopen,setIsKeyboardopen]=useState(false);

    const handleFooter= () => {
        setIsKeyboardopen(!isKeyboardopen);
        Keyboard.dismiss();
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
                <View style={styles.srchHeader}>
                    <View style={styles.hdrItems}>
                    <TouchableOpacity onPress={() => handleFooter() }>
          <Image source={backIcon} style={[styles.imgIcons, { marginRight: 10, }]} />
          </TouchableOpacity>              
            <Image source={search} style={styles.imgIcons} />
                        <TextInput style={styles.srchtext} placeholder="Search your favourite music" placeholderTextColor='#fff' autoFocus={true} onPress={() =>handleFooter()} />
                    </View>
                </View>
            </View>
            {
            isKeyboardopen &&
            <Footer navigation={navigation} screen={screen}/>    
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
    footer: {
        position: 'absolute',
        backgroundColor:'#000',
        zIndex:999,
        width:'100%',
        alignSelf:'center',
        bottom:10,
    },
    srchHeader: {
        height: 50,
        width: '100%',
        marginTop: 45,
        flexDirection: 'row',
        gap: 15,
    },
    imgIcons: {
        height: 30,
        width: 30,
        tintColor: '#fff',
    },
    hdrItems: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
    },
    srchtext: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.7,
        marginLeft:20,
    },
})
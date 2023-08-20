import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const homeIcon = require('../assets/icons/home.png');
const searchIcon = require('../assets/icons/search.png');
const musicIcon = require('../assets/icons/music.png');
const profileIcon = require('../assets/icons/user.png');

export function Footer({ navigation, screen }) {
    return (
        <View style={styles.container}>
            <View style={styles.innerBox}>
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Home")}>
                    <Image source={homeIcon} style={[styles.iconStyle, screen === 'Main' ? { tintColor: 'rgba(255, 255, 255, 1)' } : {}]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('Search')}>
                    <Image source={searchIcon} style={[styles.iconStyle, screen === 'Search' ? { tintColor: 'rgba(255, 255, 255, 1)' } : {}]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox}>
                    <Image source={musicIcon} style={[styles.iconStyle, screen === 'Song' ? { tintColor: 'rgba(255, 255, 255, 1)' } : {}]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Profile")}>
                    <Image source={profileIcon} style={[styles.iconStyle, screen === 'Profile' ? { tintColor: 'rgba(255, 255, 255, 1)' } : {}]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '96%',
        position: 'absolute',
        bottom: 7,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        // backgroundColor: 'black',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    innerBox: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    iconStyle: {
        height: '100%',
        width: '100%',
        tintColor: 'rgba(255, 255, 255, 0.5)',
    },
    iconBox: {
        height: 30,
        width: 30,
    }
})
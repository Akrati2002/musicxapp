import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '../Components/Footer';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import db from '../firebaseConfig';
import { collection,onSnapshot } from 'firebase/firestore';


const menu = require('../assets/icons/menu.png');
const search = require('../assets/icons/search.png');
const music1 = require('../assets/images/music1.jpeg');
const music = require('../assets/icons/music.png');
const like = require('../assets/icons/like.png');
const play = require('../assets/icons/play.png');
const user = require('../assets/icons/user.png');


SplashScreen.preventAutoHideAsync();

export function Main({ navigation }) {

    const screen = 'Main';

    const [musicData , setmusicData] = useState([]); 
    
  useEffect(() => {
    onSnapshot(collection(db,'musics'),(snapshot) => {
      setmusicData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
  },[]);

  const handleMusicPress = (musicId) => {
    navigation.navigate('Song', { musicId });
};

const likeMusic = async (id) => {
    const song = doc(db, "musics", id);
    const songSnap = await getDoc(song);
    const currentLikeStatus = songSnap.data().like;
    await updateDoc(song, {
        like: !currentLikeStatus,
    });
    fetchMusic();
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


    const deviceH = Dimensions.get("screen").height;
    const deviceW = Dimensions.get("screen").width;

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style='light' />
            <View style={[styles.subCont, { width: deviceW }]}>

                {/* search header start */}
                <View style={styles.srchHeader}>
                    <View style={[styles.hdrItems, { width: '15%' }]}>
                        <Image source={menu} style={[styles.imgIcons]} />
                    </View>
                    <TouchableOpacity style={[styles.hdrItems, { width: '80%', marginHorizontal: 10 }]} onPress={() => navigation.navigate('Search')}>
                        <Image source={search} style={styles.imgIcons} />
                        <Text style={styles.srchtext}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* search header end */}

                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    {/* heading text start*/}
                    <Text style={styles.mainHeading}>
                        Trending right now
                    </Text>
                    {/* heading text end */}

                    {/* trending cards start */}
                    <View style={{
                        marginTop: 10,
                        marginBottom: 15,
                    }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 15, height: '100%', padding: 10, }}>

                            <View style={[styles.card, { marginRight:15,marginLeft:-5 }]}>
                                <Image source={music1} style={styles.cardImg} />
                                <TouchableOpacity style={styles.dotIcon}>
                                    <Text style={styles.dotFont}>...</Text>
                                </TouchableOpacity>
                                <View style={styles.playBox}>
                                    <View style={styles.playBoxItem}>
                                        <View>
                                            <Text style={styles.musicName}>
                                                The Dark Side
                                            </Text>
                                            <View style={styles.mucisDescBox}>
                                                <Image source={music} style={styles.musicIcon} />
                                                <Text style={styles.musicDesc}>
                                                    Muse - Simulation Theory
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.playBtn}>
                                            <Image source={play} style={styles.playIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.card}>
                                <Image source={music1} style={styles.cardImg} />
                                <TouchableOpacity style={styles.dotIcon}>
                                    <Text style={styles.dotFont}>...</Text>
                                </TouchableOpacity>
                                <View style={styles.playBox}>
                                    <View style={styles.playBoxItem}>
                                        <View>
                                            <Text style={styles.musicName}>
                                                The Dark Side
                                            </Text>
                                            <View style={styles.mucisDescBox}>
                                                <Image source={music} style={styles.musicIcon} />
                                                <Text style={styles.musicDesc}>
                                                    Muse - Simulation Theory
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.playBtn}>
                                            <Image source={play} style={styles.playIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                    {/* trending cards end */}

                    {/* trending text boxes */}
                    <View style={{
                        marginTop: 0,
                        marginBottom: 20,
                    }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 10, marginTop: 10, }}>
                            <TouchableOpacity style={styles.textCard}>
                                <Text style={styles.trendText}>Trending right now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textCard}>
                                <Text style={styles.trendText}>Rock</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textCard}>
                                <Text style={styles.trendText}>Hip hop</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textCard}>
                                <Text style={styles.trendText}>Electro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textCard}>
                                <Text style={styles.trendText}>Classic</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textCard}>
                                <Text style={styles.trendText}>K-pop</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <View style={styles.musicCards}>

                        {
                            musicData.map((music) =>(
                                <TouchableOpacity style={styles.musicCard} key={music.id} onPress={() => handleMusicPress(music.id)}>
                                <View style={styles.musicCardCont}>
                                    <Image source={{uri:music.coverImg}} style={styles.musicImg} />
                                    <View style={styles.musicBoxDesc}>
                                        <Text style={styles.musicName}>
                                            {music.music}
                                        </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            gap: 5,
                                        }}>
                                            <Image source={user} style={styles.musicSinger} />
                                            <Text style={styles.musicDesc}>
                                                {music.singer}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
    
                                <TouchableOpacity onPress={() => likeMusic(music.id)}>
                                        <Image source={music.like ? likedIcon : like} style={styles.likeBtn} />
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            ))
                        }
                        </View>
                        </ScrollView>
                        </View>
                            <Footer navigation={navigation} screen={screen} />
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
        opacity: 0.7
    },
    mainHeading: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Raleway-Bold',
    },
    card: {
        width: 280,
        borderRadius: 30,
        height: 200,
        elevation: 10,
        shadowColor: '#fff',
        shadowRadius: 30,
    },
    cardImg: {
        width: '100%',
        height: 200,
        borderRadius: 30,
        resizeMode: 'contain',
    },
    dotIcon: {
        position: 'absolute',
        right: 30,
    },
    dotFont: {
        color: '#fff',
        fontSize: 29,
        fontWeight: '600',
    },
    playBox: {
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        padding: 20,
        width: '100%',
        borderRadius: 30,
    },
    playBoxItem: {
        backgroundColor: 'rgba(42, 82, 190, 0.9)',
        height: 60,
        width: '100%',
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    musicName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    musicDesc: {
        color: '#fff',
        fontSize: 12,
    },
    mucisDescBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 5,
        gap: 5,
    },
    musicIcon: {
        tintColor: '#fff',
        height: 18,
        width: 18,
    },
    playBtn: {
        backgroundColor: '#fff',
        height: 40,
        width: 40,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 9,
    },
    playIcon: {
        height: '100%',
        width: '100%',
    },
    textCard: {
        flex: 1,
        backgroundColor: 'rgba(42, 82, 190, 1)',
        padding: 5,
        borderRadius: 10,
        marginRight: 10,
    },
    trendText: {
        color: '#fff',
        marginLeft: 5,
        marginRight: 5,
    },
    musicCard: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    musicImg: {
        height: 75,
        width: 75,
        borderRadius: 10,
        alignSelf: 'center',
    },
    likeBtn: {
        height: 30,
        width: 30,
        tintColor: '#fff',
        resizeMode: 'contain',
        marginRight: 5,
    },
    musicSinger: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        tintColor: '#fff',
    },
    musicCardCont: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    musicBoxDesc: {
        gap: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    musicCards: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
    }
})
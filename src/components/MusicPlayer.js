import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress, usePlaybackState, State } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPlaylistByMood, playTrack } from '../services/SongsServices';


const MusicPlayer = () => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { position, duration } = useProgress();
    const playbackState = usePlaybackState();
    const [mood, setMood] = useState('');

    useEffect(() => {
        async function setupPlayer() {
            try {
                await TrackPlayer.setupPlayer();
                await TrackPlayer.updateOptions({
                    stopWithApp: true,
                    capabilities: [
                        TrackPlayer.CAPABILITY_PLAY,
                        TrackPlayer.CAPABILITY_PAUSE,
                        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                        TrackPlayer.CAPABILITY_STOP,
                    ],
                });
            } catch (error) {
                console.error('Error setting up TrackPlayer:', error);
            }
        }

        setupPlayer();
    }, []);

    useEffect(() => {
        async function fetchTracks() {
            const moodFromStorage = await AsyncStorage.getItem('sentiment');
            const val = moodFromStorage ? moodFromStorage.trim().toUpperCase() : 'NEUTRAL';

            setMood(val);

            const fetchedTracks = await getPlaylistByMood(val);
            if (fetchedTracks && fetchedTracks.length > 0) {
                setTracks(fetchedTracks);
                setCurrentTrack(fetchedTracks[0]); // Set the first track as the current track
                playTrack({
                    id: 'trackId', // Use a unique identifier
                    url: fetchedTracks[0].url,
                    title: fetchedTracks[0].title,
                    artist: fetchedTracks[0].artist,
                    artwork: fetchedTracks[0].artwork,
                });
                setCurrentIndex(0);
            }
        }

        fetchTracks();
    }, [mood]);

    const onSliderValueChange = (value) => {
        TrackPlayer.seekTo(value);
    };

    const togglePlayback = async () => {
        const currentState = (await TrackPlayer.getPlaybackState()).state; // Get the current state directly
        console.log('Current Playback State:', currentState);
    
        if (currentState === State.Playing) {
            await TrackPlayer.pause();
            console.log('Pausing playback');
        } else if (currentState === State.Paused || currentState === State.Ready) {
            await TrackPlayer.play();
            console.log('Playing track');
        }
    };
    

    const playNextTrack = () => {
        if (currentIndex < tracks.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            const nextTrack = tracks[nextIndex];
            setCurrentTrack(nextTrack);
            playTrack({
                id: 'trackId', // Use a unique identifier
                url: nextTrack.url,
                title: nextTrack.title,
                artist: nextTrack.artist,
                artwork: nextTrack.artwork,
            });
        }
    };

    const playPreviousTrack = () => {
        if (currentIndex > 0) {
            const previousIndex = currentIndex - 1;
            setCurrentIndex(previousIndex);
            const previousTrack = tracks[previousIndex];
            setCurrentTrack(previousTrack);
            playTrack({
                id: 'trackId', // Use a unique identifier
                url: previousTrack.url,
                title: previousTrack.title,
                artist: previousTrack.artist,
                artwork: previousTrack.artwork,
            });
        }
    };

    if (!currentTrack) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />
            <Text style={styles.title}>{currentTrack.title}</Text>
            <Text style={styles.artist}>{currentTrack.artist}</Text>

            <Slider
                style={styles.slider}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={onSliderValueChange}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#1EB1FC"
                thumbTintColor="#1EB1FC"
            />
            <View style={styles.controls}>
                <TouchableOpacity onPress={playPreviousTrack} style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayback} style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>Play/Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playNextTrack} style={styles.controlButton}>
                    <Text style={styles.controlButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    artwork: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
    },
    artist: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    slider: {
        width: '80%',
        height: 40,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 20,
    },
    controlButton: {
        backgroundColor: '#1EB1FC',
        padding: 10,
        borderRadius: 5,
    },
    controlButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default MusicPlayer;

const client_id = 'dcfa2015'; // Replace with your actual Jamendo API client ID
import TrackPlayer from 'react-native-track-player';


TrackPlayer.setupPlayer().then(async () => {
    console.log('TrackPlayer ready');
    // Add your tracks here if you want to preload them
});

export async function playTrack(track) {
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    TrackPlayer.play();
}

export async function getPlaylistByMood(mood) {
    const moodToTagMap = {
        'HAPPY': 'happy',
        'SAD': 'relaxing',
        'ANGRY': 'calm',
        'ENVY': 'inspiring',
        'FRUSTRATED': 'chill',
        'NEUTRAL': 'ambient'
    };
    const tag =  moodToTagMap[mood]; // Default to 'ambient' if mood is not recognized

    console.log(tag);
    

    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${client_id}&format=jsonpretty&limit=10&tags=${tag}&speed=high+veryhigh&include=musicinfo&groupby=artist_id`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Extract and format the response
        const formattedData = data.results.map(track => ({
            title: track.name,
            duration: track.duration,
            artist: track.artist_name,
            album: track.album_name,
            artwork: track.album_image,
            url: track.audio,
            genre: track.musicinfo.tags.genres || [],
        }));

        return formattedData;
    } catch (error) {
        console.error('Error fetching or formatting data:', error);
    }
}


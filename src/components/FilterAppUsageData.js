// Function to parse the string into an object
function parseAppUsageData(dataString) {
    const appUsageData = {};
    if (dataString) {
        const entries = dataString.split(', ').map(entry => entry.split('='));
        entries.forEach(([key, value]) => {
            appUsageData[key] = parseInt(value, 10);
        });
    }
    return appUsageData;
}

// Function to get health-affecting apps
function getHealthAffectingApps(appUsageData) {
    // List of known apps that might affect mental health

    const healthAffectingApps = [
        "com.instagram.android",
        "com.facebook.services",
        "com.reddit.frontpage",
        "com.discord",
        "com.whatsapp",
        "com.spotify.music",
        "com.google.android.apps.youtube.music",
        "com.google.android.apps.youtube",
        "com.google.android.apps.wellbeing",
        "com.google.android.apps.classroom",
        "org.telegram.messenger",
        "com.jio.media.jiobeats",
        "com.openai.chatgpt",
        "com.chess"
        // Add more apps if needed
    ];

    // Filter and get the apps affecting health along with their usage time
    const result = {};
    
    for (const app in appUsageData) {
        const time = appUsageData[app];
        // Check if the app is in the health-affecting list and usage time exceeds threshold
        if (healthAffectingApps.some(healthApp => app.includes(healthApp)) && time > 0) { // Adjust the threshold as needed
            result[app] = time;
        }
    }

    return result;
}


export const filterAppUsage= {getHealthAffectingApps,parseAppUsageData}

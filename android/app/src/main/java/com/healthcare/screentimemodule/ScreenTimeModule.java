package com.screentimeapp.screentimemodule;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.HashMap;

public class ScreenTimeModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public ScreenTimeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ScreenTimeModule";
    }

    @ReactMethod
    public void getScreenTimeStats(Promise promise) {
        UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
        if (usageStatsManager == null) {
            promise.reject("ERROR", "UsageStatsManager is not available");
            return;
        }

        if (!hasUsageStatsPermission()) {
            // If permission is not granted, open the settings page
            Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
            promise.reject("ERROR", "Usage access permission is not granted. Please enable it in settings.");
            return;
        }

        long endTime = System.currentTimeMillis();
        long startTime = endTime - (1000 * 60 * 60 * 24); // Last 24 hours

        List<UsageStats> stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

        Map<String, Long> appUsage = new HashMap<>();
        for (UsageStats stat : stats) {
            long totalTimeInForeground = stat.getTotalTimeInForeground();
            long totalTimeInMinutes = totalTimeInForeground / (1000 * 60); // Convert milliseconds to minutes
            appUsage.put(stat.getPackageName(), totalTimeInMinutes);
        }

        if (appUsage.isEmpty()) {
            promise.resolve("No usage stats available");
        } else {
            promise.resolve(appUsage.toString());
        }
    }


    private boolean hasUsageStatsPermission() {
        // Check if the usage stats permission is granted
        UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
        long endTime = System.currentTimeMillis();
        long startTime = endTime - (1000 * 60 * 60 * 24); // Last 24 hours
        List<UsageStats> stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);
        return stats != null && !stats.isEmpty();
    }
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  BatchSize,
  SdkVerbosity,
  DatadogProvider,
  DatadogProviderConfiguration,
  UploadFrequency,
  TrackingConsent
} from '@datadog/mobile-react-native';

// Import the Session Replay module
import {
  ImagePrivacyLevel,
  SessionReplay,
  TextAndInputPrivacyLevel,
  TouchPrivacyLevel,
} from '@datadog/mobile-react-native-session-replay';

import { globalVariables } from './utils/variables' 
import { WebView } from '@datadog/mobile-react-native-webview';

// CONFIGURATION FOR THE DATADOG RN SDK
const config = new DatadogProviderConfiguration(
  globalVariables.DD_CLIENT_TOKEN,
  globalVariables.DD_ENV,
  globalVariables.DD_RUM_APPLICATION_ID,
  true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
  true, // track XHR Resources
  true, // track Errors
  TrackingConsent.GRANTED
);

// Optional: Select your Datadog website (one of "US1", "EU1", "US3", "US5", "AP1" or "GOV")
config.site = 'US1';
// Optional: Enable JavaScript long task collection
config.longTaskThresholdMs = 100;
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 100% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 100;
// Optional: Send data more frequently
config.uploadFrequency = UploadFrequency.FREQUENT;
// Optional: Send smaller batches of data
config.batchSize = BatchSize.SMALL;
// Optional: Enable debug logging
config.verbosity = SdkVerbosity.DEBUG;

// Add this function as onInitialization prop to DatadogProvider
const onSDKInitialized = async () => {
  await SessionReplay.enable({
     replaySampleRate: 100,
     textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS,
     imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE,
     touchPrivacyLevel: TouchPrivacyLevel.SHOW,
  });
};

// HELLO WORLD APPLICATION TEMPLATE
export default function HelloWorldApp() {
  return (
    <DatadogProvider configuration={config} onInitialization={onSDKInitialized}>
      <WebView
        source={{ uri: 'https://qtf323f68ea6cda4536b92e94395.free.beeceptor.com/' }}
        allowedHosts={['qtf323f68ea6cda4536b92e94395.free.beeceptor.com']}
      />
    </DatadogProvider>
  );
}

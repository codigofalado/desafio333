import React from 'react';
import { useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

function SocialScreen() {
  const route = useRoute()
  const socialMedia = route.params.socialMedia 

  return (
    <WebView style={{ flex: 1 }} source={{uri: socialMedia}} />
  )
}

export default SocialScreen;

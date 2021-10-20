import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { getVideoCallAsync, setVideoCallAsync } from '../stores/actions/videoCallAction'

export default function PlaceWebView({ route }) {
  const { url } = route.params   
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: '100%', bottom: '5%'}}>
                <WebView
                    source={{uri: url}}
                    onLoad={console.log('Loading')}
                    style={{flex: 1}}
                    mediaPlaybackRequiresUserAction={false}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    startInLoadingState={true}
                    allowUniversalAccessFromFileURLs={true}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})
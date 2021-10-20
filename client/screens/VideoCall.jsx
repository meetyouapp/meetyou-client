import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { setVideoCallAsync } from '../stores/actions/videoCallAction'

const webb = 'https://meetyou.daily.co/meetyou122'

export default function VideoCall({ route }) {
    const [videoCall, setVideoCall] = useState()

    const dispatch = useDispatch(state => state.videoCallState.videoCall)

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: '100%'}}>
                <WebView
                    source={{uri: webb}}
                    onLoad={console.log('Loading')}
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
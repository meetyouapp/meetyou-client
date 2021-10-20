import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { getVideoCallAsync, setVideoCallAsync } from '../stores/actions/videoCallAction'

const webb = 'https://meetyou.daily.co/meetyou122'

export default function VideoCall({ route }) {
    const roomVideo = route.params.roomVideo
    console.log(roomVideo, "==di video call")
    const dispatch = useDispatch()
    const {videoCall} = useSelector(state => state.videoCallState)
    const payload = {name: roomVideo.toString()}
    const {error} = useSelector(state => state.videoCallState)

    useEffect (() => {
        dispatch(getVideoCallAsync(payload))
        // if(videoCall?.url !== `https://meetyou.daily.co/${roomVideo}` && error) {
        //     dispatch(setVideoCallAsync(payload))
        // }

    }, [])

    console.log(videoCall, "=====di videocall=======")
    
      
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: '100%'}}>
                <WebView
                    source={{uri: videoCall?.url}}
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
import { SET_VIDEO_CALL, SET_LOADING_VIDEO_CALL } from '../actionType'
import { instance } from "../../apis/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function setVideoCall(videoCall) {
    return {
        type: SET_VIDEO_CALL,
        payload: videoCall,
    }
}

export function setLoadingVideoCall(isLoading) {
    return {
        type: SET_LOADING_VIDEO_CALL,
        payload: isLoading,
    }
}

export function setVideoCallAsync(payload) {
    return async function (dispatch) {
        dispatch(setLoadingVideoCall(true))
        try {
            const response = await instance({
                method: "POST",
                url: "/videoCall",
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                },
                data: payload
            })
            const data = response.data;
            console.log(data, "=============")
            dispatch(setVideoCall(data))
            dispatch(setLoadingVideoCall(false))
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}
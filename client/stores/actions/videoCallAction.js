import { SET_VIDEO_CALL, SET_LOADING_VIDEO_CALL, GET_VIDEO_CALL, SET_ERROR_VIDEO_CALL } from '../actionType'
import { instance } from "../../apis/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function setVideoCall(videoCall) {
    return {
        type: SET_VIDEO_CALL,
        payload: videoCall,
    }
}

export function getVideoCall(videoCall) {
    return {
        type: GET_VIDEO_CALL,
        payload: videoCall,
    }
}

export function setLoadingVideoCall(isLoading) {
    return {
        type: SET_LOADING_VIDEO_CALL,
        payload: isLoading,
    }
}

export function setErrorVideoCall(errors) {
    return {
        type: SET_ERROR_VIDEO_CALL,
        payload: errors
    }
}

export function setVideoCallAsync(payload) {
    console.log(payload, "++++++")
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
            dispatch(setErrorVideoCall(error))
            console.log(error.response.data.message, "======set===")
        }
    }
}

export function getVideoCallAsync (payload) {
    return async function (dispatch) {
        dispatch(setLoadingVideoCall(true))
        try {
            const response = await instance({
                method: "GET",
                url: `/videoCall/${payload.name}`,
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                }
            })
            const data = response.data;
            console.log(data, "======+get+=======")
            dispatch(getVideoCall(data))
            dispatch(setLoadingVideoCall(false))
        } catch (error) {
            dispatch(setErrorVideoCall(error))
            console.log(error.response.data.message, "======+get+=======")
        }
    }
}
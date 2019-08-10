import { GET_DATA_START, GET_DATA_SUCCESS } from "./types";

export const loadUserData=(data) => {
    console.log("datata",data)
    return {
        type: GET_DATA_SUCCESS,
        payload: data
    }
}
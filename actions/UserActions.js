import { GET_DATA_SUCCESS, RESET_STATE } from "./types";

export const loadUserData=(data) => {
    return {
        type: GET_DATA_SUCCESS,
        payload: data
    }
}
export const resetData=()=>{
    return{
        type:RESET_STATE
    }
}
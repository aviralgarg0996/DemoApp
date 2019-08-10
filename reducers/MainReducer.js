import { GET_DATA_START, GET_DATA_SUCCESS, RESET_STATE } from "../actions/types";

const InitialState={
    data:[],
    loading:false
}
export default function MainReducer(state = InitialState, action) {
    switch (action.type) {
        case GET_DATA_SUCCESS:
            return {
            ...state,
            loading:false,
            data:state.data.concat(action.payload)
            }
        case GET_DATA_START:
        return{
            ...state,
            loading:true
        }
        case RESET_STATE:
        return InitialState
    }
    return state;
}


const initialState = {
    currentUser: null,
}


export default function user(state=initialState, action) {
    return {
        ...state,
        currentUser: action.currentUser
    }
}

const initalState = {
    username: '',
    userId: 0
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export default function reducer (state = initalState, action) {
    let {type, payload} = action
    switch(type) {
        case UPDATE_USER:
            return {...state, username: payload.username, userId: payload.userId}
        case LOGOUT:
            return initalState
        default:
            return state
    }
}
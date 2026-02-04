import { getDefaultFilter } from "../../services/stay"
import { stayService } from "../../services/stay/stay.service.remote"

export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_STAY_MSG = 'ADD_STAY_MSG'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_ORDER = 'SET_ORDER'

const initialState = {
    stays: [],
    filterBy: getDefaultFilter(),
    stay: null,
    currentOrder: null
}

export function stayReducer(state = initialState, action) {
    let stays 
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }
        case SET_STAY:
            return { ...state, stay: action.stay }
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(s => s._id === action.stayId)
            stays = state.stays.filter(s => s._id !== action.stayId)
            return { ...state, stays, lastRemovedStay }
        case ADD_STAY:
            return { ...state, stays: [...state.stays, action.stay] }
        case UPDATE_STAY:
            stays = state.stays.map(s => (s._id === action.stay._id) ? action.stay : s)
            const isCurrentStay = state.stay?._id === action.stay._id
            return { 
                ...state, 
                stays, 
                stay: isCurrentStay ? action.stay : state.stay 
            }
        case ADD_STAY_MSG:
            if (action.msg && state.stay) {
                const updatedStay = { ...state.stay, msgs: [...(state.stay.msgs || []), action.msg] }
                return { ...state, stay: updatedStay }
            }
            return state 
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case SET_ORDER:
            return { ...state, currentOrder: action.order }
        default:
            return state
    }
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const stay1 = { _id: 'b101', type: 'Stay ' + parseInt('' + Math.random() * 10), capacity: 12, host: null, msgs: [] }
    const stay2 = { _id: 'b102', type: 'Stay ' + parseInt('' + Math.random() * 10), capacity: 13, host: null, msgs: [] }

    state = stayReducer(state, { type: SET_STAYS, stays: [stay1] })
    console.log('After SET_STAYS:', state)

    state = stayReducer(state, { type: ADD_STAY, stay: stay2 })
    console.log('After ADD_STAY:', state)

    state = stayReducer(state, { type: UPDATE_STAY, stay: { ...stay2, type: 'Good' } })
    console.log('After UPDATE_STAY:', state)

    state = stayReducer(state, { type: REMOVE_STAY, stayId: stay2._id })
    console.log('After REMOVE_STAY:', state)

    state = stayReducer(state, { type: SET_STAY, stay: stay1 })
    console.log('After SET_STAY:', state)

    const msg = { id: 'm' + parseInt('' + Math.random() * 100), txt: 'Some msg', by: { _id: 'u123', fullname: 'test' } }
    state = stayReducer(state, { type: ADD_STAY_MSG, stayId: stay1._id, msg })
    console.log('After ADD_STAY_MSG:', state)
}


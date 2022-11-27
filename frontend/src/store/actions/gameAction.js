import {ENTEREDREADYROOM , READYTOSTART , OUTROOM , WRONG , RIGHT } from '../actions/type';

export const enteredReadyRoom = data => {
    return {
        type:ENTEREDREADYROOM,
        payload:{...data}
    }
}

export const readyToStart = data => {
    return {
        type:READYTOSTART,
        payload:data
    }
}
export const outRoom = data => {
    return {
        type:OUTROOM,
        payload:data
    }
}
export const wrong = data => {
    return {
        type:WRONG,
        payload:data
    }
}
export const right = data => {
    return {
        type:RIGHT,
        payload:data
    }
}

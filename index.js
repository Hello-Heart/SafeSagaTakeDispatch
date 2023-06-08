import {
    takeEvery, call, put,race, delay
  } from 'redux-saga/effects';
export default createSafeDispatch = ({eventName, defaultTimeout = 500 }) => {
    const actionReadyName = `${eventName}-READY`
    /**
     * creates a a safe dispatch, 
     * either we wait for actionReadyName to be dispatched
     * or dipstahcing it if timeout has occoured
     */
    const safeDispatch = function* _(params) {
       //yield race[yield take(actionReadyName), yield delay(defaultTimeout)]
       yield take(actionReadyName)
       yield put(eventName(...params))
    }

    /**
     * creates a a safe Take, 
     * takes a callback to initialize, then let's the disptacher 
     * know he's ready
     */
    const safeTake = function* safeDispatch(callback = function* _(){}) {
        yield take(callback)
        yield put(actionReadyName)
     }

    return {safeTake, safeDispatch}
}
import {appReducer, InitialStateType, setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "./app-reducer";


let startState: InitialStateType

beforeEach(()=>{
    startState={
        error:null,
        status:'idle',
        isInitialized:false
    }
})

test('correct error message should be set',()=>{
    const endState = appReducer(startState,setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
})

test('correct status message should be set',()=>{
    const endState = appReducer(startState,setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})

test('correct initialized message should be set',()=>{
    const endState = appReducer(startState,setAppInitializedAC(true))

    expect(endState.isInitialized).toBe(true)
})
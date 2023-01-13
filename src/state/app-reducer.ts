

export type StatusType = 'idle'| 'loading'|'succeeded'|'failed'


export type InitialStateType ={
    status:StatusType ,
    error:string|null
}

export type ActionAppType =ReturnType<typeof setAppErrorAC>|
    ReturnType<typeof setAppStatusAC>

const initialState:InitialStateType={
    status:'idle',
    error:null
}

export const appReducer =(state=initialState,action:ActionAppType)=>{
    switch (action.type){
        case 'APP/SET-STATUS':
            return {...state,status:action.status}
        case 'APP/SET-ERROR':
            return{...state,error:action.error}
        default: return{...state}
    }
}

export const setAppErrorAC = (error:string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)
export const setAppStatusAC = (status:StatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
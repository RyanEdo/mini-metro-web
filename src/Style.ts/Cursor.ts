import { Mode } from "../DataStructure/Mode";

export const getCursor = (mode: Mode)=>{
    let cursor;
    //chrome has bug here, the cursor won't change while DOM already updated.
    if(!window.navigator.userAgent.includes('Firefox')){
        //so only firefox supported
        return 'default';
    }
    switch(mode){
        case Mode.MOVING:{
            cursor = 'grabbing';
            break;
        }
        default:{
            cursor = 'default';
            break;
        }
    }
    return cursor;
}
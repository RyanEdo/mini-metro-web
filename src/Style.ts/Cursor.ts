import { Mode } from "../DataStructure/Mode";

export const getCursor = (mode: Mode)=>{
    let cursor;
    //chrome has bug here, the cursor won't change sometimes while DOM already updated.
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
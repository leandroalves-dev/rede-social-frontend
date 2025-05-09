import { resetMessage } from "../slices/userSlice";
import { resetMessagePhoto } from "../slices/photoSlice";

export const useReserComponentMessage = (dispatch) => {
    return () => {
        setTimeout( () => {
            dispatch(resetMessage())
            dispatch(resetMessagePhoto())
        },2000)
    }
}


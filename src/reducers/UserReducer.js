import { ActionSheetIOS } from "react-native";

export const initalState = {
    avatar: '',
    favorites: [],
    appointments: [],
    perfil: []
};

export const UserReducer = (state, action) => {
    switch(Action.type){
        case 'setAvatar':
            return {...state, avatar: action.payload.avatar };
            default:
                return state;
    }
}
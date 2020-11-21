import { ActionSheetIOS } from "react-native";

export const initalState = {
    avatar: '',
    favorites: [],
    appointments: [],
    
    id:'',
    name:'',
    email:'',
    inspecoes: [],
    imagens: [],
};

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'setAvatar':
            //console.log(action.payload.id, action.payload.name, action.payload.email);
            return {...state, 
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                inspecoes: action.payload.inspecoes,
            };
        default:
            return state;
                
    }
}
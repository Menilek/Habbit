import uuid from 'uuid';
import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY } from '../actions/types';

const initialState = {
        entries : [
            { id: uuid(), name: "Plank"},
            { id: uuid(), name: "Journal"},
            { id: uuid(), name: "Walk"},
            { id: uuid(), name: "Meditate"}
        ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ENTRIES:
            return{
                ...state
            };
        case DELETE_ENTRY:
            return{
                ...state,
                entries : state.entries.filter( entries => entries.id !== action.payload)
            };
        case ADD_ENTRY:
            return{
                ...state,
                entries : [action.payload, ...state.entries]
            };
        default:
            return state;
    }
}
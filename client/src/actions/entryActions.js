import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY } from '../actions/types';

export const getEntries = () => {
    return {
        type: GET_ENTRIES
    };
};

export const deleteEntry = id => {
    return{
        type: DELETE_ENTRY,
        payload: id
    }
};

export const addEntry = entry => {
    return{
        type: ADD_ENTRY,
        payload: entry
    }
};
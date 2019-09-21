import axios from 'axios';
import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY, ENTRIES_LOADING } from '../actions/types';

export const getEntries = () => dispatch => {
    dispatch(setEntriesLoading());
    axios.get('/api/entries').then(res =>
        dispatch({
            type: GET_ENTRIES,
            payload: res.data
        })
    )
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

export const setEntriesLoading = () => {
    return{
        type: ENTRIES_LOADING
    };
};
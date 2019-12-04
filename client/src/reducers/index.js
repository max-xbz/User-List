let initState = { isFetching: false, 
                  data: [], 
                  error: null, 
                  display: {
                                page: 1, 
                                term: '', 
                                sort_by: 'createdAt', 
                                order: -1
                            }
                };
const users = (state = initState, action) => {
    switch(action.type){
        case 'START_FETCH':
            return {...state, isFetching: true};
        case 'FETCH_SUCCESS':
            return {...state, isFetching: false, data: action.data};
        case 'FETCH_FAIL':
            return {...state, error: action.error};
        case 'NEXT_PAGE':
            return {...state, display: {...state.display, page: action.page}};
        case 'PREV_PAGE':
            return {...state, display: {...state.display, page: action.page}};
        case 'REST_PAGE':
            return {...state, display: {...state.display, page: 1}};
        case 'USER_ADD':
            {
                const newData = [...state.data];
                newData.unshift(action.data);
                // console.log(action.data);
                return {...state, data: newData};
            }
        case 'SET_TERM':
            return {...state, display: {...state.display, term: action.data}};
        case 'CHANGE_HEADER':
            return {...state, display: {...state.display, sort_by: action.data}};
        case 'CHANGE_ORDER':
            return {...state, display: {...state.display, order: action.data}};
        default:
            return state;
    }
}

export default users;
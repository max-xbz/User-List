import axios from 'axios';
//fetch data
export const requestStart = () => {
    return {
        type: 'START_FETCH'
    };
}
export const requestSuccess = (res) => {
    return {
        type: 'FETCH_SUCCESS',
        data: res
    };
}
export const requestFail = (error) => {
    return {
        type: 'FETCH_FAIL',
        error: error
    };
}
export const getData = () => {
    return (dispatch, getState) => {
        const page = getState().display.page;
        const term = getState().display.term;
        const sort_by = getState().display.sort_by;
        const order = getState().display.order;
        dispatch(requestStart());
        axios.get(`http://localhost:8888/api/users?page=${page}&term=${term}&sort_by=${sort_by}&order=${order}`)
            .then((res) => {
                console.log("after http request from get all api");
                getState().error = null;
                if(res.data === 'Sorry no results') {
                    dispatch(requestFail(res.data));
                } else {
                    dispatch(requestSuccess(res.data));
                }
            })
            .catch((err) => {
                dispatch(requestFail(err));
            });
    };
}

//pagination
export const nextPage = (page) => {
    return {
        type: 'NEXT_PAGE',
        page: page + 1
    };
}
export const prevPage = (page) => {
    return {
        type: 'PREV_PAGE',
        page: page - 1
    };
}
export const getPrevPageData = (page) => {
    return (dispatch, getState) => {
        if(page > 1) {
            dispatch(prevPage(page));
            dispatch(getData());
        }
    }; 
}
export const getNextPageData = (page) => {
    return (dispatch, getState) => {
        if(getState().data.length === 7) {
            dispatch(nextPage(page));
            dispatch(getData());
        } 
    }; 
}
//create new
export const addUser = (user) => {
    return {
        type: 'USER_ADD',
        data: user
    };
}
export const createUser = (user, history) => {
    return (dispatch, getState) => {
        let { firstName, lastName, sex, age, password } = user;
        getState().display.sort_by = 'createdAt';
        getState().display.order = -1;
        axios.post('http://localhost:8888/api/users', {
                firstName: firstName.value, 
                lastName: lastName.value, 
                sex: sex.value, 
                age: age.value, 
                password: password.value
            })
            .then((res)=>{
                //res.data is the _id of saved user
                // let userData = { _id: res.data, firstName: user.firstName.value, lastName: user.lastName.value, sex: user.sex.value, age: user.age.value, password: user.password.value};
                // console.log('create new user');
                // console.log(userData);
                // dispatch(addUser(userData));
                history.goBack();
            })
            .catch((err)=>{
                console.log(err);
            });
    };
}

//delete user
// export const removeUser = () => {
//     return {
//         type: 'USER_REMOVE'
//     };
// }
export const deleteUser = (id) => {
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8888/api/users/${id}`)
            .then((res)=>{
                dispatch(getData());
            })
            .catch((err)=>{
                console.log(err);
            });
    };
}
//update user info
export const updateUser = (user, history) => {
    return (dispatch, getState) => {
        axios.put(`http://localhost:8888/api/users/${user._id}`, user)
            .then((res)=>{
                dispatch(getData());
            })
            .then(()=>{
                history.goBack();
            })
            .catch((err)=>{
                console.log(err);
            });
    };
}
//search key work
export const resetpage = () => {
    return {
        type: 'REST_PAGE'
    };
}
export const setTerm = (term) => {
    return {
        type: 'SET_TERM',
        data: term
    };
}
export const performSearch = (term) => {
    return (dispatch, getState) => {
        dispatch(resetpage());
        dispatch(setTerm(term));
        dispatch(getData());
    };
}
//sort by different header & order
export const changeHeader = (header) => {
    return {
        type: "CHANGE_HEADER",
        data: header
    };
}
export const changeOrder = (order) => {
    return {
        type: "CHANGE_ORDER",
        data: order
    };
}
export const sortByField = (header, order) => {
    return (dispatch, getState) => {
        dispatch(changeHeader(header));
        dispatch(changeOrder(order));
        dispatch(getData());
    };
}

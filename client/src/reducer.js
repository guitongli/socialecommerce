export default function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            friends: action.friends,
        };
        console.log(state);
        return state;
    }
    if (action.type == "GET_REQUESTS") {
        state = {
            ...state,
            requests: action.requests,
        };
        console.log(state);
        return state;
    }
    if (action.type == "ACCEPT_REQUEST" || action.type == "DELETE_RELATION") {
        state = {
            ...state,
            requests: state.requests.map((request) => {
                if (request.id == action.id) {
                    return {
                        ...request,
                        stage: action.stage,
                    };
                } else {
                    return request;
                }
            }),
        };
        console.log(state);
        return state;
    }
}

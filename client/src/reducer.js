export default function Reducer(state = {}, action) {
    console.log('reducer running');
    if (action.type == "GET_RELATIONS") {
        state = {
            ...state,
            relations: action.relations,
        };
        console.log('updated relations', state);
        return state;
    }
     
    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            relations: state.relations.map((relation) => {
                if (relation.id == action.hisId) {
                    console.log('found the right one');
                    return {
                        ...relation,
                        accepted: true,
                    };
                } else {
                    
                    return relation;
                }
            }),
        };
    }
    if (action.type == "DELETE_RELATION") {
        state = {
            ...state,
            relations: state.relations.map((relation) => {
                if (relation.id == action.hisId) {
                    console.log('found the right one');
                    return {
                        ...relation,
                        accepted: 'deleted',
                    };
                } else {
                    
                    return relation;
                }
            }),
        };
    }
    console.log(state);
    return state;
}

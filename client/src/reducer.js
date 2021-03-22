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
    if (action.type == "UPDATE_ITEM_PIC") {
        state = {
            ...state,
            pic_file: action.file,
        };
        console.log('updated item pic in state', state);
        return state;
    } 
    if (action.type == "UPDATE_PIC_LINK") {
        state = {
            ...state,
            pic_link: action.pic,
        };
        return state;
    } 
    if (action.type == "UPDATE_ITEM_INFO") {
        state = {
            ...state,
            [action.property]: action.value,
        };
        console.log(state.item_price);
        return state;
    } 
  
    if (action.type == "GET_MY_ITEMS") {
        state = {
            ...state,
            my_items: action.my_items,
        };
        console.log(state.item_price);
        return state;
    } 
    if (action.type == "GET_ITEM_INFO") {
        state = {
            ...state,
            current_item_info: action.current_item_info,
        };
       
        return state;
    } 
    if (action.type == "COUNT_LIKE") {
        state = {
            ...state,
            [action.current_item_id]: action.current_like_count,
        };
       
        return state;
    } 
   
    console.log(state);
    return state; 
}


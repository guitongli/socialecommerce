export default function Reducer(state = {}, action) {
    if (action.type == "GET_RELATIONS") {
        state = {
            ...state,
            relations: action.relations,
        };
        console.log("updated relations", state);
        return state;
    }

    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            relations: state.relations.map((relation) => {
                if (relation.user_id == action.hisId) {
                    console.log("found the right one");
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
                if (relation.user_id == action.hisId) {
                    console.log("found the right one");
                    return {
                        ...relation,
                        accepted: "deleted",
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
        console.log("updated item pic in state", state);
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

        return state;
    }
    if (action.type == "GET_HIS_ITEMS") {
        state = {
            ...state,
            his_items: action.his_items,
        };

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
    if (action.type == "CHATMESSAGES") {
        state = {
            ...state,
            chat_messages: action.msgs,
        };

        return state;
    }
    if (action.type == "CHATMESSAGE") {
        state = {
            ...state,
            chat_messages: [...state.chat_messages, action.msg],
        };

        return state;
    }
    if (action.type == "PRIVATE_MESSAGES") {
        console.log("private putin state", action.msgs);
        state = {
            ...state,
            private_messages: action.msgs,
        };

        return state;
    }
    if (action.type == "PRIVATE_MESSAGE") {
        state = {
            ...state,
            private_messages: [...state.private_messages, action.msg],
        };

        return state;
    }
    if (action.type == "GET_UPDATES") {
        state = {
            ...state,
            updates: action.updates,
        };

        return state;
    }
    if (action.type == "NOTIFY_MESSAGE") {
        state = {
            ...state,
            new_message: action.user,
        };

        return state;
    }
    if (action.type == "NOTIFY_REQUEST") {
        state = {
            ...state,
            new_request: action.user,
        };

        return state;
    }
    console.log(state);
    return state;
}

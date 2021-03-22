import axios from "axios";

export async function getRelations() {
    const { data } = await axios.get("/friends/getrelations");
    console.log("got relations", data);
    return {
        type: "GET_RELATIONS",
        relations: data.relations,
    };
}

export async function acceptRequest(hisId) {
    await axios.get(`/friend/accept/${hisId}`);
    return {
        type: "ACCEPT_REQUEST",

        hisId,
    };
}

export async function deleteRelation(hisId) {
    await axios.get(`/friend/break/${hisId}`);
    return {
        type: "DELETE_RELATION",

        hisId,
    };
}

export function updateItemPic(file){
     return {
        type: "UPDATE_ITEM_PIC",

        file
    };
}

export function updatePicLink(pic){
     return {
        type: "UPLOAD_PIC_LINK",

        pic
    };
}
export function updateItemInfo(property, value) {
    
    return {
        type: "UPDATE_ITEM_INFO",

        property,
        value
    };
}

export async function getMyItems() {
    const {data}= await axios.get('/items/myitems');
    return {
        type: "GET_MY_ITEMS",

        my_items:data.my_items
    };
}

 

export function updateClickedItem(item_id) {
    
    return {
        type: "UPDATE_CLICKED_ITEM",

        item_id
    };
}

export async function getItemInfo(currentItemId) {
    const {data} = await axios.get(`/item/${currentItemId}`)
    return {
        type: "GET_ITEM_INFO",

        current_item_info: data.current_item[0]
    };
}
export async function countLikes(current_item_id) {
    const {data} = await axios.get(`/like/${current_item_id}`)
    return {
        type: "COUNT_LIKE",

        current_like_count: data.count_like,
        current_item_id
    };
}
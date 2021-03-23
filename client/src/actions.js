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

export function updateItemPic(file) {
    return {
        type: "UPDATE_ITEM_PIC",

        file,
    };
}

export function updatePicLink(pic) {
    return {
        type: "UPLOAD_PIC_LINK",

        pic,
    };
}
export function updateItemInfo(property, value) {
    return {
        type: "UPDATE_ITEM_INFO",

        property,
        value,
    };
}

export async function getMyItems() {
    const { data } = await axios.get("/items/myitems");
    return {
        type: "GET_MY_ITEMS",

        my_items: data.my_items,
    };
}
export async function getHisItems(hisId) {
    const { data } = await axios.get(`/items/hisitems/${hisId}`);
    return {
        type: "GET_HIS_ITEMS",

        his_items: data.his_items,
    };
}


export function updateClickedItem(item_id) {
    return {
        type: "UPDATE_CLICKED_ITEM",

        item_id,
    };
}

export async function getItemInfo(currentItemId) {
    const { data } = await axios.get(`/item/${currentItemId}`);
    return {
        type: "GET_ITEM_INFO",

        current_item_info: data.current_item[0],
    };
}
export async function countLikes(current_item_id) {
    const { data } = await axios.get(`/like/${current_item_id}`);
    return {
        type: "COUNT_LIKE",

        current_like_count: data.count_like,
        current_item_id,
    };
}
export function chatMessages(msgs) {
    return {
        type: "CHATMESSAGES",

        msgs,
    };
}
export function chatMessage(msg) {
    return {
        type: "CHATMESSAGE",

        msg,
    };
}

export async function getUpdates() {
    const { data } = await axios.get(`/items/updates`);
    console.log('served updates', data)
    return {
        type: "GET_UPDATES",

        updates: data.updates,
    };
}

export function privateMessages(msgs) {
    return {
        type: "PRIVATE_MESSAGES",

        msgs,
    };
}
export function privateMessage(msg) {
    return {
        type: "PRIVATE_MESSAGE",

        msg,
    };
}
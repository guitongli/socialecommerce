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

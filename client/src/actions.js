import axios from 'axios';

export async function getFriends (){
    const {data}  = await axios.get('/friends/getfriends');

    return {
        type:"GET_FRIENDS",
        friends: data.friends
    };
}
export async function getRequests (){
    const {data} = await axios.get('friends/getrequests');
    return {
        type:"GET_REQUESTS",
        requests: data.requests
    };
}


export async function acceptRequest (hisId){
    const {data} = await axios.get(`/friend/accept/${hisId}`);
    return {
        type:"ACCEPT_REQUEST",
        stage: data.stage,
        id:hisId
    };
}

export async function deleteRelation (hisId){
    const {data} = await axios.get(`/friend/break/${hisId}`);
    return {
        type:"DELETE_RELATION",
        stage:data.stage,
        id:hisId
    };
}

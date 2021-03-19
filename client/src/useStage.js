import axios from "./axios";
import { useState } from "react";

export function useStage() {
    const [stage, setStage] = useState(null);

    const getStage = (hisId) => {
        if (stage == null) {
            console.log("fetching stage", hisId);
            axios
                .get(`/friend/check/${hisId}`)
                .then(({ data }) => {
                    setStage(data.stage);
                })
                .catch((err) => console.log(err));
        } else if (stage == "add") {
             
            axios
                .get(`/friend/make/${hisId}`)
                .then(({ data }) => {
                    setStage(data.stage);
                })
                .catch((err) => console.log(err));
        } else if (stage == "accept request") {
            axios
                .get(`/friend/accept/${hisId}`)
                .then(({ data }) => setStage(data.stage));
        } else if (stage == 'friend'){
            axios.get(`/friend/break/${hisId}`).then(({ data }) => setStage(data.stage));
        } else if (stage == 'pending'){
            axios.get(`/friend/break/${hisId}`).then(({ data }) => setStage(data.stage));
        }
    };
    return [stage, getStage];
}

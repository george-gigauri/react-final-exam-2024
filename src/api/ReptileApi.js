import Const from "../util/Const";
import UserUtil from "../util/UserUtil";

class ReptileApi {

    static async fetchReptiles(onSuccess, onError) {
        fetch(Const.SERVER_BASE_URL + `/reptiles`)
            .then((res) => res.json())
            .then((json) => onSuccess(json))
            .catch((err) => onError(err));
    }

    static async fetchReptile(id, onSuccess, onError) {
        fetch(Const.SERVER_BASE_URL + "/reptiles/" + id)
            .then((res) => res.json())
            .then((json) => onSuccess(json))
            .catch((err) => onError(err));
    }

    static async createReptile(
        {
            name,
            scientificName,
            description,
            imageUrl,
            isEndangered,
            isVenomous,
            type
        },
        onSuccess, onFailure
    ) {
        let r = await fetch(Const.SERVER_BASE_URL + "/reptiles/create-new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${UserUtil.getCurrentToken()}`
            },
            body: JSON.stringify({
                name: name,
                scientificName: scientificName,
                description: description,
                imageUrl: imageUrl,
                isEndangered: isEndangered,
                isVenomous: isVenomous,
                type: type
            })
        });

        let json = await r.json();
        if (r.ok) {
            onSuccess(json);
        } else {
            onFailure(json.error);
        }
    }

    static async deleteById(id, onSuccess, onFailure) {
        let r = await fetch(`${Const.SERVER_BASE_URL}/reptiles/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${UserUtil.getCurrentToken()}`
            }
        });

        let json = await r.json();
        if (r.ok) {
            onSuccess(json);
        } else {
            onFailure(json.error);
        }
    }
}

export default ReptileApi;
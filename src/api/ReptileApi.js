import Const from "../util/Const";

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
        fetch(Const.SERVER_BASE_URL + "/add", {
            method: "POST",
            body: {
                name: name,
                scientificName: scientificName,
                description: description,
                imageUrl: imageUrl,
                isEndangered: isEndangered,
                isVenomous: isVenomous,
                type: type
            }
        }).then((res) => {
            let json = res.json();
            if (res.ok) {
                onSuccess(json);
            } else {
                onFailure(json.error);
            }
        }).catch((err) => { onFailure("შეცდომა"); })
    }
}

export default ReptileApi;
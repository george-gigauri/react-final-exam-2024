
class ReptileApi {

    static BASE_URL = "http://localhost:8000"

    static async fetchReptiles(onSuccess, onError) {
        fetch(this.BASE_URL + "/reptiles")
            .then((res) => res.json())
            .then((json) => onSuccess(json))
            .catch((err) => onError(err));
    }

    static async fetchReptile(id, onSuccess, onError) {
        fetch(this.BASE_URL + "/reptiles/" + id)
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
        }
    ) {
        fetch(this.BASE_URL + "/add", {
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
        }).then((res) => res.json())
            .then((json) => { })
            .catch((err) => { })
    }
}

export default ReptileApi;
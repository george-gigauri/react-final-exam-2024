const fetch = require('cross-fetch');
const Const = require('../../src/util/Const');

class ReptileService {

    static async getReptiles({
        page, pageSize,
        filters, sortBy
    }, onSuccess, onError) {

        if (page < 0) {
            page = 0;
        }

        let r = await fetch(`${Const.SERVER_BASE_URL}/reptiles`)
        let data = await r.json();
        if (r.ok) {
            const tempList = data.filter(i => (
                ((this.parseBoolean(filters.venomousOnly) === true) ? (i.isVenomous === this.parseBoolean(filters.venomousOnly)) : true) &&
                ((this.parseBoolean(filters.endangeredOnly) == true) ? (i.isEndangered == this.parseBoolean(filters.endangeredOnly)) : true) &&
                ((filters.reptileType !== "ALL") ? (i.type === filters.reptileType) : true)
            )).sort((i, j) => (() => {
                if (sortBy?.isVenomous != null && sortBy?.isVenomous != "null") {
                    return (sortBy?.isVenomous === "ASC" ? (i.isVenomous - j.isVenomous) : (j.isVenomous - i.isVenomous));
                } else if (sortBy?.isEndangered != null && sortBy?.isEndangered != "null") {
                    return (sortBy?.isEndangered === "ASC" ? (i.isEndangered - j.isEndangered) : (j.isEndangered - i.isEndangered));
                } else if (sortBy?.type != null && sortBy?.type != "null") {
                    return (() => {
                        const typeComparison = i.type.localeCompare(j.type);
                        return sortBy?.type === "ASC" ? typeComparison : -typeComparison;
                    })();
                } else {
                    return i.id - j.id;
                }
            }
            )());

            const startIndex = parseInt(page) * parseInt(pageSize);
            const endIndex = parseInt(startIndex) + parseInt(pageSize);
            const pageCount = Math.ceil(tempList.length / pageSize);
            const displayedData = tempList.slice(startIndex, endIndex);

            return onSuccess({ data: displayedData, page: parseInt(page), pageCount: pageCount });
        } else {
            return onError(r.status, "შეცდომა");
        }
    }

    static async create(
        { name, scientificName, description, imageUrl, isVenomous, isEndangered, type },
        onSuccess, onError
    ) {
        let r = await fetch(`${Const.SERVER_BASE_URL}/reptiles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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

        let rJson = await r.json();
        if (r.ok) {
            if (rJson.scientificName === scientificName) {
                return onSuccess(rJson);
            } else {
                return onError(500, "მოხდა გაუთვალისწინებელი შეცდომა");
            }
        } else {
            return onError(500, "სერვერის შეცდომა");
        }
    }

    static async deleteById(id, onSuccess, onError) {
        let reptilesRes = await fetch(
            `${Const.SERVER_BASE_URL}/reptiles/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!reptilesRes.ok) {
            if (reptilesRes.status === 404) {
                return onError(404, "ჩანაწერი ამ იდენტიფიკატორით ვერ მოიძებნა");
            } else {
                return onError(500, "სერვერის შეცდომა");
            }
        } else {
            return onSuccess();
        }
    }

    static parseBoolean(str) {
        if (str === "true") {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = ReptileService;
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=035f607e3c21f15b43d9d737000df9fd';

    getResources = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResources(`${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;
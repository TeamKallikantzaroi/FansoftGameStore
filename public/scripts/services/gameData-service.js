import { requester } from 'requester';

class GameDataService {
    constructor(requester) {
        this.requester = requester;
        this.URL = 'https://data.42matters.com/api/v2.0/android/apps/top_google_charts.json?access_token=7ccec494b147f0c3609c9ed89dbb283b49e4b021&cat_key=GAME';
    }

    androidGames() {
        return this.requester.getJSON(this.URL);
    }
}

const gameDataService = new GameDataService(requester);
export { gameDataService };
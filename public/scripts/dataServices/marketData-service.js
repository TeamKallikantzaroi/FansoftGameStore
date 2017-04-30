import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

class MarketDataService extends DataService {
    constructor(requester, validator) {
        super(requester, validator);

        this.GAMES_DOMAIN = 'https://data.42matters.com';
        this.ACCESS_TOKEN = '7ccec494b147f0c3609c9ed89dbb283b49e4b021';

        this.ANDROID_RESOURCES = '/api/v2.0/android/apps/top_google_charts.json';
        this.ANDROID_QUERY = `?access_token=${this.ACCESS_TOKEN}&cat_key=GAME&limit=18&page=`;

        this.iOS_RESOURCES = '/api/v2.0/ios/apps/top_appstore_charts.json';
        this.iOS_QUERY = `?access_token=${this.ACCESS_TOKEN}&primaryGenreId=6014&limit=24&page=`;
    }

    androidGames(page) {
        return this.requester.getJSON(this.GAMES_DOMAIN + this.ANDROID_RESOURCES + this.ANDROID_QUERY + page);
    }

    iOSGames(page) {
        return this.requester.getJSON(this.GAMES_DOMAIN + this.iOS_RESOURCES + this.iOS_QUERY + page);
    }
}

const marketDataService = new MarketDataService(requester, validator);
export { marketDataService };
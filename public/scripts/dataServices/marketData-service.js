import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

class MarketDataService extends DataService {
    constructor(requester, validator) {
        super(requester, validator);

        this.DOMAIN = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

        this.GAMES_RESOURCE = '/games/';

        this.ACCESS_TOKEN_NAME = 'X-Mashape-Key';
        this.ACCESS_TOKEN = '7iXPtqDglVmshogWh4DMVsY8vhXVp1eDka9jsnnHku669QzpZ3';

        this.QUERY = '?fields=name,cover,popularity,summary&limit=18&offset=';
    }

    games(page) {
        return this.requester.getJSON(
            this.DOMAIN + this.GAMES_RESOURCE + this.QUERY + page, {
                [this.ACCESS_TOKEN_NAME]: this.ACCESS_TOKEN
            }
        );
    }
}

const marketDataService = new MarketDataService(requester, validator);
export { marketDataService };
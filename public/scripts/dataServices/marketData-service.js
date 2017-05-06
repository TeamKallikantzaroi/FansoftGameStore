import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

class MarketDataService extends DataService {
    constructor(requester, validator) {
        super(requester, validator);

        this.ACCESS_TOKEN_NAME = 'X-Mashape-Key';
        this.ACCESS_TOKEN = '7iXPtqDglVmshogWh4DMVsY8vhXVp1eDka9jsnnHku669QzpZ3';

        this.DOMAIN = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

        this.GAMES_RESOURCE = '/games/';

        this.USER_QUERY = '?fields=name,cover,summary';
        this.MARKET_QUERY = '?fields=name,cover,popularity&limit=18&offset=';

        this.SEARCH = '';
    }

    getGames(context) {
        const page = context.params.page,
            search = context.params.search;

        if (search) {
            this.SEARCH = `&search=${search}`;
        } else {
            this.SEARCH = '';
        }

        return this.requester.getJSON(
            this.DOMAIN + this.GAMES_RESOURCE + this.MARKET_QUERY + page + this.SEARCH, {
                [this.ACCESS_TOKEN_NAME]: this.ACCESS_TOKEN
            }
        );
    }

    getGameInfo(gameElement) {
        const id = $(gameElement)
            .attr('id'),

            name = $(gameElement)
            .find('.list-title')
            .html(),

            img = $(gameElement)
            .children('.img-game')
            .attr('src'),

            gameInfo = {
                id,
                name,
                img
            };

        return gameInfo;
    }

    getUserGames(gameIDs) {
        const games = gameIDs.map(id => {
            return this.requester.getJSON(
                this.DOMAIN + this.GAMES_RESOURCE + id + this.USER_QUERY, {
                    [this.ACCESS_TOKEN_NAME]: this.ACCESS_TOKEN
                }
            );
        });

        return Promise.all(games);
    }
}

const marketDataService = new MarketDataService(requester, validator);
export { marketDataService };
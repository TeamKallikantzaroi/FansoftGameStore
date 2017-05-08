import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

class MarketDataService extends DataService {
    constructor(requester, validator) {
        super(requester, validator);

        this.SUCCESSFULL_DOWNLOAD_ALLERT_TITLE = "Downloaded!";
        this.SUCCESSFULL_DOWNLOAD_ALLERT_MESSAGE = "The game is in your profile and ready to play!";

        this.INVALID_DOWNLOAD_ALLERT_TITLE = "Already downloaded";
        this.INVALID_DOWNLOAD_ALLERT_MESSAGE = "You alredy have this game!";

        this.CANCELLED_DOWNLOAD_ALLERT_TITLE = "Cancelled";
        this.CANCELLED_DOWNLOAD_ALLERT_MESSAGE = "Eh, maybe next time :)";

        this.MARKET_PAGINATOR_SIZE = 7;
        this.MARKET_PAGES_COUNT = 20;

        this.ACCESS_TOKEN_NAME = 'X-Mashape-Key';
        this.ACCESS_TOKEN = '7iXPtqDglVmshogWh4DMVsY8vhXVp1eDka9jsnnHku669QzpZ3';

        this.MARKET_DOMAIN = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

        this.GAMES_RESOURCE = '/games/';
        this.MARKET_QUERY = '?fields=name,cover,popularity&limit=18&offset=';

        this.SEARCH = '';
    }

    getMarketGames(context) {
        const page = context.params.page,
            search = context.params.search;

        if (search) {
            this.SEARCH = `&search=${search}`;
        } else {
            this.SEARCH = '';
        }

        return this.requester.getJSON(
            this.MARKET_DOMAIN + this.GAMES_RESOURCE + this.MARKET_QUERY + page + this.SEARCH, {
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

        return Promise.resolve(gameInfo);
    }

    getSearchQuery() {
        return $('#searchbar').val();
    }
}

const marketDataService = new MarketDataService(requester, validator);
export { marketDataService };
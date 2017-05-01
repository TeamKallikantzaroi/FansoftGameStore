import { Controller } from 'controller';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

class MarketController extends Controller {
    constructor(marketDataService, templateLoader, notificator, validator, utils) {
        super(marketDataService, templateLoader, notificator, validator, utils);

        this.utils = utils;
        this.PAGINATOR_SIZE = 7;
        this.PAGES_COUNT = 50;
    }

    getGames(context) {
        Promise.all([
                this.dataService.getGames(context),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('game'),
                this.utils.showProgressbar()
            ])
            .then(([games, marketTemplate, gameTemplate]) => this.fillMarket(games, marketTemplate, gameTemplate, context))
            .then(() => this.utils.hideProgressbar());
    }

    fillMarket(games, marketTemplate, gameTemplate, context) {
        gameTemplate = Handlebars.compile(gameTemplate);
        const gameData = gameTemplate(games);

        marketTemplate = Handlebars.compile(marketTemplate);
        const page = context.params.page,
            search = context.params.search,

            marketData = marketTemplate({
                currentPage: Number(page),
                pagesCount: this.PAGES_COUNT,
                paginatorSize: this.PAGINATOR_SIZE,
                search
            });

        $('#content').html(marketData);
        $('#market').html(gameData);

        $('#search').on('click', () => this.searchGames(context));
    }

    searchGames(context) {
        const searchResult = $('#searchbar').val();
        context.redirect(`#/games?search=${searchResult}&page=1`);
    }
}

const marketController = new MarketController(marketDataService, templateLoader, notificator, validator, utils);
export { marketController };
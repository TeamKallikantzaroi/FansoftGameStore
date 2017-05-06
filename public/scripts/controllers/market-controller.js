import { Controller } from 'controller';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';

import { utils } from 'utils';
import { userDataService } from 'userData-service'; // find a way to not use this

class MarketController extends Controller {
    constructor(marketDataService, templateLoader, notificator, validator, utils) {
        super(marketDataService, templateLoader, notificator, validator, utils);

        this.utils = utils;

        this.PAGINATOR_SIZE = 7;
        this.PAGES_COUNT = 20;
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

        const page = context.params.page,
            search = context.params.search;

        marketTemplate = Handlebars.compile(marketTemplate);
        const marketData = marketTemplate({
            currentPage: Number(page),
            pagesCount: this.PAGES_COUNT,
            paginatorSize: this.PAGINATOR_SIZE,
            search
        });

        $('#content').html(marketData);
        $('#market').html(gameData);

        $('#search').on('click', () => this.searchGames(context));
        $('#market').on('click', '.game-container', (event) => this.downloadGame(event));

    }

    searchGames(context) {
        const searchResult = $('#searchbar').val();
        context.redirect(`#/games?search=${searchResult}&page=1`);
    }

    downloadGame(event) {
        const { id, name, img } = this.dataService.getGameInfo(event.currentTarget);

        this.notificator.showDownloadSuggestion(id, name, img, userDataService.isLoggedUser(), userDataService.downloadGame);
    }
}

const marketController = new MarketController(marketDataService, templateLoader, notificator, validator, utils);
export { marketController };
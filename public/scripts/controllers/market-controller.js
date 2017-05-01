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
    }

    androidGames(context) {
        Promise.all([
                this.dataService.androidGames(context.params.page),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('android'),
                this.utils.showProgressbar()
            ])
            .then(([games, marketTemplate, gameTemplate]) => this.fillMarket('android', games, marketTemplate, gameTemplate))
            .then(() => this.utils.hideProgressbar());
    }

    iOSGames(context) {
        Promise.all([
                this.dataService.iOSGames(context.params.page),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('iOS'),
                this.utils.showProgressbar()
            ])
            .then(([games, marketTemplate, gameTemplate]) => this.fillMarket('iOS', games, marketTemplate, gameTemplate));

    }

    fillMarket(gameOS, games, marketTemplate, gameTemplate) {
        const currentPage = games.page,
            pagesCount = games.num_pages;

        gameTemplate = Handlebars.compile(gameTemplate);
        const gameData = gameTemplate(games);

        marketTemplate = Handlebars.compile(marketTemplate);
        const marketData = marketTemplate({
            gameOS,
            currentPage,
            pagesCount,
            paginatorSize: this.PAGINATOR_SIZE
        });

        $('#content').html(marketData);
        $('#market').html(gameData);
    }
}

const marketController = new MarketController(marketDataService, templateLoader, notificator, validator, utils);
export { marketController };
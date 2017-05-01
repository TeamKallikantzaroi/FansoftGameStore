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

    games(context) {
        const page = context.params.page;

        Promise.all([
                this.dataService.games(page),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('game'),
                this.utils.showProgressbar()
            ])
            .then(([games, marketTemplate, gameTemplate]) => this.fillMarket(games, marketTemplate, gameTemplate, page))
            .then(() => this.utils.hideProgressbar());
    }

    fillMarket(games, marketTemplate, gameTemplate, page) {
        gameTemplate = Handlebars.compile(gameTemplate);
        const gameData = gameTemplate(games);

        marketTemplate = Handlebars.compile(marketTemplate);
        const marketData = marketTemplate({
            currentPage: Number(page),
            pagesCount: this.PAGES_COUNT,
            paginatorSize: this.PAGINATOR_SIZE
        });

        $('#content').html(marketData);
        $('#market').html(gameData);
    }
}

const marketController = new MarketController(marketDataService, templateLoader, notificator, validator, utils);
export { marketController };
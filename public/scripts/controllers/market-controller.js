import { Controller } from 'controller';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';

class MarketController extends Controller {
    constructor(marketDataService, templateLoader, notificator, validator) {
        super(marketDataService, templateLoader, notificator, validator);

        this.PAGINATOR_SIZE = 7;
    }

    androidGames(context) {
        Promise.all([
                this.dataService.androidGames(context.params.page),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('android')
            ])
            .then(([games, marketTemplate, gameTemplate]) => this.fillMarket('android', games, marketTemplate, gameTemplate));
    }

    iOSGames(context) {
        Promise.all([
                this.dataService.iOSGames(context.params.page),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('iOS')
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

const marketController = new MarketController(marketDataService, templateLoader, notificator, validator);
export { marketController };
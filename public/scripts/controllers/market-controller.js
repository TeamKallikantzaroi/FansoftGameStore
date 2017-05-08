import { Controller } from 'controller';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

import { userDataService } from 'userData-service';
import { userProfileService } from 'userProfile-service';

class MarketController extends Controller {
    constructor(marketDataService, templateLoader, notificator, validator, utils) {
        super(marketDataService, templateLoader, notificator, validator, utils);
    }

    getMarketInfo(context) {
        Promise.all([
                this.dataService.getMarketGames(context),
                this.templateLoader.loadTemplate('market'),
                this.templateLoader.loadTemplate('marketGame'),
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
            pagesCount: this.dataService.MARKET_PAGES_COUNT,
            paginatorSize: this.dataService.MARKET_PAGINATOR_SIZE,
            search
        });

        $('#content').html(marketData);
        $('#market').html(gameData);

        $('#search').on('click', () => this.searchGames(context));
        $('#market').on('click', '.game-container', (event) => this.downloadGame(event));
    }

    searchGames(context) {
        const searchQuery = this.dataService.getSearchQuery();
        context.redirect(`#/games?search=${searchQuery}&page=1`);
    }

    downloadGame(event) {
        this.dataService.getGameInfo(event.currentTarget)
            .then(({ id, name, img }) => this.notificator.showDownloadSuggestion(id, name, img))
            .then((id) => {
                if (userDataService.isLoggedUser()) {
                    userProfileService.downloadGame(id)
                        .then(() => this.notificator.showSuccessAlert(
                            this.dataService.SUCCESSFULL_DOWNLOAD_ALLERT_TITLE,
                            this.dataService.SUCCESSFULL_DOWNLOAD_ALLERT_MESSAGE
                        ))
                        .catch(() => this.notificator.showWarningAlert(
                            this.dataService.INVALID_DOWNLOAD_ALLERT_TITLE,
                            this.dataService.INVALID_DOWNLOAD_ALLERT_MESSAGE
                        ));
                } else {
                    this.notificator.showLoginSuggestion();
                }
            })
            .catch(() => this.notificator.showErrorAlert(
                this.dataService.CANCELLED_DOWNLOAD_ALLERT_TITLE,
                this.dataService.CANCELLED_DOWNLOAD_ALLERT_MESSAGE
            ));
    }
}

const marketController = new MarketController(marketDataService, templateLoader, notificator, validator, utils);
export { marketController };
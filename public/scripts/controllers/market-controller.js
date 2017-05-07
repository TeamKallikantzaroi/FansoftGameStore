import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';


class MarketController extends Controller {
    constructor(userDataService, marketDataService, templateLoader, notificator, validator, utils) {
        super(userDataService, marketDataService, templateLoader, notificator, validator, utils);

        this.PAGINATOR_SIZE = 7;
        this.PAGES_COUNT = 20;
    }

    getMarketInfo(context) {
        Promise.all([
                this.marketDataService.getGames(context),
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
        this.marketDataService.getGameInfo(event.currentTarget)
            .then(({ id, name, img }) => this.notificator.showDownloadSuggestion(id, name, img))
            .then((id) => {
                if (this.userDataService.isLoggedUser()) {
                    this.userDataService.downloadGame(id)
                        .then(() => this.notificator.showSuccessAlert(
                            this.marketDataService.SUCCESSFULL_DOWNLOAD_ALLERT_TITLE,
                            this.marketDataService.SUCCESSFULL_DOWNLOAD_ALLERT_MESSAGE
                        ))
                        .catch(() => this.notificator.showWarningAlert(
                            this.marketDataService.INVALID_DOWNLOAD_ALLERT_TITLE,
                            this.marketDataService.INVALID_DOWNLOAD_ALLERT_MESSAGE
                        ));
                } else {
                    this.notificator.showLoginSuggestion();
                }
            })
            .catch(() => this.notificator.showErrorAlert(
                this.marketDataService.CANCELLED_DOWNLOAD_ALLERT_TITLE,
                this.marketDataService.CANCELLED_DOWNLOAD_ALLERT_MESSAGE
            ));
    }
}

const marketController = new MarketController(userDataService, marketDataService, templateLoader, notificator, validator, utils);
export { marketController };
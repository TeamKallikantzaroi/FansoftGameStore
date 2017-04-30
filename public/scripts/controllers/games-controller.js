import { Controller } from 'controller';
import { gamesDataService } from 'gamesData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';

class GamesController extends Controller {
    constructor(gamesDataService, templateLoader, notificator, validator) {
        super(gamesDataService, templateLoader, notificator, validator);
    }

    androidGames(router) {
        Promise.all([
                this.dataService.androidGames(),
                this.templateLoader.loadTemplate('androidGame')
            ])
            .then(([games, gameTemplate]) => {
                const template = Handlebars.compile(gameTemplate);
                const gameData = template(games);
                $('#content').html(gameData);
            })
    }

    iOSGames(router) {
        Promise.all([
                this.dataService.iOSGames(),
                this.templateLoader.loadTemplate('iOSGame')
            ])
            .then(([games, gameTemplate]) => {
                const template = Handlebars.compile(gameTemplate);
                const gameData = template(games);
                $('#content').html(gameData);
            })
    }
}

const gamesController = new GamesController(gamesDataService, templateLoader, notificator, validator);
export { gamesController };
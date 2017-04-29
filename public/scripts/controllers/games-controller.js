import { gameDataService } from 'gameData-service';
import { templateService } from 'template-service';
import { notificator } from 'notificator';

class GamesController {
    constructor(gameDataService, templateService, notificator) {
        this.gameDataService = gameDataService;
        this.templateService = templateService;
        this.notificator = notificator;
    }

    androidGames(router) {
        Promise.all([
                this.gameDataService.androidGames(),
                this.templateService.loadTemplate('androidGame')
            ])
            .then(([games, gameTemplate]) => {
                const template = Handlebars.compile(gameTemplate);
                const gameData = template(games);
                $('#content').html(gameData);
            })
    }

    iOSGames(router) {
        Promise.all([
                this.gameDataService.iOSGames(),
                this.templateService.loadTemplate('iOSGame')
            ])
            .then(([games, gameTemplate]) => {
                const template = Handlebars.compile(gameTemplate);
                const gameData = template(games);
                $('#content').html(gameData);
            })
    }
}

const gamesController = new GamesController(gameDataService, templateService, notificator);
export { gamesController };
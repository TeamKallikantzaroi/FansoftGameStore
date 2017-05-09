import { Controller } from 'controller';
import { userProfileService } from 'userProfile-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

import { userDataService } from 'userData-service';

class UserProfileController extends Controller {
    constructor(userProfileService, templateLoader, notificator, validator, utils) {
        super(userProfileService, templateLoader, notificator, validator, utils);
    }

    getUserProfileInfo() {
        return Promise.all([
                this.dataService.getCurrentUserInfo(),
                this.templateLoader.loadTemplate('userProfile'),
                this.templateLoader.loadTemplate('userGame'),
                this.utils.showProgressbar()
            ])
            .then(([userData, profileTemplate, gameTemplate]) => this.fillUserProfile(userData, profileTemplate, gameTemplate))
            .then(() => this.utils.hideProgressbar());
    }

    fillUserProfile(userData, profileTemplate, gameTemplate) {
        profileTemplate = Handlebars.compile(profileTemplate);
        const profileData = profileTemplate({ username: userDataService.getUsername() });

        new Promise((resolve, reject) => {
            this.dataService.getUserGames(userData.userGames)
                .then((games) => {
                    games = games.map(x => x[0]);

                    gameTemplate = Handlebars.compile(gameTemplate);
                    const gameData = gameTemplate(games);

                    $('#content').html(profileData);
                    $('#user-games')
                        .html(gameData)
                        .on('click', '.remove-game', (event) => {
                            const name = $(event.currentTarget).parents('.user-game-container').find('.list-title').html();

                            this.notificator.showRemoveSuggestion(name)
                                .then(() => {
                                    const id = $(event.currentTarget).parents('.user-game-container').attr('id');

                                    this.dataService.removeGame(id)
                                        .then((gamesCount) => {
                                            $(event.currentTarget).parents('.user-game-container').remove();

                                            if (gamesCount === 0) {
                                                $('#user-games').append($('<h1>').html(this.dataService.NO_DOWNLOADED_GAMES_MESSAGE));
                                            }

                                        })
                                        .then(() => {
                                            this.notificator.showSuccessAlert(
                                                this.dataService.REMOVED_GAME_ALLERT_TITLE,
                                                this.dataService.REMOVED_GAME_ALLERT_MESSAGE
                                            );
                                        });
                                })
                                .catch(() => {});
                        });

                    $('#btn-share-facebook').removeClass('hidden');
                    this.utils.configFacebookSharing();

                    $(document).ready(() => $('[data-toggle="popover"]').popover({ container: 'body' }));
                })
                .then(resolve);
        });
    }
}

const userProfileController = new UserProfileController(userProfileService, templateLoader, notificator, validator, utils);
export { userProfileController };
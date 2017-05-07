import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';


class UserController extends Controller {
    constructor(userDataService, marketDataService, templateLoader, notificator, validator, utils) {
        super(userDataService, marketDataService, templateLoader, notificator, validator, utils);
    }

    home(router) {
        templateLoader.loadTemplate('home')
            .then(template => $('#content').html(template))
            .then(() => $('#carousel-example-generic').carousel({ pause: null }));
    }

    login(router) {
        templateLoader.loadTemplate('login')
            .then((template) => {
                $('#content').html(template);

                $('#sign-up').on('click', () => {
                    this.userDataService.getUserData()
                        .then(user => this.userDataService.validateUserData(user))
                        .then(({ username, password }) => ({ username, password: this.utils.encryptPassword(password) }))
                        .then(user => this.userDataService.register(user))
                        .then((message) => this.notificator.successToast(message))
                        .catch((message) => this.notificator.errorToast(message))
                });

                $('#sign-in').on('click', (event) => {
                    this.userDataService.getUserData()
                        .then(({ username, password }) => ({ username, password: this.utils.encryptPassword(password) }))
                        .then(user => this.userDataService.login(user))
                        .then((message) => {
                            this.notificator.successToast(message);
                            this.checkUser();
                            window.history.back();
                        })
                        .catch((message) => this.notificator.errorToast(message))
                });
            })
    }

    logout() {
        this.userDataService.logout()
            .then((message) => {
                this.notificator.successToast(message);
                this.checkUser();
            })
            .catch((message) => this.notificator.errorToast(message));
    }

    getUserProfileInfo() {
        Promise.all([
                this.userDataService.getCurrentUserInfo(),
                this.templateLoader.loadTemplate('userProfile'),
                this.templateLoader.loadTemplate('userGame'),
                this.utils.showProgressbar()
            ])
            .then(([userData, profileTemplate, gameTemplate]) => this.fillUserProfile(userData, profileTemplate, gameTemplate))
            .then(() => this.utils.hideProgressbar());
    }

    fillUserProfile(userData, profileTemplate, gameTemplate) {
        profileTemplate = Handlebars.compile(profileTemplate);
        const profileData = profileTemplate({ username: this.userDataService.getUsername() });

        new Promise((resolve, reject) => {
            this.marketDataService.getUserGames(userData.userGames)
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
                                    const id = $(event.currentTarget).parents('.user-game-container').remove().attr('id');
                                    this.userDataService.removeGame(id);
                                })
                                .then(() => {
                                    this.notificator.showSuccessAlert(
                                        this.marketDataService.REMOVED_GAME_ALLERT_TITLE,
                                        this.marketDataService.REMOVED_GAME_ALLERT_MESSAGE
                                    );
                                });
                        });

                    $('#btn-share-facebook').removeClass('hidden');
                    this.utils.configFacebookSharing();

                    $(document).ready(() => $('[data-toggle="popover"]').popover({ container: 'body' }));
                })
                .then(resolve);
        });
    }

    checkUser() {
        if (this.userDataService.isLoggedUser()) {
            $('#sign').html('Logout');
            $('.nav').one('click', '#sign-out', () => this.logout());
            $('#user').html(this.userDataService.getUsername());
            $('.glyphicon-log-in').removeClass('glyphicon-log-in').addClass('glyphicon-log-out');
            $('.user-controls').css('display', '');
            return true;
        } else {
            $('#sign').html('Login');
            $('.user-controls').css('display', 'none');
            $('.glyphicon-log-out').removeClass('glyphicon-log-out').addClass('glyphicon-log-in');
            return false;
        }
    }
}

const userController = new UserController(userDataService, marketDataService, templateLoader, notificator, validator, utils);
export { userController };
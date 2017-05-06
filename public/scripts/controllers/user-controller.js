import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';

class UserController extends Controller {
    constructor(userDataService, marketDataService, templateLoader, notificator, validator) {
        super(userDataService, marketDataService, templateLoader, notificator, validator);
    }

    home(router) {
        templateLoader.loadTemplate('home')
            .then(template => $('#content').html(template));
    }

    login(router) {
        // if (this.userDataService.isLoggedUser()) {
        //     return;
        // }

        templateLoader.loadTemplate('login')
            .then((template) => {
                $('#content').html(template);

                $('#sign-up').on('click', () => {
                    this.userDataService.getUserData()
                        .then(user => this.userDataService.register(user))
                        .then((message) => this.notificator.success(message))
                        .catch((message) => this.notificator.error(message))
                });

                $('#sign-in').on('click', (event) => {
                    this.userDataService.getUserData()
                        .then(user => this.userDataService.login(user))
                        .then((message) => {
                            this.notificator.success(message);
                            this.checkUser();
                            window.history.back(); // if you have time find a way with sammy
                        })
                        .catch((message) => this.notificator.error(message))
                });
            })
    }

    logout() {
        this.userDataService.logout()
            .then((message) => {
                this.notificator.success(message);
                this.checkUser();
            })
            .catch((message) => this.notificator.error(message));
    }

    userProfile() {
        Promise.all([
                this.userDataService.getCurrentUserInfo(),
                this.templateLoader.loadTemplate('userProfile'),
                this.templateLoader.loadTemplate('game')
            ])
            .then(([userData, profileTemplate, gameTemplate]) => {
                profileTemplate = Handlebars.compile(profileTemplate);
                const profileData = profileTemplate({ username: this.userDataService.getUsername() });

                this.marketDataService.getUserGames(userData.userGames)
                    .then((games) => {
                        games = games.map(x => x[0]);

                        gameTemplate = Handlebars.compile(gameTemplate);
                        const gameData = gameTemplate(games);

                        $('#content').html(profileData);
                        $('#user-games').html(gameData);
                    })
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

const userController = new UserController(userDataService, marketDataService, templateLoader, notificator, validator);
export { userController };
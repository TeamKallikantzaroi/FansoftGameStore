import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

class UserController extends Controller {
    constructor(userDataService, templateLoader, notificator, validator, utils) {
        super(userDataService, templateLoader, notificator, validator, utils);
    }

    home(router) {
        return templateLoader.loadTemplate('home')
            .then(template => $('#content').html(template))
            .then(() => $('#carousel-example-generic').carousel({ pause: null }));
    }

    login(router) {
        return templateLoader.loadTemplate('login')
            .then((template) => {
                $('#content').html(template);

                $('#sign-up').on('click', () => {
                    this.dataService.getUserData()
                        .then(user => this.dataService.validateUserData(user))
                        .then(({ username, password }) => ({ username, password: this.utils.encryptPassword(password) }))
                        .then(user => this.dataService.register(user))
                        .then((message) => this.notificator.successToast(message))
                        .catch((message) => this.notificator.errorToast(message))
                });

                $('#sign-in').on('click', (event) => {
                    this.dataService.getUserData()
                        .then(({ username, password }) => ({ username, password: this.utils.encryptPassword(password) }))
                        .then(user => this.dataService.login(user))
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
        return this.dataService.logout()
            .then((message) => {
                this.notificator.successToast(message);
                this.checkUser();
            })
            .catch((message) => this.notificator.errorToast(message));
    }

    checkUser() {
        if (this.dataService.isLoggedUser()) {
            $('#sign').html('Logout');
            $('.nav').one('click', '#sign-out', () => this.logout());
            $('#user').html(this.dataService.getUsername());
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

const userController = new UserController(userDataService, templateLoader, notificator, validator, utils);
export { userController };
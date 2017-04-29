import { userDataService } from 'userData-service';
import { templateService } from 'template-service';
import { notificator } from 'notificator';

class UserController {
    constructor(userDataService, templateService) {
        this.userDataService = userDataService;
        this.templateService = templateService;
        this.notificator = notificator;
    }

    home(router) {
        templateService.loadTemplate('home')
            .then(template => $('#content').html(template));
    }

    login(router) {
        templateService.loadTemplate('login')
            .then((template) => {
                $('#content').html(template);

                $('#sign-up').on('click', () => {
                    this.userDataService.getUserData()
                        .then(user => this.userDataService.register(user))
                        .then((message) => this.notificator.success(message))
                        .catch((message) => this.notificator.error(message))
                });

                $('#sign-in').on('click', () => {
                    this.userDataService.getUserData()
                        .then(user => this.userDataService.login(user))
                        .then((message) => {
                            this.notificator.success(message);
                            router.redirect('#/home');
                            this.checkUser();
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

    myCart() {

    }

    checkUser() {
        if (this.userDataService.isLoggedUser()) {
            $('#sign-out').html('Logout');
            $('.nav').one('click', '#sign-out', () => this.logout());
            $('.user-controls').css('display', '');
            $('#user').html(this.userDataService.getUsername());
            return true;
        } else {
            $('#sign-out').html('Login');
            $('.user-controls').css('display', 'none');
            return false;
        }
    }
}

const userController = new UserController(userDataService, templateService, notificator);
export { userController };
import { userService } from 'user-service';
import { templateService } from 'template-service';
import { notificator } from 'notificator';

class UserController {
    constructor(userService, templateService) {
        this.userService = userService;
        this.templateService = templateService;
        this.notificator = notificator;
    }

    home(router) {
        templateService.loadTemplate('home');
    }

    login(router) {
        templateService.loadTemplate('login')
            .then(() => {
                $('#sign-up').on('click', () => {
                    const user = this.userService.getUserData();

                    this.userService.register(user)
                        .then(() => toastr.success('Registered successfully!'))
                        .catch(() => toastr.error('Username alredy exist!'))
                });

                $('#sign-in').on('click', () => {
                    const user = this.userService.getUserData();

                    this.userService.login(user)
                        .then(() => {
                            toastr.success(`Welcome, ${this.userService.getUsername()}!`);
                            router.redirect('#/home');
                            this.checkUser();
                        })
                        .catch(() => toastr.error('Invalid username or password!'))
                });
            })
    }

    logout() {
        this.userService.logout()
            .then(() => {
                toastr.success('Goodbye!');
                this.checkUser();
            })
            .catch(() => toastr.error('Failed to logout!'));
    }

    checkUser() {
        if (this.userService.isLoggedUser()) {
            $('#sign-out').html('Logout');
            $('.nav').one('click', '#sign-out', () => this.logout());
            $('.user-controls').css('display', '');
            $('#user').html(this.userService.getUsername());
            return true;
        } else {
            $('#sign-out').html('Login');
            $('.user-controls').css('display', 'none');
            return false;
        }
    }
}

const userController = new UserController(userService, templateService, notificator);
export { userController };
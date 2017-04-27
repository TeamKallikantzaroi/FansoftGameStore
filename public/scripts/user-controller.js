import { userService } from 'user-service';

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    register() {
        const user = this.userService.getUserData();

        this.userService.register(user)
            .then(() => toastr.success('Registered successfully!'))
            .catch(() => toastr.error('Username alredy exist!'))
    }

    login() {
        const user = this.userService.getUserData();

        this.userService.login(user)
            .then(() => {
                toastr.success(`Welcome, ${this.userService.getUsername()}!`);
                this.checkUser();
            })
            .catch(() => toastr.error('Invalid username or password!'))
    }

    logout() {
            this.userService.logout()
                .then(() => {
                    toastr.success('Goodbye!');
                    this.checkUser();
                })
                .catch(() => toastr.error('Failed to logout!'));
        }
        //import 'jquery';
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

const userController = new UserController(userService);
export { userController };
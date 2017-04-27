import { userService } from 'user-service';

class UserController {
    constructor(userService) {
            this.userService = userService;
        }
        //import 'toastr';
    register() {
        const user = this.userService.getUserData();

        this.userService.register(user)
            .then(() => toastr.success('Registered successfully!'))
            .catch(() => toastr.error('Username alredy exist!'))
    }

    login() {
        const user = this.userService.getUserData();

        this.userService.login(user)
            .then(() => toastr.success(`Welcome, ${document.cookie}!`))
            .catch(() => toastr.error('Invalid username or password!'))
    }
}

const userController = new UserController(userService);
export { userController };
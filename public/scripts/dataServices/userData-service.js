import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

class UserDataService extends DataService {
    constructor(requester, validator) {
        super(requester, validator);

        this.MIN_USERNAME_LENGTH = 3;
        this.MAX_USERNAME_LENGTH = 10;
        this.USERNAME_PATTERN = /^[A-Za-z0-9]+$/;
        this.INVALID_USERNAME_MESSAGE = `Username must be between ${this.MIN_USERNAME_LENGTH} and ${this.MAX_USERNAME_LENGTH} characters long and consist of only latin symbols and numbers!`

        this.MIN_PASSWORD_LENGTH = 4;
        this.MAX_PASSWORD_LENGTH = 12;
        this.PASSWORD_PATTERN = /^[^\/:*?"<>$'|&]+$/;
        this.INVALID_PASSWORD_MESSAGE = `Password must be between ${this.MIN_PASSWORD_LENGTH} and ${this.MAX_PASSWORD_LENGTH} characters long and not iclude following symbols: \ /  * ? " : < > $ ' | & !`;

        this.REMOVED_USERNAME_COOKIE = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.REMOVED_AUTHTOKEN_COOKIE = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        this.SUCCESSFUL_REGISTER_MESSAGE = 'Registered successfully!';
        this.ERROR_REGISTER_MESSAGE = 'Username alredy exist!';

        this.SUCCESSFUL_LOGIN_MESSAGE = `Welcome, `;
        this.ERROR_LOGIN_MESSAGE = 'Invalid username or password!';

        this.SUCCESSFUL_LOGOUT_MESSAGE = 'Goodbye!';
        this.ERROR_LOGOUT_MESSAGE = 'Failed to logout!';

        this.BASE_DOMAIN = 'https://baas.kinvey.com';
        this.APP_KEY = 'kid_r1YobYsRl';
        this.APP_SECRET = 'f1762ef8104346d19263226a4a9b1e7f';
        this.AUTHORIZATION = `Basic ${btoa(this.APP_KEY+':' +this.APP_SECRET)}`;
        this.AUTHTOKEN_COMMAND = 'Kinvey ';
    }

    getUserData() {
        const username = $('#input-username').val(),
            password = $('#input-password').val(),
            user = {
                username,
                password
            }

        $('#input-username').val('');
        $('#input-password').val('');

        return Promise.resolve(user);
    }

    validateUserData(user) {
        return Promise.all([
                this.validator.validateUserInput(
                    user.username,
                    this.MIN_USERNAME_LENGTH,
                    this.MAX_USERNAME_LENGTH,
                    this.USERNAME_PATTERN,
                    this.INVALID_USERNAME_MESSAGE
                ),
                this.validator.validateUserInput(
                    user.password,
                    this.MIN_PASSWORD_LENGTH,
                    this.MAX_PASSWORD_LENGTH,
                    this.PASSWORD_PATTERN,
                    this.INVALID_PASSWORD_MESSAGE
                )
            ])
            .then(() => user);
    }

    register(user) {
        user.games = [];

        return new Promise((resolve, reject) => {
            this.requester.postJSON(
                    this.BASE_DOMAIN + `/user/${this.APP_KEY}`,
                    user, { Authorization: this.AUTHORIZATION }
                )
                .then(() => resolve(this.SUCCESSFUL_REGISTER_MESSAGE))
                .catch(() => reject(this.ERROR_REGISTER_MESSAGE));
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this.requester.postJSON(
                    this.BASE_DOMAIN + `/user/${this.APP_KEY}/login`,
                    user, { Authorization: this.AUTHORIZATION }
                )
                .then(data => {
                    const username = data.username,
                        authtoken = data._kmd.authtoken;

                    document.cookie = `username=${username}`;
                    document.cookie = `authtoken=${authtoken}`;
                })
                .then(() => resolve(this.SUCCESSFUL_LOGIN_MESSAGE + `${this.getUsername()}!`))
                .catch(() => reject(this.ERROR_LOGIN_MESSAGE));
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.requester.postJSON(
                    this.BASE_DOMAIN + `/user/${this.APP_KEY}/_logout`,
                    null, { Authorization: this.AUTHTOKEN_COMMAND + this._getAuthToken() }
                )
                .then(() => {
                    document.cookie = this.REMOVED_USERNAME_COOKIE;
                    document.cookie = this.REMOVED_AUTHTOKEN_COOKIE;
                })
                .then(() => resolve(this.SUCCESSFUL_LOGOUT_MESSAGE))
                .catch(() => reject(this.ERROR_LOGOUT_MESSAGE));
        });
    }

    getUsername() {
        return document.cookie.split('; ').find(x => x.includes('username')).split('username=')[1];
    }

    _getAuthToken() {
        return document.cookie.split('; ').find(x => x.includes('authtoken')).split('authtoken=')[1];
    }

    isLoggedUser() {
        if (document.cookie.indexOf('authtoken') < 0) {
            return false;
        }

        return true;
    }
}

const userDataService = new UserDataService(requester, validator);
export { userDataService };
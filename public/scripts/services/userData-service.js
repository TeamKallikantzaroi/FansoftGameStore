import { requester } from 'requester';
import { validator } from 'validator';

class UserDataService {
    constructor(requester, validator) {
        this.requester = requester;
        this.validator = validator;

        this.MIN_USERNAME_LENGTH = 2;
        this.MAX_USERNAME_LENGTH = 15;
        this.USERNAME_PATTERN = /^[A-Za-z0-9]+$/g;
        this.INVALID_USERNAME_MESSAGE = `Username must be between ${this.MIN_USERNAME_LENGTH} and ${this.MAX_USERNAME_LENGTH} characters long and consist of only latin symbols and numbers!`

        this.MIN_PASSWORD_LENGTH = 3;
        this.MAX_PASSWORD_LENGTH = 20;
        this.PASSWORD_PATTERN = /^[^+-.&$<>]+$/g;
        this.INVALID_PASSWORD_MESSAGE = `Password must be between ${this.MIN_PASSWORD_LENGTH} and ${this.MAX_PASSWORD_LENGTH} characters long and not iclude '+ - . & $ < >' !`;

        this.SUCCESSFUL_REGISTER_MESSAGE = 'Registered successfully!';
        this.ERROR_REGISTER_MESSAGE = 'Username alredy exist!';

        this.SUCCESSFUL_LOGIN_MESSAGE = `Welcome, `;
        this.ERROR_LOGIN_MESSAGE = 'Invalid username or password!';

        this.SUCCESSFUL_LOGOUT_MESSAGE = 'Goodbye!';
        this.ERROR_LOGOUT_MESSAGE = 'Failed to logout!';

        this.domain = 'https://baas.kinvey.com';
        this.appKey = 'kid_r1YobYsRl';
        this.appSecret = 'f1762ef8104346d19263226a4a9b1e7f';
        this.authorization = `Basic ${btoa(this.appKey+':' +this.appSecret)}`;
        this.authtokenCommand = 'Kinvey ';
    }

    register(user) {
        return new Promise((resolve, reject) => {
            this.requester.postJSON(
                    this.domain + `/user/${this.appKey}`,
                    user, { Authorization: this.authorization }
                )
                .then(() => resolve(this.SUCCESSFUL_REGISTER_MESSAGE))
                .catch(() => reject(this.ERROR_REGISTER_MESSAGE));
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this.requester.postJSON(
                    this.domain + `/user/${this.appKey}/login`,
                    user, { Authorization: this.authorization }
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
                    this.domain + `/user/${this.appKey}/_logout`,
                    null, { Authorization: this.authtokenCommand + this._getAuthToken() }
                )
                .then(() => {
                    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                })
                .then(() => resolve(this.SUCCESSFUL_LOGOUT_MESSAGE))
                .catch(() => reject(this.ERROR_LOGOUT_MESSAGE));
        });
    }

    getUserData() {
        let user;

        const username = $('#input-username').val(),
            password = $('#input-password').val();

        $('#input-username').val('');
        $('#input-password').val('');

        return Promise.all([
                validator.validateUserInput(
                    username,
                    this.MIN_USERNAME_LENGTH,
                    this.MAX_USERNAME_LENGTH,
                    this.USERNAME_PATTERN,
                    this.INVALID_USERNAME_MESSAGE
                ),
                validator.validateUserInput(
                    password,
                    this.MIN_PASSWORD_LENGTH,
                    this.MAX_PASSWORD_LENGTH,
                    this.PASSWORD_PATTERN,
                    this.INVALID_PASSWORD_MESSAGE
                )
            ])
            .then(() => {
                const passHash = CryptoJS.SHA1(password).toString();

                user = {
                    username,
                    password: passHash
                };

                return user;
            });
    }

    getUsername() {
        return document.cookie.split('; ')[0].split('username=')[1];
    }

    _getAuthToken() {
        return document.cookie.split('; ')[1].split('authtoken=')[1];
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
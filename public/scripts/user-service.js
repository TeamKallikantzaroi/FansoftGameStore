import { requester } from 'requester';

class UserService {
    constructor(requester) {
        this.requester = requester;
        this.domain = 'https://baas.kinvey.com';
        this.authorization = 'Basic a2lkX3IxWW9iWXNSbDpmMTc2MmVmODEwNDM0NmQxOTI2MzIyNmE0YTliMWU3Zg==';
        this.authtokenCommand = 'Kinvey ';
    }

    register(user) {
        return this.requester.postJSON(
            this.domain + '/user/kid_r1YobYsRl',
            user, { Authorization: this.authorization }
        );
    }

    login(user) {
        return this.requester.postJSON(
                this.domain + '/user/kid_r1YobYsRl/login',
                user, { Authorization: this.authorization }
            )
            .then(data => {
                const username = data.username,
                    authtoken = data._kmd.authtoken;

                document.cookie = `username=${username}`;
                document.cookie = `authtoken=${authtoken};`;
            });
    }

    logout() {
        return this.requester.postJSON(
                this.domain + '/user/kid_r1YobYsRl/_logout',
                null, { Authorization: this.authtokenCommand + this._getAuthToken() }
            )
            .then(() => {
                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            });
    }

    getUserData() {
        const $username = $('#input-username'),
            $password = $('#input-password'),
            passHash = CryptoJS.SHA1($password.val()).toString(),
            user = {
                username: $username.val(),
                password: passHash
            };

        $username.val('');
        $password.val('');

        return user;
    }

    getUsername() {
        return document.cookie.split('; ')[0].split('username=')[1];
    }

    _getAuthToken() {
        return document.cookie.split('authtoken=')[1];
    }

    isLoggedUser() {
        if (document.cookie.indexOf('authtoken') < 0) {
            return false;
        }

        return true;
    }
}

const userService = new UserService(requester);
export { userService };
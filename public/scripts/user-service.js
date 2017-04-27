import { requester } from 'requester';

class UserService {
    constructor(requester) {
        this.requester = requester;
        this.authorization = 'Basic a2lkX3IxWW9iWXNSbDpmMTc2MmVmODEwNDM0NmQxOTI2MzIyNmE0YTliMWU3Zg==';
        this.authtoken = 'Kinvey ';
    }

    register(user) {
        return this.requester.postJSON(
            'https://baas.kinvey.com/user/kid_r1YobYsRl',
            user, { Authorization: this.authorization }
        );
    }

    login(user) {
        return this.requester.postJSON(
                'https://baas.kinvey.com/user/kid_r1YobYsRl/login',
                user, { Authorization: this.authorization }
            )
            .then(data => {
                const username = data.username,
                    authtoken = data._kmd.authtoken;

                document.cookie = `username=${username};`;
                document.cookie = `authtoken=${authtoken};`;
            })
            .then( /*get user rights*/ );
    }

    logout() {
        return this.requester.postJSON(
                'https://baas.kinvey.com/user/kid_r1YobYsRl/_logout',
                user, { Authorization: this.authtoken }
            )
            .then(() => document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
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
}

const userService = new UserService(requester);
export { userService };
import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

class UserProfileService extends DataService {
    constructor(requester, validator) {
        super(requester, validator);

        this.NO_DOWNLOADED_GAMES_MESSAGE = "There are no downloaded games!";

        this.REMOVED_GAME_ALLERT_TITLE = "Removed!";
        this.REMOVED_GAME_ALLERT_MESSAGE = "The game was removed successfully!";

        this.BASE_DOMAIN = 'https://baas.kinvey.com';
        this.APP_KEY = 'kid_r1YobYsRl';
        this.AUTHTOKEN_COMMAND = 'Kinvey ';

        this.MARKET_DOMAIN = 'https://igdbcom-internet-game-database-v1.p.mashape.com';
        this.ACCESS_TOKEN_NAME = 'X-Mashape-Key';
        this.ACCESS_TOKEN = '7iXPtqDglVmshogWh4DMVsY8vhXVp1eDka9jsnnHku669QzpZ3';

        this.GAMES_RESOURCE = '/games/';
        this.USER_QUERY = '?fields=name,cover,summary';
    }

    getCurrentUserInfo() {
        let userId,
            userGames;

        return this.requester.getJSON(
                this.BASE_DOMAIN + `/user/${this.APP_KEY}/_me`, { Authorization: this.AUTHTOKEN_COMMAND + this._getAuthToken() }
            )
            .then(userData => {
                userId = userData._id;
                userGames = userData.games;

                return { userId, userGames };
            })
    }

    downloadGame(gameId) {
        return this.getCurrentUserInfo()
            .then(({ userId, userGames }) => {
                const games = Array.from(userGames);

                if (games.some(x => x === gameId)) {
                    return Promise.reject();
                }

                games.push(gameId);

                return this.requester.putJSON(
                    this.BASE_DOMAIN + `/user/${this.APP_KEY}/${userId}`, { games }, {
                        Authorization: this.AUTHTOKEN_COMMAND + this._getAuthToken()
                    }
                )
            });
    }

    removeGame(gameId) {
        return this.getCurrentUserInfo()
            .then(({ userId, userGames }) => {
                const games = Array.from(userGames);

                const index = games.findIndex(x => x === gameId);
                games.splice(index, 1);

                return this.requester.putJSON(
                        this.BASE_DOMAIN + `/user/${this.APP_KEY}/${userId}`, { games }, {
                            Authorization: this.AUTHTOKEN_COMMAND + this._getAuthToken()
                        }
                    )
                    .then(() => games.length);
            });
    }

    getUserGames(gameIDs) {
        const games = gameIDs.map(id => {
            return this.requester.getJSON(
                this.MARKET_DOMAIN + this.GAMES_RESOURCE + id + this.USER_QUERY, {
                    [this.ACCESS_TOKEN_NAME]: this.ACCESS_TOKEN
                }
            );
        });

        return Promise.all(games);
    }

    _getAuthToken() { // remove this from here if you can
        return document.cookie.split('; ').find(x => x.includes('authtoken')).split('authtoken=')[1];
    }
}

const userProfileService = new UserProfileService(requester, validator);
export { userProfileService };
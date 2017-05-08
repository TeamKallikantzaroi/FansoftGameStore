import { userProfileService } from 'userProfile-service';

import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

const { expect } = chai;

describe("userProfileService tests", () => {

    describe("Correct userProfileService object tests", () => {

        describe("properties", () => {
            it("Expect userProfileService to exist", () => {
                expect(userProfileService).to.exist;
            });
            it("Expect userProfileService to be an object", () => {
                expect(userProfileService).to.be.an('object');
            });
            it("Expect userProfileService to inherit data service", () => {
                expect(userProfileService).to.be.an.instanceof(DataService);
            });
            it("Expect userProfileService to have correct backend provider constants", () => {
                const BASE_DOMAIN = 'https://baas.kinvey.com',
                    APP_KEY = 'kid_r1YobYsRl',
                    AUTHTOKEN_COMMAND = 'Kinvey ';

                expect(userProfileService.BASE_DOMAIN).to.equal(BASE_DOMAIN);
                expect(userProfileService.APP_KEY).to.equal(APP_KEY);
                expect(userProfileService.AUTHTOKEN_COMMAND).to.equal(AUTHTOKEN_COMMAND);
            });
            it("Expect userProfileService to have correct public game api constants", () => {
                const ACCESS_TOKEN_NAME = 'X-Mashape-Key',
                    ACCESS_TOKEN = '7iXPtqDglVmshogWh4DMVsY8vhXVp1eDka9jsnnHku669QzpZ3',
                    MARKET_DOMAIN = 'https://igdbcom-internet-game-database-v1.p.mashape.com',
                    GAMES_RESOURCE = '/games/',
                    USER_QUERY = '?fields=name,cover,summary';

                expect(userProfileService.ACCESS_TOKEN_NAME).to.equal(ACCESS_TOKEN_NAME);
                expect(userProfileService.ACCESS_TOKEN).to.equal(ACCESS_TOKEN);
                expect(userProfileService.MARKET_DOMAIN).to.equal(MARKET_DOMAIN);
                expect(userProfileService.GAMES_RESOURCE).to.equal(GAMES_RESOURCE);
                expect(userProfileService.USER_QUERY).to.equal(USER_QUERY);
            });
            it("Expect userProfileService to have correct no downloaded games constant", () => {
                const NO_DOWNLOADED_GAMES_MESSAGE = "There are no downloaded games!";

                expect(userProfileService.NO_DOWNLOADED_GAMES_MESSAGE).to.equal(NO_DOWNLOADED_GAMES_MESSAGE);
            });
            it("Expect userProfileService to have correct removed game alert message constants", () => {
                const REMOVED_GAME_ALLERT_TITLE = "Removed!",
                    REMOVED_GAME_ALLERT_MESSAGE = "The game was removed successfully!";

                expect(userProfileService.REMOVED_GAME_ALLERT_TITLE).to.equal(REMOVED_GAME_ALLERT_TITLE);
                expect(userProfileService.REMOVED_GAME_ALLERT_MESSAGE).to.equal(REMOVED_GAME_ALLERT_MESSAGE);
            });
        });

        describe("functions", () => {
            it("Expect userProfileService to have getCurrentUserInfo() function", () => {
                expect(userProfileService.getCurrentUserInfo).to.be.a('function');
            });
            it("Expect userProfileService to have getUserGames() function", () => {
                expect(userProfileService.getUserGames).to.be.a('function');
            });
            it("Expect userProfileService to have downloadGame() function", () => {
                expect(userProfileService.downloadGame).to.be.a('function');
            });
            it("Expect userProfileService to have removeGame() function", () => {
                expect(userProfileService.removeGame).to.be.a('function');
            });
        });
    });

    describe("Behavior tests", () => {

        describe("getCurrentUserInfo() tests", () => {
            let mockedRequester;

            beforeEach(() => {
                mockedRequester = sinon.stub(userProfileService.requester, "getJSON");
                mockedRequester.returns(Promise.resolve({ _id: 5, games: 'games' }));
            });

            afterEach(() => {
                mockedRequester.restore();
            });

            it("Expect getCurrentUserInfo() to call requester once", (done) => {
                userProfileService.getCurrentUserInfo()
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect getCurrentUserInfo() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://baas.kinvey.com';

                userProfileService.getCurrentUserInfo()
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect getCurrentUserInfo() to return resolved promise with object containing correct properties", (done) => {
                userProfileService.getCurrentUserInfo()
                    .then((result) => {
                        expect(result.userId).to.equal(5);
                        expect(result.userGames).to.equal('games');
                    })
                    .then(done, done);
            });
        });

        describe("getUserGames() tests", () => {
            let mockedRequester,
                gameIDs;

            beforeEach(() => {
                mockedRequester = sinon.stub(userProfileService.requester, "getJSON");
                mockedRequester.returns(Promise.resolve());

                gameIDs = [1, 2, 3];
            });

            afterEach(() => {
                mockedRequester.restore();
            });

            it("Expect getUserGames() to call requester thrice", (done) => {
                userProfileService.getUserGames(gameIDs)
                    .then(() => {
                        expect(mockedRequester).to.been.calledThrice;
                    })
                    .then(done, done);
            });
            it("Expect getUserGames() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

                userProfileService.getUserGames(gameIDs)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect getUserGames() to return resolved promise with array", (done) => {
                userProfileService.getUserGames(gameIDs)
                    .then((result) => {
                        expect(result).to.be.instanceof(Array);
                    })
                    .then(done, done);
            });
        });

        describe("downloadGame() tests", () => {
            let mockedRequester,
                mockedGetUserInfo,
                gameID,
                userGames = [];

            beforeEach(() => {
                mockedGetUserInfo = sinon.stub(userProfileService, 'getCurrentUserInfo');
                mockedGetUserInfo.returns(Promise.resolve({ userId: 5, userGames }));

                mockedRequester = sinon.stub(userProfileService.requester, "putJSON");
                mockedRequester.returns(Promise.resolve());

                gameID = 1;
            });

            afterEach(() => {
                mockedGetUserInfo.restore();
                mockedRequester.restore();

                userGames = [];
            });

            it("Expect downloadGame() to call requester once", (done) => {
                userProfileService.downloadGame(gameID)
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect downloadGame() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://baas.kinvey.com';

                userProfileService.downloadGame(gameID)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect downloadGame() to return rejected promise and no new elements added to games array when id is alredy in the collection", (done) => {
                userGames.push(1);

                userProfileService.downloadGame(gameID)
                    .then(() => {
                            expect(userGames.length).to.be.equal(1);
                        },
                        () => {
                            expect(userGames.length).to.be.equal(1);
                        })
                    .then(done, done);
            });
        });

        describe("removeGame() tests", () => {
            let mockedRequester,
                mockedGetUserInfo,
                gameID,
                userGames = [5, 4];

            beforeEach(() => {
                mockedGetUserInfo = sinon.stub(userProfileService, 'getCurrentUserInfo');
                mockedGetUserInfo.returns(Promise.resolve({ userId: 5, userGames }));

                mockedRequester = sinon.stub(userProfileService.requester, "putJSON");
                mockedRequester.returns(Promise.resolve());

                gameID = 5;
            });

            afterEach(() => {
                mockedGetUserInfo.restore();
                mockedRequester.restore();

                userGames = [5, 4];
            });

            it("Expect removeGame() to call requester once", (done) => {
                userProfileService.removeGame(gameID)
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect removeGame() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://baas.kinvey.com';

                userProfileService.removeGame(gameID)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect removeGame() to return resolved promise with the new length of the array", (done) => {
                userProfileService.removeGame(gameID)
                    .then((result) => {
                        expect(result).to.be.equal(1);
                    })
                    .then(done, done);
            });
        });
    });
});
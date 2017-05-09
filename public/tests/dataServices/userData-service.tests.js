import { userDataService } from 'userData-service';

import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

const { expect } = chai;

describe("userDataService tests", () => {

    describe("Correct userDataService object tests", () => {
        it("Expect userDataService to exist", () => {
            expect(userDataService).to.exist;
        });
        it("Expect userDataService to be an object", () => {
            expect(userDataService).to.be.an('object');
        });
        it("Expect userDataService to inherit data service", () => {
            expect(userDataService).to.be.an.instanceof(DataService);
        });

        describe("properties", () => {
            it("Expect userDataService to have correct username constants", () => {
                const MIN_USERNAME_LENGTH = 3,
                    MAX_USERNAME_LENGTH = 10,
                    INVALID_USERNAME_MESSAGE = `Username`;

                expect(userDataService.MIN_USERNAME_LENGTH).to.equal(MIN_USERNAME_LENGTH);
                expect(userDataService.MAX_USERNAME_LENGTH).to.equal(MAX_USERNAME_LENGTH);
                expect(userDataService.INVALID_USERNAME_MESSAGE).to.include(INVALID_USERNAME_MESSAGE);
            });
            it("Expect userDataService to have correct password constants", () => {
                const MIN_PASSWORD_LENGTH = 4,
                    MAX_PASSWORD_LENGTH = 12,
                    INVALID_PASSWORD_MESSAGE = `Password`;

                expect(userDataService.MIN_PASSWORD_LENGTH).to.equal(MIN_PASSWORD_LENGTH);
                expect(userDataService.MAX_PASSWORD_LENGTH).to.equal(MAX_PASSWORD_LENGTH);
                expect(userDataService.INVALID_PASSWORD_MESSAGE).to.include(INVALID_PASSWORD_MESSAGE);
            });
            it("Expect userDataService to have correct backend provider constants", () => {
                const BASE_DOMAIN = 'https://baas.kinvey.com',
                    APP_KEY = 'kid_r1YobYsRl',
                    APP_SECRET = 'f1762ef8104346d19263226a4a9b1e7f',
                    AUTHORIZATION = `Basic ${btoa(APP_KEY+':' +APP_SECRET)}`,
                    AUTHTOKEN_COMMAND = 'Kinvey ';

                expect(userDataService.BASE_DOMAIN).to.equal(BASE_DOMAIN);
                expect(userDataService.APP_KEY).to.equal(APP_KEY);
                expect(userDataService.APP_SECRET).to.equal(APP_SECRET);
                expect(userDataService.AUTHORIZATION).to.equal(AUTHORIZATION);
                expect(userDataService.AUTHTOKEN_COMMAND).to.equal(AUTHTOKEN_COMMAND);
            });
            it("Expect userDataService to have correct cookie removal constants", () => {
                const REMOVED_USERNAME_COOKIE = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",
                    REMOVED_AUTHTOKEN_COOKIE = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                expect(userDataService.REMOVED_USERNAME_COOKIE).to.equal(REMOVED_USERNAME_COOKIE);
                expect(userDataService.REMOVED_AUTHTOKEN_COOKIE).to.equal(REMOVED_AUTHTOKEN_COOKIE);
            });
            it("Expect userDataService to have correct register message constants", () => {
                const SUCCESSFUL_REGISTER_MESSAGE = 'Registered successfully!',
                    ERROR_REGISTER_MESSAGE = 'Username alredy exist!';

                expect(userDataService.SUCCESSFUL_REGISTER_MESSAGE).to.equal(SUCCESSFUL_REGISTER_MESSAGE);
                expect(userDataService.ERROR_REGISTER_MESSAGE).to.equal(ERROR_REGISTER_MESSAGE);
            });
            it("Expect userDataService to have correct login message constants", () => {
                const SUCCESSFUL_LOGIN_MESSAGE = `Welcome, `,
                    ERROR_LOGIN_MESSAGE = 'Invalid username or password!';

                expect(userDataService.SUCCESSFUL_LOGIN_MESSAGE).to.equal(SUCCESSFUL_LOGIN_MESSAGE);
                expect(userDataService.ERROR_LOGIN_MESSAGE).to.equal(ERROR_LOGIN_MESSAGE);
            });
            it("Expect userDataService to have correct logout message constants", () => {
                const SUCCESSFUL_LOGOUT_MESSAGE = 'Goodbye!',
                    ERROR_LOGOUT_MESSAGE = 'Failed to logout!';

                expect(userDataService.SUCCESSFUL_LOGOUT_MESSAGE).to.equal(SUCCESSFUL_LOGOUT_MESSAGE);
                expect(userDataService.ERROR_LOGOUT_MESSAGE).to.equal(ERROR_LOGOUT_MESSAGE);
            });
        });

        describe("functions", () => {
            it("Expect userDataService to have getUserData() function", () => {
                expect(userDataService.getUserData).to.be.a('function');
            });
            it("Expect userDataService to have validateUserData() function", () => {
                expect(userDataService.validateUserData).to.be.a('function');
            });
            it("Expect userDataService to have register() function", () => {
                expect(userDataService.register).to.be.a('function');
            });
            it("Expect userDataService to have login() function", () => {
                expect(userDataService.login).to.be.a('function');
            });
            it("Expect userDataService to have logout() function", () => {
                expect(userDataService.logout).to.be.a('function');
            });
            it("Expect userDataService to have getUsername() function", () => {
                expect(userDataService.getUsername).to.be.a('function');
            });
            it("Expect userDataService to have _getAuthToken() function", () => {
                expect(userDataService._getAuthToken).to.be.a('function');
            });
            it("Expect userDataService to have isLoggedUser() function", () => {
                expect(userDataService.isLoggedUser).to.be.a('function');
            });
        });
    });

    describe("Behavior tests", () => {

        describe("getUserData() tests", () => {
            let mockedjQuery;

            beforeEach(() => {
                mockedjQuery = sinon.stub($.fn, 'val');
                mockedjQuery
                    .onCall(0).returns('username')
                    .onCall(1).returns('password');
            });

            afterEach(() => {
                mockedjQuery.restore();
            });

            it("Expect getUserData() to call $.val() 4 times", (done) => {
                userDataService.getUserData()
                    .then(() => {
                        expect(mockedjQuery).to.have.callCount(4)
                    })
                    .then(done, done);
            });
            it("Expect getUserData() to call $.val() with correct parameters", (done) => {
                userDataService.getUserData()
                    .then(() => {
                        expect(mockedjQuery.getCall(0).args.length).to.be.equal(0);
                        expect(mockedjQuery.getCall(1).args.length).to.be.equal(0);
                        expect(mockedjQuery.getCall(2).args[0]).to.be.equal('');
                        expect(mockedjQuery.getCall(3).args[0]).to.be.equal('');
                    })
                    .then(done, done);
            });
            it("Expect getUserData() to return resolved promise with object", (done) => {
                userDataService.getUserData()
                    .then((user) => {
                        expect(user).to.be.an('object');
                    })
                    .then(done, done);
            });
            it("Expect getUserData() to return resolved promise with object having correct properties", (done) => {
                userDataService.getUserData()
                    .then((user) => {
                        expect(user).to.haveOwnProperty('username');
                        expect(user).to.haveOwnProperty('password');
                    })
                    .then(done, done);
            });
            it("Expect getUserData() to return resolved promise with object having properties with correct values", (done) => {
                userDataService.getUserData()
                    .then((user) => {
                        expect(user.username).to.be.equal('username');
                        expect(user.password).to.be.equal('password');
                    })
                    .then(done, done);
            });
        });

        describe("validateUserData() tests", () => {
            let mockedValidator,
                mockedUser = {
                    username: "username",
                    password: "password"
                };

            beforeEach(() => {
                mockedValidator = sinon.stub(userDataService.validator, 'validateUserInput');
                mockedValidator.returns(Promise.resolve());
            });

            afterEach(() => {
                mockedValidator.restore();
            });

            it("Expect validateUserData() to call validateUserInput() twice", (done) => {
                userDataService.validateUserData(mockedUser)
                    .then(() => {
                        expect(mockedValidator).to.been.calledTwice;
                    })
                    .then(done, done);
            });
            it("Expect validateUserData() to call validateUserInput() with 5 parameters", (done) => {
                userDataService.validateUserData(mockedUser)
                    .then(() => {
                        expect(mockedValidator.getCall(0).args.length).to.be.equal(5);
                        expect(mockedValidator.getCall(1).args.length).to.be.equal(5);
                    })
                    .then(done, done);
            });
            it("Expect validateUserData() to pass the passed user properties as parameter on calls", (done) => {
                userDataService.validateUserData(mockedUser)
                    .then(() => {
                        expect(mockedValidator.getCall(0).args[0]).to.equal('username');
                        expect(mockedValidator.getCall(1).args[0]).to.equal('password');
                    })
                    .then(done, done);
            });
            it("Expect validateUserData() to return resolved promise with the passed user", (done) => {
                userDataService.validateUserData(mockedUser)
                    .then((user) => {
                        expect(user).to.deep.equal(mockedUser);
                    })
                    .then(done, done);
            });
        });

        describe("register() tests", () => {
            let mockedUser = {
                    username: "username",
                    password: "password"
                },
                mockedRequester;

            beforeEach(() => {
                mockedRequester = sinon.stub(userDataService.requester, "postJSON");
                mockedRequester.returns(Promise.resolve());
            });

            afterEach(() => {
                mockedRequester.restore();
            });

            it("Expect register() to attach 'games' array property to the passed user", (done) => {
                userDataService.register(mockedUser)
                    .then(() => {
                        expect(mockedUser).to.haveOwnProperty('games');
                        expect(mockedUser.games).to.be.instanceOf(Array);
                    })
                    .then(done, done);
            });
            it("Expect register() to call requester once", (done) => {
                userDataService.register(mockedUser)
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect register() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://baas.kinvey.com';

                userDataService.register(mockedUser)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect register() to return resolved promise with correct message when requester resolved", (done) => {
                const expectedMessage = 'Registered successfully!';

                userDataService.register(mockedUser)
                    .then((result) => {
                        expect(result).to.equal(expectedMessage);
                    })
                    .then(done, done);
            });
            it("Expect register() to return rejected promise with correct message when requester rejected", (done) => {
                const expectedMessage = 'Username alredy exist!';

                mockedRequester.restore();
                mockedRequester = sinon.stub(userDataService.requester, "postJSON");
                mockedRequester.returns(Promise.reject());

                userDataService.register(mockedUser)
                    .then(
                        (result) => {
                            expect(result).to.equal(expectedMessage);
                        },
                        (result) => {
                            expect(result).to.equal(expectedMessage);
                        })
                    .then(done, done);
            });
        });

        describe("login() tests", () => {
            let mockedUser = {
                    username: "username",
                    password: "password"
                },
                mockedRequester;

            beforeEach(() => {
                mockedRequester = sinon.stub(userDataService.requester, "postJSON");
                mockedRequester.returns(Promise.resolve({ username: 'username', _kmd: { authtoken: '123' } }));
            });

            afterEach(() => {
                mockedRequester.restore();
            });

            it("Expect login() to call requester once", (done) => {
                userDataService.login(mockedUser)
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect login() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://baas.kinvey.com';

                userDataService.login(mockedUser)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect login() to add cookies with correct values to the document", () => {
                userDataService.login(mockedUser)
                    .then(() => {
                        expect(document.cookie).to.include(`username=username`);
                        expect(document.cookie).to.include(`authtoken=123`);

                    })
            });
            it("Expect login() to return resolved promise with correct message when requester resolved", (done) => {
                const expectedMessage = `Welcome, username!`;

                userDataService.login(mockedUser)
                    .then((result) => {
                        expect(result).to.equal(expectedMessage);
                    })
                    .then(done, done);
            });
            it("Expect login() to return rejected promise with correct message when requester rejected", (done) => {
                const expectedMessage = 'Invalid username or password!';

                mockedRequester.restore();
                mockedRequester = sinon.stub(userDataService.requester, "postJSON");
                mockedRequester.returns(Promise.reject());

                userDataService.login(mockedUser)
                    .then(
                        (result) => {
                            expect(result).to.equal(expectedMessage);
                        },
                        (result) => {
                            expect(result).to.equal(expectedMessage);
                        })
                    .then(done, done);
            });
        });

        describe("logout() tests", () => {
            let mockedRequester;

            beforeEach(() => {
                mockedRequester = sinon.stub(userDataService.requester, 'postJSON');
                mockedRequester.returns(Promise.resolve());
            });

            afterEach(() => {
                mockedRequester.restore();
            });

            it("Expect logout() to call requester once", (done) => {
                userDataService.logout()
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect logout() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://baas.kinvey.com';

                userDataService.logout()
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect logout() clear document cookies with value username and authtoken", () => {
                userDataService.logout()
                    .then(() => {
                        expect(document.cookie).to.not.include(`username=`);
                        expect(document.cookie).to.not.include(`authtoken=`);

                    })
            });
            it("Expect logout() to return resolved promise with correct message when requester resolved", (done) => {
                const expectedMessage = 'Goodbye!';

                userDataService.logout()
                    .then((result) => {
                        expect(result).to.equal(expectedMessage);
                    })
                    .then(done, done);
            });
            it("Expect logout() to return rejected promise with correct message when requester rejected", (done) => {
                const expectedMessage = 'Failed to logout!';

                mockedRequester.restore();
                mockedRequester = sinon.stub(userDataService.requester, "postJSON");
                mockedRequester.returns(Promise.reject());

                userDataService.logout()
                    .then(
                        (result) => {
                            expect(result).to.equal(expectedMessage);
                        },
                        (result) => {
                            expect(result).to.equal(expectedMessage);
                        })
                    .then(done, done);
            });
        });
    });
});
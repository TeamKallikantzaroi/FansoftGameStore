import { userController } from 'user-controller';

import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

const { expect } = chai;

describe("userController tests", () => {

    describe("Correct userController object tests", () => {

        it("Expect userController to exist", () => {
            expect(userController).to.exist;
        });
        it("Expect userController to be an object", () => {
            expect(userController).to.be.an('object');
        });
        it("Expect userController to inherit Controller", () => {
            expect(userController).to.be.an.instanceof(Controller);
        });
        it("Expect userController to have home() function", () => {
            expect(userController.home).to.be.a('function');
        });
        it("Expect userController to have login() function", () => {
            expect(userController.login).to.be.a('function');
        });
        it("Expect userController to have logout() function", () => {
            expect(userController.logout).to.be.a('function');
        });
        it("Expect userController to have checkUser() function", () => {
            expect(userController.checkUser).to.be.a('function');
        });
    });

    describe("Behavior tests", () => {

        describe("home() tests", () => {
            let mockedLoader,
                mockedHtml,
                mockedCarousel;

            beforeEach(() => {
                mockedLoader = sinon.stub(templateLoader, 'loadTemplate');
                mockedLoader.returns(Promise.resolve('html'));

                mockedHtml = sinon.stub($.fn, 'html');
                mockedCarousel = sinon.stub($.fn, 'carousel');
            });

            afterEach(() => {
                mockedLoader.restore();
                mockedHtml.restore();
                mockedCarousel.restore();
            })

            it("Expect home() to call templateLoader once", (done) => {
                userController.home()
                    .then(() => {
                        expect(mockedLoader).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect home() to call jQuery functions exact amount of times", (done) => {
                userController.home()
                    .then(() => {
                        expect(mockedHtml).to.been.calledOnce;
                        expect(mockedCarousel).to.been.calledOnce;
                    })
                    .then(done, done);
            });
        });

        describe("login() tests", () => {
            let mockedCheckUser,
                mockedLoader,
                mockedHtml,
                mockedEvent,
                mockedGetUserData,
                mockedValidateUserData,
                mockedRegister,
                mockedLogin,
                mockedEncrypt,
                mockedSuccessToast,
                mockedErrorToast;

            beforeEach(() => {
                mockedCheckUser = sinon.stub(userController, 'checkUser');

                mockedLoader = sinon.stub(templateLoader, 'loadTemplate');
                mockedLoader.returns(Promise.resolve('html'));

                mockedHtml = sinon.stub($.fn, 'html');
                mockedEvent = sinon.stub($.fn, 'on');

                mockedGetUserData = sinon.stub(userDataService, 'getUserData');
                mockedValidateUserData = sinon.stub(userDataService, 'validateUserData');
                mockedRegister = sinon.stub(userDataService, 'register');
                mockedLogin = sinon.stub(userDataService, 'login');

                mockedEncrypt = sinon.stub(utils, 'encryptPassword')

                mockedSuccessToast = sinon.stub(notificator, 'successToast');
                mockedErrorToast = sinon.stub(notificator, 'errorToast');
            });

            afterEach(() => {
                mockedCheckUser.restore();

                mockedLoader.restore();

                mockedHtml.restore();
                mockedEvent.restore();

                mockedGetUserData.restore();
                mockedValidateUserData.restore();
                mockedRegister.restore();
                mockedLogin.restore();

                mockedEncrypt.restore();

                mockedSuccessToast.restore();
                mockedErrorToast.restore();
            });

            it("Expect login() to call templateLoader once", (done) => {
                userController.login()
                    .then(() => {
                        expect(mockedLoader).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect login() to call jQuery functions exact amount of times", (done) => {
                userController.login()
                    .then(() => {
                        expect(mockedHtml).to.been.calledOnce;
                        expect(mockedEvent).to.been.calledTwice;
                    })
                    .then(done, done);
            });
        });

        describe("logout() tests", () => {
            let mockedCheckUser,
                mockedLogout,
                mockedSuccessToast,
                mockedErrorToast;

            beforeEach(() => {
                mockedLogout = sinon.stub(userDataService, 'logout');
                mockedLogout.returns(Promise.resolve('valid message'));

                mockedCheckUser = sinon.stub(userController, 'checkUser');
                mockedSuccessToast = sinon.stub(notificator, 'successToast');
                mockedErrorToast = sinon.stub(notificator, 'errorToast');
            });

            afterEach(() => {
                mockedCheckUser.restore();
                mockedLogout.restore();
                mockedSuccessToast.restore();
                mockedErrorToast.restore();
            });

            it("Expect logout() to call userDataService logout() once", (done) => {
                userController.logout()
                    .then(() => {
                        expect(mockedLogout).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect logout() to call successToast() and checkUser() once and errorToast() never when data service resolved", (done) => {
                userController.logout()
                    .then(() => {
                        expect(mockedSuccessToast).to.been.calledOnce;
                        expect(mockedCheckUser).to.been.calledOnce;
                        expect(mockedErrorToast).to.been.never;
                    })
                    .then(done, done);
            });
            it("Expect logout() to call successToast() and checkUser() never and errorToast() once when data service rejected", (done) => {
                mockedLogout.restore();
                mockedLogout = sinon.stub(userDataService, 'logout');
                mockedLogout.returns(Promise.reject('valid message'));

                userController.logout()
                    .then(() => {
                            expect(mockedSuccessToast).to.been.never;
                            expect(mockedCheckUser).to.been.never;
                            expect(mockedErrorToast).to.been.once;
                        },
                        () => {
                            expect(mockedSuccessToast).to.been.never;
                            expect(mockedCheckUser).to.been.never;
                            expect(mockedErrorToast).to.been.once;
                        })
                    .then(done, done);
            });
        });

        describe("checkUser() tests", () => {
            let mockedHtml,
                mockedOne,
                mockedCss,
                mockedAddClass,
                mockedRemoveClass,
                mockedLogout,
                mockedGetUsername,
                mockedIsLoggedUser;

            beforeEach(() => {
                mockedHtml = sinon.stub($.fn, 'html');
                mockedOne = sinon.stub($.fn, 'one');
                mockedCss = sinon.stub($.fn, 'css');
                mockedAddClass = sinon.stub($.fn, 'addClass');
                mockedRemoveClass = sinon.stub($.fn, 'removeClass');
                mockedRemoveClass.returns({ addClass: mockedAddClass });

                mockedLogout = sinon.stub(userController, 'logout');

                mockedGetUsername = sinon.stub(userDataService, 'getUsername');
                mockedIsLoggedUser = sinon.stub(userDataService, 'isLoggedUser');
                mockedIsLoggedUser.returns(true);
            });

            afterEach(() => {
                mockedHtml.restore();
                mockedOne.restore();
                mockedCss.restore();
                mockedAddClass.restore();
                mockedRemoveClass.restore();
                mockedLogout.restore();
                mockedGetUsername.restore();
                mockedIsLoggedUser.restore();
            });

            it("Expect checkUser() to call jQuery functions exact amount of times when user is logged", () => {
                userController.checkUser();

                expect(mockedHtml).to.been.calledTwice;
                expect(mockedOne).to.been.calledOnce;
                expect(mockedRemoveClass).to.been.calledOnce;
                expect(mockedAddClass).to.been.calledOnce;
                expect(mockedCss).to.been.calledOnce;
            });
            it("Expect checkUser() to return true when user is logged", () => {
                const result = userController.checkUser();
                expect(result).to.be.true;
            });
            it("Expect checkUser() to call jQuery functions exact amount of times when user is not logged", () => {
                mockedIsLoggedUser.restore();
                mockedIsLoggedUser = sinon.stub(userDataService, 'isLoggedUser');
                mockedIsLoggedUser.returns(false);

                userController.checkUser();

                expect(mockedHtml).to.been.calledOnce;
                expect(mockedRemoveClass).to.been.calledOnce;
                expect(mockedAddClass).to.been.calledOnce;
                expect(mockedCss).to.been.calledOnce;
            });
            it("Expect checkUser() to return false when user is not logged", () => {
                mockedIsLoggedUser.restore();
                mockedIsLoggedUser = sinon.stub(userDataService, 'isLoggedUser');
                mockedIsLoggedUser.returns(false);

                const result = userController.checkUser();
                expect(result).to.be.false;
            });
        })
    });
});
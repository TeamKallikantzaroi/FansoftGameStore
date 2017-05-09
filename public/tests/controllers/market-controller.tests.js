import { marketController } from 'market-controller';

import { Controller } from 'controller';
import { marketDataService } from 'marketData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

import { userDataService } from 'userData-service';
import { userProfileService } from 'userProfile-service';

const { expect } = chai;

describe("marketController tests", () => {

    describe("Correct marketController object tests", () => {

        it("Expect marketController to exist", () => {
            expect(marketController).to.exist;
        });
        it("Expect marketController to be an object", () => {
            expect(marketController).to.be.an('object');
        });
        it("Expect marketController to inherit Controller", () => {
            expect(marketController).to.be.an.instanceof(Controller);
        });
        it("Expect marketController to have getMarketInfo() function", () => {
            expect(marketController.getMarketInfo).to.be.a('function');
        });
        it("Expect marketController to have fillMarket() function", () => {
            expect(marketController.fillMarket).to.be.a('function');
        });
        it("Expect marketController to have searchGames() function", () => {
            expect(marketController.searchGames).to.be.a('function');
        });
        it("Expect marketController to have downloadGame() function", () => {
            expect(marketController.downloadGame).to.be.a('function');
        });
    });

    describe("Behavior tests", () => {

        describe("getMarketInfo() tests", () => {
            let mockedLoader,
                mockedShowProgressbar,
                mockedHideProgressbar,
                mockedGetMarketGames,
                mockedFillMarket,
                context;

            beforeEach(() => {
                mockedLoader = sinon.stub(templateLoader, 'loadTemplate');
                mockedLoader.returns(Promise.resolve('html'));

                mockedGetMarketGames = sinon.stub(marketDataService, 'getMarketGames');
                mockedGetMarketGames.returns(Promise.resolve('data'));

                mockedFillMarket = sinon.stub(marketController, 'fillMarket');

                mockedShowProgressbar = sinon.stub(utils, 'showProgressbar');
                mockedShowProgressbar.returns(Promise.resolve());

                mockedHideProgressbar = sinon.stub(utils, 'hideProgressbar');

                context = sinon.spy();
            });

            afterEach(() => {
                mockedLoader.restore();
                mockedShowProgressbar.restore();
                mockedHideProgressbar.restore();
                mockedGetMarketGames.restore();
                mockedFillMarket.restore();
            });

            it("Expect getMarketInfo() to call templateLoader() twice", (done) => {
                marketController.getMarketInfo(context)
                    .then(() => {
                        expect(mockedLoader).to.been.calledTwice;
                    })
                    .then(done, done);
            });
            it("Expect getMarketInfo() to call getMarketGames() once", (done) => {
                marketController.getMarketInfo(context)
                    .then(() => {
                        expect(mockedGetMarketGames).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect getMarketInfo() to call show and hide progressbar functions once", (done) => {
                marketController.getMarketInfo(context)
                    .then(() => {
                        expect(mockedShowProgressbar).to.been.calledOnce;
                        expect(mockedHideProgressbar).to.been.calledOnce;
                    })
                    .then(done, done);
            });
        });

        describe("downloadGame() tests", () => {
            let mockedGetGameInfo,
                mockedShowDownloadSuggestion,
                mockedShowLoginSuggestion,
                mockedIsLoggedUser,
                mockedDownloadGame,
                mockedShowSuccessAlert,
                mockedShowWarningAlert,
                mockedShowErrorAlert,
                mockedEvent;

            beforeEach(() => {
                mockedGetGameInfo = sinon.stub(marketDataService, 'getGameInfo');
                mockedGetGameInfo.returns(Promise.resolve({ id: 'id', name: 'name', img: 'img' }));

                mockedShowDownloadSuggestion = sinon.stub(notificator, 'showDownloadSuggestion');
                mockedShowDownloadSuggestion.returns(Promise.resolve(5));

                mockedShowLoginSuggestion = sinon.stub(notificator, 'showLoginSuggestion');

                mockedIsLoggedUser = sinon.stub(userDataService, 'isLoggedUser');
                mockedIsLoggedUser.returns(true);

                mockedDownloadGame = sinon.stub(userProfileService, 'downloadGame');
                mockedDownloadGame.returns(Promise.resolve());

                mockedShowSuccessAlert = sinon.stub(notificator, 'showSuccessAlert');
                mockedShowWarningAlert = sinon.stub(notificator, 'showWarningAlert');
                mockedShowErrorAlert = sinon.stub(notificator, 'showErrorAlert');

                mockedEvent = { currentTarget: 'target' };
            });

            afterEach(() => {
                mockedGetGameInfo.restore();
                mockedShowDownloadSuggestion.restore();
                mockedShowLoginSuggestion.restore();
                mockedIsLoggedUser.restore();
                mockedDownloadGame.restore();
                mockedShowSuccessAlert.restore();
                mockedShowWarningAlert.restore();
                mockedShowErrorAlert.restore();
            });

            it("Expect downloadGame() to call getGameInfo() once", (done) => {
                marketController.downloadGame(mockedEvent)
                    .then(() => {
                        expect(mockedGetGameInfo).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect downloadGame() to call downloadGame() when showDownloadSuggestion() resolves and isLoggedUser() is true", (done) => {
                marketController.downloadGame(mockedEvent)
                    .then(() => {
                        expect(mockedIsLoggedUser).to.been.calledOnce;
                        expect(mockedDownloadGame).to.been.calledOnce;
                        expect(mockedShowSuccessAlert).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect downloadGame() to call showLoginSuggestion() when showDownloadSuggestion() resolves and isLoggedUser is false", (done) => {
                mockedIsLoggedUser.restore();
                mockedIsLoggedUser = sinon.stub(userDataService, 'isLoggedUser');
                mockedIsLoggedUser.returns(false);

                marketController.downloadGame(mockedEvent)
                    .then(() => {
                        expect(mockedIsLoggedUser).to.been.calledOnce;
                        expect(mockedShowLoginSuggestion).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect downloadGame() to call showWarningAlert() when showDownloadSuggestion() resolves and isLoggedUser() is true", (done) => {
                mockedDownloadGame.restore();
                mockedDownloadGame = sinon.stub(userProfileService, 'downloadGame');
                mockedDownloadGame.returns(Promise.reject());

                marketController.downloadGame(mockedEvent)
                    .then(() => {
                        expect(mockedIsLoggedUser).to.been.calledOnce;
                        expect(mockedDownloadGame).to.been.calledOnce;
                        expect(mockedShowWarningAlert).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect downloadGame() to call showErrorAlert() when showDownloadSuggestion() rejects", (done) => {
                mockedShowDownloadSuggestion.restore();
                mockedShowDownloadSuggestion = sinon.stub(notificator, 'showDownloadSuggestion');
                mockedShowDownloadSuggestion.returns(Promise.reject());

                marketController.downloadGame(mockedEvent)
                    .then(() => {
                        expect(mockedShowDownloadSuggestion).to.been.calledOnce;
                        expect(mockedShowErrorAlert).to.been.calledOnce;
                    })
                    .then(done, done);
            });
        });
    });
});
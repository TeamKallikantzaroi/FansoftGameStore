import { marketDataService } from 'marketData-service';

import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

const { expect } = chai;

describe("marketDataService tests", () => {

    describe("Correct marketDataService object tests", () => {

        describe("properties", () => {
            it("Expect marketDataService to exist", () => {
                expect(marketDataService).to.exist;
            });
            it("Expect marketDataService to be an object", () => {
                expect(marketDataService).to.be.an('object');
            });
            it("Expect marketDataService to inherit data service", () => {
                expect(marketDataService).to.be.an.instanceof(DataService);
            });
            it("Expect marketDataService to have correct paginator constants", () => {
                const MARKET_PAGINATOR_SIZE = 7,
                    MARKET_PAGES_COUNT = 20;

                expect(marketDataService.MARKET_PAGINATOR_SIZE).to.equal(MARKET_PAGINATOR_SIZE);
                expect(marketDataService.MARKET_PAGES_COUNT).to.equal(MARKET_PAGES_COUNT);
            });
            it("Expect marketDataService to have correct public game api constants", () => {
                const ACCESS_TOKEN_NAME = 'X-Mashape-Key',
                    ACCESS_TOKEN = '7iXPtqDglVmshogWh4DMVsY8vhXVp1eDka9jsnnHku669QzpZ3',
                    MARKET_DOMAIN = 'https://igdbcom-internet-game-database-v1.p.mashape.com',
                    GAMES_RESOURCE = '/games/',
                    MARKET_QUERY = '?fields=name,cover,popularity&limit=18&offset=',
                    SEARCH = '';

                expect(marketDataService.ACCESS_TOKEN_NAME).to.equal(ACCESS_TOKEN_NAME);
                expect(marketDataService.ACCESS_TOKEN).to.equal(ACCESS_TOKEN);
                expect(marketDataService.MARKET_DOMAIN).to.equal(MARKET_DOMAIN);
                expect(marketDataService.GAMES_RESOURCE).to.equal(GAMES_RESOURCE);
                expect(marketDataService.MARKET_QUERY).to.equal(MARKET_QUERY);
                expect(marketDataService.SEARCH).to.equal(SEARCH);
            });
            it("Expect marketDataService to have correct success download alert message constants", () => {
                const SUCCESSFULL_DOWNLOAD_ALLERT_TITLE = "Downloaded!",
                    SUCCESSFULL_DOWNLOAD_ALLERT_MESSAGE = "The game is in your profile and ready to play!";

                expect(marketDataService.SUCCESSFULL_DOWNLOAD_ALLERT_TITLE).to.equal(SUCCESSFULL_DOWNLOAD_ALLERT_TITLE);
                expect(marketDataService.SUCCESSFULL_DOWNLOAD_ALLERT_MESSAGE).to.equal(SUCCESSFULL_DOWNLOAD_ALLERT_MESSAGE);
            });
            it("Expect marketDataService to have correct invalid download alert message constants", () => {
                const INVALID_DOWNLOAD_ALLERT_TITLE = "Already downloaded",
                    INVALID_DOWNLOAD_ALLERT_MESSAGE = "You alredy have this game!";

                expect(marketDataService.INVALID_DOWNLOAD_ALLERT_TITLE).to.equal(INVALID_DOWNLOAD_ALLERT_TITLE);
                expect(marketDataService.INVALID_DOWNLOAD_ALLERT_MESSAGE).to.equal(INVALID_DOWNLOAD_ALLERT_MESSAGE);
            });
            it("Expect marketDataService to have correct cancelled download alert message constants", () => {
                const CANCELLED_DOWNLOAD_ALLERT_TITLE = "Cancelled",
                    CANCELLED_DOWNLOAD_ALLERT_MESSAGE = "Eh, maybe next time :)";

                expect(marketDataService.CANCELLED_DOWNLOAD_ALLERT_TITLE).to.equal(CANCELLED_DOWNLOAD_ALLERT_TITLE);
                expect(marketDataService.CANCELLED_DOWNLOAD_ALLERT_MESSAGE).to.equal(CANCELLED_DOWNLOAD_ALLERT_MESSAGE);
            });
        });

        describe("functions", () => {
            it("Expect marketDataService to have getMarketGames() function", () => {
                expect(marketDataService.getMarketGames).to.be.a('function');
            });
            it("Expect marketDataService to have getGameInfo() function", () => {
                expect(marketDataService.getGameInfo).to.be.a('function');
            });
            it("Expect marketDataService to have getSearchQuery() function", () => {
                expect(marketDataService.getSearchQuery).to.be.a('function');
            });
        });
    });

    describe("Behavior tests", () => {

        describe("getMarketGames() tests", () => {
            let mockedRequester,
                mockedContext;

            beforeEach(() => {
                mockedRequester = sinon.stub(marketDataService.requester, 'getJSON');
                mockedRequester.returns(Promise.resolve());

                mockedContext = { params: { page: 1, search: 'zelda' } }
            });

            afterEach(() => {
                mockedRequester.restore();
            });

            it("Expect getMarketGames() to call requester once", (done) => {
                marketDataService.getMarketGames(mockedContext)
                    .then(() => {
                        expect(mockedRequester).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect getMarketGames() to pass valid url to the requester", (done) => {
                const expectedDomain = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

                marketDataService.getMarketGames(mockedContext)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain(expectedDomain);
                    })
                    .then(done, done);
            });
            it("Expect getMarketGames() to add search to the query when search is passed", (done) => {
                marketDataService.getMarketGames(mockedContext)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.contain('search');
                    })
                    .then(done, done);
            });
            it("Expect getMarketGames() to not add search to the query when search is not passed", (done) => {
                mockedContext = { params: { page: 1 } };

                marketDataService.getMarketGames(mockedContext)
                    .then(() => {
                        expect(mockedRequester.getCall(0).args[0]).to.not.contain('search');
                    })
                    .then(done, done);
            });
        });

        describe("getGameInfo() tests", () => {
            let mockedAttr,
                mockedFind,
                mockedHtml,
                mockedChildren,

                spyElement;

            beforeEach(() => {
                mockedAttr = sinon.stub($.fn, 'attr');
                mockedAttr.onCall(0).returns(5);
                mockedAttr.onCall(1).returns('url');

                mockedHtml = sinon.stub($.fn, 'html');
                mockedHtml.returns('html');

                mockedFind = sinon.stub($.fn, 'find');
                mockedFind.returns({ html: mockedHtml });

                mockedChildren = sinon.stub($.fn, 'children');
                mockedChildren.returns({ attr: mockedAttr });

                spyElement = sinon.spy();
            });

            afterEach(() => {
                mockedAttr.restore();
                mockedFind.restore();
                mockedHtml.restore();
                mockedChildren.restore();
            });

            it("Expect getGameInfo() to call jQuery functions exact amount of times", (done) => {
                marketDataService.getGameInfo(spyElement)
                    .then(() => {
                        expect(mockedAttr).to.be.calledTwice;
                        expect(mockedFind).to.be.calledOnce;
                        expect(mockedHtml).to.be.calledOnce;
                        expect(mockedChildren).to.be.calledOnce;

                    })
                    .then(done, done);
            });
            it("Expect getGameInfo() to return resolved promise with the expected data", (done) => {
                marketDataService.getGameInfo(spyElement)
                    .then((gameInfo) => {
                        expect(gameInfo.id).to.be.equal(5);
                        expect(gameInfo.name).to.be.equal('html');
                        expect(gameInfo.img).to.be.equal('url');
                    })
                    .then(done, done);
            });
        });
    });
});
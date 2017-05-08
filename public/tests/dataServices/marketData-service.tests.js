import { marketDataService } from 'marketData-service';

import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

const { expect } = chai;

describe("marketDataService tests", () => {

    describe("Correct marketDataService object tests", () => {
        it("Expect marketDataService to exist", () => {
            expect(marketDataService).to.exist;
        });
        it("Expect marketDataService to be an object", () => {
            expect(marketDataService).to.be.an('object');
        });
        it("Expect marketDataService to inherit data service", () => {
            expect(marketDataService).to.be.an.instanceof(DataService);
        });
    });
});

// import 'mocha';
// import 'chai';
// import 'sinon';
// import 'sinon-chai';
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
    });
});
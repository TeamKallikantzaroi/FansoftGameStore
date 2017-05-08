import { userDataService } from 'userData-service';
const { expect } = chai;

import 'mocha';
import 'chai';
import 'sinon';
import 'sinon-chai';

describe("User data service tests", () => {
    it("Expect user data service to exist", () => {
        expect(userDataService).to.exist;
    })
})
const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();

chai.use(chaiHTTP);

describe("site", () => {
    // DESCRIBE WHAT YOU ARE TESTING
    it("should have home page", done => {
        // DESCRIBE WHAT SHOULD HAPPEN
        // IN THIS TEST CASE WE TEST THAT THE HOME PAGE LOADS
        chai
            .request("localhost:3000")
            .get("/")
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done(); // CALL DONE IF THE TEST IS SUCCESSFULL
            });
    });
});

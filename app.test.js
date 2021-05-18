const request = require("supertest");
const app = require("./index");

describe(" Json Requests", () => {
  test("it accept json requests", done => {
    request(app)
      .get("/")
      .send({ request: "json-request" })
      .then(res => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  test("it rejects non json requests with an error", done => {
    request(app)
      .get("/")
      .set("Content-Type", "text/plain")
      .send("hello")
      .then(res => {
        expect(res.statusCode).toBe(500);
        done();
      });
  });

  test("it handles other errors other than syntax errors", done => {
    request(app)
      .get("/")
      .send({
        request:
          "Too long json request sent to the the server exceeding the limit"
      })
      .then(res => {
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe("An error occurred in the request");
        done();
      });
  });
});

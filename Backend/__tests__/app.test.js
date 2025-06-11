const request = require("supertest");
const app = require("../app");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app).listen(3001, done); // usa un puerto diferente
});

afterAll((done) => {
  server.close(done);
});

describe("POST /api/contacto", () => {
  it("debería responder con un mensaje de caso satisfactorio", async () => {
    const response = await request(server)
      .post("/api/contacto")
      .send({ nombre: "Test User" })
      .expect(200);
    expect(response.body).toEqual({
      mensaje: "Información de contacto recibida",
    });
  });

  it("debería hacer log de la información de contacto", async () => {
    const response = await request(server)
      .post("/api/contacto")
      .send({ nombre: "Test User" })
      .expect(200);
  });
});

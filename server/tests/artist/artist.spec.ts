import "dotenv/config";

// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../src/app";

// Import databaseClient
import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Test suite for the GET /api/items route
describe("GET /api/artist", () => {
  it("should fetch artist successfully", async () => {
    const rows = [] as Rows;
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);
    const response = await supertest(app).get("/api/artist");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/items/:id route
describe("GET /api/artist/:id", () => {
  it("should fetch a single artist successfully", async () => {
    const rows = [{}] as Rows;
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);
    const response = await supertest(app).get("/api/artist/1");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });
  it("should fail on invalid id", async () => {
    const rows = [] as Rows;
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);
    const response = await supertest(app).get("/api/artist/0");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/items route
// Doesn't pass: maybe something to change in app config :/
describe("POST /api/artist", () => {
  it("should add a new artist successfully", async () => {
    const result = { insertId: 1 } as Result;
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);
    const fakeArtist = { name: "foo", bio: "bar" };
    const response = await supertest(app).post("/api/artist").send(fakeArtist);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
  it("should fail on invalid request body", async () => {
    const result = { insertId: 1 } as Result;
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);
    const fakeArtist = { bio: "bar" };
    const response = await supertest(app).post("/api/artist").send(fakeArtist);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });
});

// Test suite for the PUT /api/items/:id route
// This route is not yet implemented :/
describe("PUT /api/artist/:id", () => {
  it("should update an existing item successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data
    const fakeItem = { title: "foo", user_id: 0 };

    // Send a PUT request to the /api/items/:id endpoint with a test item
    const response = await supertest(app).put("/api/artist/42").send(fakeItem);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data with missing user_id
    const fakeItem = { title: "foo" };

    // Send a PUT request to the /api/items/:id endpoint with a test item
    const response = await supertest(app).put("/api/artist/42").send(fakeItem);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Mock result of the database query
    const result = { affectedRows: 0 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data with missing user_id
    const fakeItem = { title: "foo", user_id: 0 };

    // Send a PUT request to the /api/items/:id endpoint with a test item
    const response = await supertest(app).put("/api/artist/43").send(fakeItem);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the DELETE /api/items/:id route
// This route is not yet implemented :/
describe("DELETE /api/artist/:id", () => {
  it("should delete an existing item successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /api/items/:id endpoint
    const response = await supertest(app).delete("/api/artist/42");

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Mock result of the database query
    const result = { affectedRows: 0 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /api/items/:id endpoint
    const response = await supertest(app).delete("/api/artist/43");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

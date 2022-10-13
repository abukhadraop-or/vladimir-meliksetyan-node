const { registerUser } = require("../controllers/userControllers");
const { User } = require("../models");

jest.mock("../models");

const results = {};
const mockResponse = {
  send: (message) => {
    results.message = message;
    return mockResponse;
  },
  status: (code) => {
    results.code = code;
    return mockResponse;
  },
};

const mockRequest = {
  body: {
    username: "test",
    email: "test@test.test",
    password: "testPassword",
  },
};

const mockNext = (message) => {
  return message;
};

describe("unit testing /user/register route", () => {
  it("register controller", async () => {
    await registerUser(mockRequest, mockResponse, mockNext);

    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({ email: mockRequest.body.email })
    );
  });

  it("registration successfully done", async () => {
    await registerUser(mockRequest, mockResponse,mockNext);
    expect(results).toHaveProperty("code", 201);
  });
});

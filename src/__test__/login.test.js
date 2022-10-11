const { userLogin } = require("../controllers/userControllers");
const { User } = require("../models");

jest.mock("../models");
jest.mock("jsonwebtoken");

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
  json: (message) => {
    results.message = message;
    return mockResponse;
  },
};

const mockRequest = {
  body: {
    email: "000@000.000",
    password: "000",
  },
};

describe("unit testing /user/login route", () => {
  it("login controller", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue({
      dataValues: {
        password:
          "$2b$10$PpW32e3Bc5NnsH//nGNrSeBsWDXq/zTII04AztAzZ5fMGOER9drdW",
      },
    });
    await userLogin(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: mockRequest.body.email }
    });
    expect(results).toHaveProperty("code", 401); 
  });
});

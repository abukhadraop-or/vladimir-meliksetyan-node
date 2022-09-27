/* eslint-disable no-undef */
const middleware = require("../middleware");
const jwt = require("jsonwebtoken");

describe("Authorization middleware", () => {
  class NoErrorThrownError extends Error {}
  const getError = async (call) => {
    try {
      await call();

      throw new NoErrorThrownError();
    } catch (error) {
      return error;
    }
  };

  let mockRequest, mockResponse;

  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test("without authorization headers", async () => {
    const error = await getError(async () =>
      middleware(mockRequest, mockResponse, nextFunction)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty("statusCode", 401);
    expect(error).toHaveProperty("message", "Authorization header required!");
  });

  test('with "authorization" header', async () => {
    mockUser = {
      id: "3c9d7415-16de-4066-b910-594c87b29b5e",
      email: "test.optimumpartners.co",
      password: "password",
    };
    const token = jwt.sign(mockUser, SECRET, { expiresIn: "24h" });
    mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    authorizationMiddleware(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});

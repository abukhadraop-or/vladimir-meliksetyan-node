const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require("../controllers/moviesControllers");
const { Movie } = require("../models");

jest.mock("../models");
const results = {};
const mockResponse = {
  send: (Movies) => {
    results.Movies = Movies;
    return mockResponse;
  },
  status: (code) => {
    results.code = code;
    return mockResponse;
  },
  json: (message)=>{
    results.message = message
    return mockResponse
  }
};

const mockRequest = {
  user: {
    id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
  },
  body: {
    id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
  },
  params: {
    id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
  },
};

const mockNext = (message) => {
  return message;
};

describe("unit testing /movies/getAllMovies route", () => {
  it("taking user moives", async () => {
    await getAllMovies(mockRequest, mockResponse);

    expect(Movie.findAll).toHaveBeenCalled();
  });

  it("Movies were successfully taken from DB", async () => {
    await getAllMovies(mockRequest, mockResponse);

    expect(results.message).toHaveProperty("code",200);
  });
  it("add Movies to user account", async () => {
    const mockRequestMovies = {
      body: {
        original_language: "tfffffffffff",
        backdrop_path: "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
        original_title: "ftttttttttttt",
        overview: "fttttttttttttttt",
        popularity: "0",
        poster_path: "/iRV0IB5xQeOymuGGUBarTecQVAl.jpg",
        release_date: "08/30/2022",
        title: "ftttttttttttt",
        vote_average: "4",
        user_id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
      },
      user: {
        id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
      },
    };
    await addMovie(mockRequestMovies, mockResponse);
    expect(Movie.create).toHaveBeenCalledWith(
      expect.objectContaining({ overview: mockRequestMovies.body.overview })
    );
  });

  it("delete movie", async () => {
    await deleteMovie(mockRequest, mockResponse,mockNext);
    expect(Movie.findAll).toHaveBeenCalledWith({
      where: { id: mockRequest.params.id },
    });
    expect(results).toHaveProperty("code", 201);
  });
});

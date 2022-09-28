const {
  getAllMovies,
  addMovie,
  deleteFilm,
} = require("../controllers/moviesControllers");
const { movies } = require("../models");

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
};

const mockRequest = {
  user: {
    id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
  },
  body: {
    id: "1eb05c97-6ecb-4325-8ad3-ffbbaf43a679",
  },
};

describe("unit testing /movies/getAllMovies route", () => {
  it("taking user moives", async () => {
    await getAllMovies(mockRequest, mockResponse);

    expect(movies.findAll).toHaveBeenCalledWith({
      where: { user_id: mockRequest.user.id },
    });
  });

  it("Movies were successfully taken from DB", async () => {
    await getAllMovies(mockRequest, mockResponse);

    expect(results).toHaveProperty("Movies");
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
    expect(movies.create).toHaveBeenCalledWith(
      expect.objectContaining({ overview: mockRequestMovies.body.overview })
    );
  });

  it("delete movie", async () => {
    await deleteFilm(mockRequest, mockResponse);
    expect(movies.destroy).toHaveBeenCalledWith({
      where: { id: mockRequest.user.id },
    });
    expect(results).toHaveProperty("code", 201);
  });
});

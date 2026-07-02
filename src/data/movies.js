import topgun from "../assets/posters/topgun.jpg";
import spiderman from "../assets/posters/spiderman.jpg";
import mario from "../assets/posters/mario.jpg";
import office from "../assets/posters/office.jpg";
import strangerthings from "../assets/posters/strangerthings.jpg";
import breakingbad from "../assets/posters/breakingbad.jpg";
const movies = [
  {
    id: 1,
    title: "Top Gun: Maverick",
    type: "Movie",
    genre: "Action",
    synopsis:
      "After more than thirty years of service, Maverick trains a new generation of Navy pilots for a dangerous mission.",
    cast: "Tom Cruise, Miles Teller, Jennifer Connelly",
    duration: "2h 11m",
    rating: "PG-13",
    trending: true,
    recommended: true,
    image: topgun,
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    type: "Movie",
    genre: "Action",
    synopsis:
      "Peter Parker asks Doctor Strange for help after his identity is revealed.",
    cast: "Tom Holland, Zendaya",
    duration: "2h 28m",
    rating: "PG-13",
    trending: true,
    recommended: false,
    image: spiderman,
  },
  {
    id: 3,
    title: "The Super Mario Bros. Movie",
    type: "Movie",
    genre: "Animation",
    synopsis: "Mario and Luigi are transported to the Mushroom Kingdom.",
    cast: "Chris Pratt, Anya Taylor-Joy",
    duration: "1h 32m",
    rating: "PG",
    trending: false,
    recommended: true,
    image: mario,
  },
  {
    id: 4,
    title: "The Office",
    type: "TV Show",
    genre: "Comedy",
    synopsis: "A mockumentary following employees at Dunder Mifflin.",
    cast: "Steve Carell, Rainn Wilson",
    duration: "9 Seasons",
    rating: "TV-14",
    trending: true,
    recommended: true,
    image: office,
  },
  {
    id: 5,
    title: "Stranger Things",
    type: "TV Show",
    genre: "Sci-Fi",
    synopsis: "Kids uncover supernatural mysteries in their small town.",
    cast: "Millie Bobby Brown, Finn Wolfhard",
    duration: "4 Seasons",
    rating: "TV-14",
    trending: true,
    recommended: true,
    image: strangerthings,
  },
  {
    id: 6,
    title: "Breaking Bad",
    type: "TV Show",
    genre: "Crime, Drama",
    synopsis:
        "A high school chemistry teacher turns to manufacturing methamphetamine after being diagnosed with cancer.",
    cast: "Bryan Cranston, Aaron Paul, Anna Gunn",
    duration: "5 Seasons",
    rating: "TV-MA",
    trending: true,
    recommended: true,
    image: breakingbad,
  },
];

export default movies;
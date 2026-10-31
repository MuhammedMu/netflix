import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../requests";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
// import ReactPlayer from "react-player";

function Banner() {
    const [movies, setMovies] = useState([]);

    const [trailerUrl, setTrailerUrl] = useState("");

    // console.log(requests.fetchNetflixOriginals);

    useEffect(() => {
      axios
        .get(requests.fetchNetflixOriginals)
        .then((request) => {
          // pick a random title that has a backdrop image
          const withImage = (request?.data?.results || []).filter(
            (m) => m.backdrop_path
          );
          if (withImage.length) {
            setMovies(withImage[Math.floor(Math.random() * withImage.length)]);
          }
        })
        .catch((err) => console.log("Could not load banner:", err.message));
    }, []);

    function truncate(str, n) {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  
  // for (let i = 0; i <= 20; i++){
  //   console.log(movies);
  // }

    const handleClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        // calling show movie function
        // MouseOver(movie);

        movieTrailer(movie?.title || movie?.name || movie?.original_name)
          .then((url) => {
            // console.log(url)
            const urlParams = new URLSearchParams(new URL(url).search);
            // console.log(urlParams.get("v"));
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((err) => {
            console.log(err);
          });
      }
  };

  const opts = {
    height: "470px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

    // console.log(movies)
    return (
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: movies?.backdrop_path
            ? `url("https://image.tmdb.org/t/p/original/${movies.backdrop_path}")`
            : "none",
          backgroundPosition: "center center",
        }}
      >
        {/* <ReactPlayer
          playing={true}
          loop={true}
          width="100%"
          height="100%"
          volume={1}
          muted={true}
          className="header__video"
          url="https://vimeo.com/384025132"
        /> */}
        <div className="all-wraper">
          <div>
            <h1 className="title">
              {movies?.title || movies?.name || movies?.original_name}
            </h1>

            <div className="buttons">
              <div className="play">
                <button
                  onClick={() => {
                    handleClick(movies);
                  }}
                >
                  Play
                </button>
                <button>Mylist</button>
              </div>
            </div>

            <div>
              <h5 className="overview">{truncate(movies?.overview, 150)}</h5>
            </div>

            <div className="video-background">
              <div className="video-forground">
                {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
              </div>
            </div>

            <div className="banner-fade"></div>
          </div>
        </div>
      </header>
    );
}
export default Banner;

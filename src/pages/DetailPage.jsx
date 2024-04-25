import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgURL, options } from "../constant";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";


const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2C%20videos%2C%20reviews&language=en-US`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);

  console.log(movie);

  return (
    <div className="row">
      {!movie ? (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImgURL + movie.backdrop_path}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          <div className="col-md-6 mt-4 p-4">
            <h3>Production Companies</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_companies.map((i) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  {i.logo_path ? (
                    <img
                      className="object-fit-contain"
                      width={120}
                      height={60}
                      src={baseImgURL + i.logo_path}
                    />
                  ) : (
                    <span className="company">{i.name}</span>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-4">Spoken Languages</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.spoken_languages.map((i) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  
                    <span className="company">{i.name}</span>
                  
                </div>
              ))}
            </div>

            <h3 className="mt-4">Production Countries</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_countries.map((i) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                 
                    <span className="company">{i.name}</span>
                  
                </div>
              ))}
            </div>


          </div>

          <div className="col-md-6 mt-4 p-4">
            <p className="lead">{movie.overview}</p>

            <p className="fs-5">
              <span className="fw-bold">Budget: </span>
              <span className="text-success">{millify(movie.budget)} $</span>
            </p>

            <p className="fs-5">
              <span className="fw-bold">Revenue: </span>
              <span className="text-success">{millify(movie.revenue)} $</span>
            </p>

          </div>

          <div className="col-12 p-4 my-3">
            <h2>Cast</h2>

            <Splide
              options= {{
                height: '200px',
                gap: '10px',
                pagination: false,
                autoWidth: true
              }}>
                {movie.credits.cast.map((i) => (
                  <SplideSlide>
                  <div className="actor-card h-100">
                   <img className="movie" src={i.profile_path ? baseImgURL + i.profile_path : "/default.jpg"} />
                   <p>
                    <span>{i.character}</span>
                    <span>{i.name}</span>
                   </p>
                  </div>
                </SplideSlide>
                ))}
              
            </Splide>
          </div>

          {/*<div>
            {movie.videos.results.map((video) => (
              <iframe
               width="420"
               height="315"
               src={`https://www.youtube.com/embed/${video.key}`}></iframe>
            ))}
            </div>*/}

        </>
      )}
    </div>
  );
};

export default DetailPage;

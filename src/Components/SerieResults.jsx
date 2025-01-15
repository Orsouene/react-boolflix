import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const langFlag = ["en", "it", "fr", "es", "de", "us", "ja", "ko"];

function SeriesResults() {
  const { Series, searchDone } = useContext(GlobalContext);

  const getFlagCode = (language) => {
    const code = langFlag.includes(language.toLowerCase())
      ? `${language.toLowerCase()}.png`
      : "placeholder.jpg";
    return code;
  };
  // contruire l'url
  const getImageUrl = (poster_path, size = "w500") => {
    const baseUrl = "http://image.tmdb.org/t/p/";
    return `${baseUrl}${size}${poster_path}`;
  };
  return (
    <>
      <h3>Serie Trovate</h3>
      <div className="row">
        {Series &&
          Series.map((serie) => (
            <div key={serie.id} className="col-md-3 mb-4">
              <div className="card">
                <div className="card-img-container">
                  {/* Se searchDone è false, mostra solo l'immagine */}
                  {!searchDone ? (
                    <img
                      src={getImageUrl(serie.poster_path, "w342")}
                      className="card-img-top"
                      alt={serie.name}
                    />
                  ) : (
                    <div className="card-body">
                      {/* Se searchDone è true, mostra i dettagli */}
                      <img
                        src={getImageUrl(serie.poster_path, "w342")}
                        className="card-img-top"
                        alt={serie.name}
                      />
                      <h5 className="card-title">{serie.name}</h5>
                      <div className="card-text">
                        <span>lingua :</span>
                        {/* Bandiera */}
                        <img
                          className="flags"
                          src={`/flags/${getFlagCode(serie.original_language)}`}
                          alt={serie.original_language}
                        />
                      </div>
                      <p className="card-text">
                        {"Voto: " + serie.vote_average}
                      </p>
                    </div>
                  )}
                  {/* overlay */}
                  <div className="card-overlay">
                    <h3>{serie.title}</h3>
                    <p> Voto:{serie.vote_average}</p>
                    <img
                      className="flags"
                      src={`/flags/${getFlagCode(serie.original_language)}`}
                      alt={serie.original_language}
                    />
                    <p className="text-center m-2">{serie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default SeriesResults;

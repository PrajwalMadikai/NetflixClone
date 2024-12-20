import { UserAuth } from "../context/AuthContext";
import { useTrailer } from "../context/TrailerContext";

const TrailerPlayer = () => {
  const { trailerUrl, setTrailerUrl } = useTrailer();
   const {user}=UserAuth()

  if (!user || !trailerUrl) return null;

  return (<>
    <div className="fixed w-[80%] top-12   left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-100 p-4 rounded-lg shadow-lg">
      <div className="relative pb-[53.25%] w-full h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {/* Close button */}
      <button
        onClick={() => setTrailerUrl("")}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-red-600"
      >
        ✕
      </button>
    </div>
    </>
  );
};

export default TrailerPlayer;

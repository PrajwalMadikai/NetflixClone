import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from "react-toastify";
import { UserAuth } from '../context/AuthContext';
import { useTrailer } from '../context/TrailerContext';
import { db } from '../firebase';
import { key } from '../Request';

const Movie = ({ item, apiKey }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();
    const { setTrailerUrl } = useTrailer();  
  
    const movieID = doc(db, "users", `${user?.email}`);
  
    const saveShow = async () => {
      if (user?.email) {
        setLike(!like);
        setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      } else {
        toast.error("Please log in to save the show!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }
    };
  
    const showTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${key}&language=en-US`
        );
        const data = await response.json();
         console.log(data.results);
         
         
         
        const trailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
  
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        } else {
            setTrailerUrl("")
          toast.info("Trailer not available for this movie!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
  
    return (
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div
          onClick={showTrailer}
          className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white"
        >
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation(); 
              saveShow();
            }}
          >
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    );
  };
  
  export default Movie;
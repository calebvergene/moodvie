import { useEffect, useState } from 'react';
import YoutubeVideo from './YoutubeVideo';
import GenreButtons from './GenreButtons';

const MovieBox = ({ movie_title, movie_year, movie_rating, movie_genres, movie_description, video_id }) => {

  for (let i = 0; i < movie_genres.length; i++) {
    if (movie_genres[i] === undefined) {
      movie_genres.splice(i, 1);
      i--; 
    }
  }

  var shorter_desc = movie_description.split('.');
  var new_desc = ""
  var total_char = 0
  for (let i = 0; i < shorter_desc.length; i++) {
    if (total_char < 250){
      new_desc = new_desc + shorter_desc[i] + '.'
      total_char = total_char + shorter_desc[i].length
    }
    else {
      movie_description = new_desc
      break
    }
  }

  if (movie_description === ""){
    movie_description = "Movie description is unavailable. Try watching the trailer!"
  } else if (movie_description === undefined){
    movie_description = "Movie description is unavailable. Try watching the trailer!"
  }

  return (
    <div className=''>
      <div className=''>
        <YoutubeVideo video_id={video_id}/>
      </div>
      <div className='bg-zinc-700/30 w-[640px] p-5'>
          <div>
            <h2 className='text-white text-xl font-fun font-bold mb-3'>{movie_title}</h2>
            <p className='text-white'>{movie_year} ⋅ ⭐️<span className='font-bold'>{movie_rating}</span>/10</p>
            <GenreButtons genres={movie_genres}/>
          </div>
        <p className='text-white'>{movie_description}</p>
      </div>
      
    </div>
  );
};

export default MovieBox;

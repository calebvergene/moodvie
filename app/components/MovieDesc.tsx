import { FC, useEffect, useState } from 'react';
import YoutubeVideo from './YoutubeVideo';
import GenreButtons from './GenreButtons';

interface MovieBoxProps {
  movie_title: string;
  movie_year: number;
  movie_rating: string;
  movie_genres: (string | undefined)[];
  movie_description: string;
  video_id: Promise<string> | string;
}

const MovieBox: FC<MovieBoxProps> = ({ movie_title, movie_year, movie_rating, movie_genres, movie_description, video_id }) => {
  // Clean up genres array to remove undefined values
  const cleanedGenres = movie_genres.filter((genre): genre is string => genre !== undefined);

  // Shorten the description to 250 characters or less
  const shortenDescription = (description: string): string => {
    const sentences = description.split('.');
    let newDesc = '';
    let totalChar = 0;

    for (const sentence of sentences) {
      if (totalChar + sentence.length + 1 < 250) { // +1 for the period
        newDesc += sentence + '.';
        totalChar += sentence.length + 1;
      } else {
        break;
      }
    }

    return newDesc || 'Movie description is unavailable. Try watching the trailer!';
  };

  const resolvedDescription = shortenDescription(movie_description);

  return (
    <div className=''>
      <div className=''>
        <YoutubeVideo video_id={video_id}/>
      </div>
      <div className='bg-zinc-700/30 w-[640px] p-5'>
        <div>
          <h2 className='text-white text-xl font-fun font-bold mb-3'>{movie_title}</h2>
          <p className='text-white'>{movie_year} ⋅ ⭐️<span className='font-bold'>{movie_rating}</span>/10</p>
          <GenreButtons genres={cleanedGenres}/>
        </div>
        <p className='text-white'>{resolvedDescription}</p>
      </div>
    </div>
  );
};

export default MovieBox;

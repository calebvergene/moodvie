import YouTube from 'react-youtube';
import YoutubeVideo from '../components/YoutubeVideo';
import MovieBox from '../components/MovieDesc'
import Link from 'next/link';


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDM0NDQ1YzE4M2JkMTM5N2Q1Y2Y0YjdkYjA2MTdiZiIsInN1YiI6IjY2M2QxZjFmNTgzYjU0YjIwYjFlZmU5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cAkX_SkBah-gEPAVAKc4-eW-MvuduS1fVybtEznWpCg'
    }
  };

const genres = [
    {
        "id": 28,
        "name": "Action",
        "mood": "Tired"
      },
      {
        "id": 12,
        "name": "Adventure",
        "mood": "Adventerous"
      },
      {
        "id": 16,
        "name": "Animation",
        "mood": "Anxious"
      },
      {
        "id": 35,
        "name": "Comedy",
        "mood": "Giggly"
      },
      {
        "id": 80,
        "name": "Crime",
        "mood": "Active"
      },
      {
        "id": 99,
        "name": "Documentary",
        "mood": "Reflective"
      },
      {
        "id": 18,
        "name": "Drama",
        "mood": "Gloomy"
      },
      {
        "id": 14,
        "name": "Fantasy",
        "mood": "Carefree"
      },
      {
        "id": 27,
        "name": "Horror",
        "mood": "Brave"
      },
      {
        "id": 9648,
        "name": "Mystery",
        "mood": "Bored"
      },
      {
        "id": 10749,
        "name": "Romance",
        "mood": "Romantic"
      },
      {
        "id": 878,
        "name": "Science Fiction",
        "mood": "Zooted"
      },
      {
        "id": 10770,
        "name": "TV Movie",
        "mood": "Cozy"
      },
      {
        "id": 53,
        "name": "Thriller",
        "mood": "Happy"
      },
      {
        "id": 10752,
        "name": "War",
        "mood": "Angry"
      },
      {
        "id": 16,
        "name": "Animation",
        "mood": "Lonely"
      },
];

function getGenreNameById(genreId: number): string | undefined {
    const genre = genres.find(genre => genre.id === genreId);
    return genre ? genre.name : undefined;
}

function getGenreIdByMood(mood: string): number | undefined {
    const genre = genres.find(genre => genre.mood === mood);
    return genre ? genre.id : undefined;
  }

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const App = async ({ searchParams }: { searchParams: { name: string } }) => {

  var new_name = searchParams.name
  var genre_id = getGenreIdByMood(new_name)
  var page_num = getRandomNumber(1, 3)

  //fetch data from movie api: 19 movies in the specific genre
  async function callMovieAPI(page_num: number, genre_id: number | undefined) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page_num}&sort_by=popularity.desc&with_genres=${genre_id}&watch_region=United%20States&with_runtime.gte=60`, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

    const movie_json = await callMovieAPI(page_num, genre_id);
    // retrieves specific movie information
    function retrieveMovieElements(movie_json: { results: { [x: string]: {
      release_date: any;
      title: any;
      vote_average(vote_average: any): unknown;
      genre_ids: any; overview: any; 
}; }; }, movie_count: number){
        var movie_genres = []
        
        for (let i=0; i < movie_json.results[movie_count].genre_ids.length; i++){
            movie_genres.push(getGenreNameById(movie_json.results[movie_count].genre_ids[i]))
        }
        var movie_dict = {'movie_title':movie_json.results[movie_count].title, 'movie_year': movie_json.results[movie_count].release_date.slice(0, 4),
            'movie_rating':String(movie_json.results[movie_count].vote_average).slice(0,3), 'movie_genres':movie_genres,
            'movie_description':movie_json.results[movie_count].overview
        }
        return movie_dict
    }

    var movie_num = 0

    const handleClick = () => {
    movie_num = movie_num + 1
  };

    var movie_elements = retrieveMovieElements(movie_json, movie_num)
    console.log(movie_elements)

    async function searchYouTube(keyword:string) {
        const API_KEY = 'AIzaSyBQfI7_1x2sThPHfM7pQ7t4ivkceUAOzVs';
        const MAX_RESULTS = 1; 
    
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(keyword)}&part=snippet&type=video&maxResults=${MAX_RESULTS}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    
    var search_query = movie_elements.movie_title + "trailer"
    
    async function printVideoId() {
        try {
            const youtubeData = await searchYouTube(search_query); // this is the youtube data json
            const videoId = youtubeData?.items?.[0]?.id?.videoId;
            if (videoId) {
                return videoId
            } else {
                console.error("No video ID found.");
            }
        } catch (error) {
            console.error("Error fetching YouTube data:", error);
        }
    }

    var video_id = printVideoId();


  return (
    <div className='h-screen'>
    <div className='flex justify-center items-center h-full flex-col mt-10'>
        <div className=" bg-zinc-800 text-white p-2 fixed top-10 rounded-[10px]">
          <div className=" mx-auto flex justify-between items-center ">
          <Link href="/">
            <button className="px-2 py-2 text-sm text-center rounded-[10px] cursor-pointer transition duration-200 text-white hover:bg-zinc-700 border-transparent">
              <div className="text-xl font-bold"><svg className="h-8 w-8 text-gray-300"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg></div>
            </button>
          </Link>
            <h4 className='px-20 font-fun font-bold text-l'> Feeling {new_name} </h4>
            <div className="px-6 py-2">
            </div>
          </div>
        </div>
        <MovieBox
            movie_title={movie_elements.movie_title} 
            movie_year={movie_elements.movie_year} 
            movie_rating={movie_elements.movie_rating} 
            movie_genres={movie_elements.movie_genres} 
            movie_description={movie_elements.movie_description} 
            video_id={video_id}
        />
        <div className='bg-zinc-700/30 w-[640px] pb-5'>
          <div className='flex justify-center'>
            <button className="mt-3 ml-[500px] px-2 py-2 text-sm text-center rounded-[10px] cursor-pointer transition duration-200 text-white bg-zinc-700 hover:bg-zinc-600 border-transparent">
              <svg className="h-8 w-8 text-gray-300"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          </div>
        <h4 className='flex justify-center mt-8 text-gray-300 font-fun font-semibold'>Next button has been disabled due to Movie and Youtube API limit ⏱️</h4>
      </div>
    </div>
  );
};

export default App;
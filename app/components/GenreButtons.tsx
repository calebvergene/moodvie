import React from 'react';

interface GenreProps {
    genres: string[];
}

const GenreButtons: React.FC<GenreProps> = ({ genres }) => {
    return (
        <div>
            {genres.map((genre, index) => (
                <button key={index} className="my-3 px-3 text-sm py-1 text-center rounded-[6px] border border-zinc-700 mr-3	cursor-pointer transition duration-200 text-white hover:bg-zinc-700 border-transparent ">
                    <p className='font-fun font-bold'>{genre}</p>
                </button>
            ))}
        </div>
    );
};

export default GenreButtons;

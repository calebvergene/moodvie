'use client';
import React from 'react';
import Link from 'next/link';


const NameWithButton = ({ name }: { name: string }) => {
  const handleClick = () => {
    let new_name = name.slice(2)
    console.log(new_name)
  };

  return (
    <div>
      <Link href={{
          pathname: '/movie',
          query: {
            name: name.slice(3)
          }
        }}>
          <button onClick={handleClick} className="p-[2px] relative m-3">
            <div className="px-2 text-xl py-3 text-center rounded-[6px] w-52 border border-zinc-700	 transition duration-200 text-white hover:bg-zinc-700 border-transparent">
              <p className='font-fun font-bold'>{name}</p>
            </div>
          </button>
      </Link>
    </div>
  );
};

// Define another functional component to render multiple instances of NameWithButton
const NamesList = ({ names }: { names: string[] }) => {
  return (
    <div>
      {/* Map over the list of names and render a NameWithButton component for each */}
      {names.map((name, index) => (
        <NameWithButton key={index} name={name} />
      ))}
    </div>
  );
};

export default NamesList;

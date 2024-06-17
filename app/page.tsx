import React from 'react';
import NamesList from './components/NamesList';
import TypewriterEffectSmooth from './components/Typewriter'

const App = () => {
  const names: string[] = ['😄 Happy', '😰 Gloomy', '🤠 Adventerous', '😊 Cozy'];
  const names2: string[] = ['😡 Angry', '🧐 Reflective', '😓 Lonely', '🥰 Romantic'];
  const names3: string[] = ['🤣 Giggly', '😣 Anxious', '🍃 Zooted', '😎 Brave'];
  const names4: string[] = ['😴 Tired', '🤩 Carefree', '😕 Bored', '😆 Active'];

  return (
    <div className=''>
      <h1 className='text-9xl flex justify-center mt-14 font-bold text-white/90'>  
        <span className="bg-gradient-to-r from-blue-200 via-blue-500 to-blue-600 bg-clip-text text-transparent">(</span>Moodvie<span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-200 bg-clip-text text-transparent">)</span>
      </h1>
      <div className='flex justify-center'>  
        <TypewriterEffectSmooth words={[
        {
          text: "Get",
        },
        {
          text: "Movie",
          className: "text-blue-500 dark:text-blue-500",
        },
        {
          text: "Suggestions",
          className: "text-blue-500 dark:text-blue-500",
        },
        {
          text: "Based",
        },
        {
            text: "on",
        },
        {
            text: "your",
        },
        {
            text: "Mood.",
            className: "text-blue-500 dark:text-blue-500",
          },
      ]}/>
    </div>      
    <h3 className='flex justify-center text-2xl mb-3 mt-14 text-white font-medium'>How are you Feeling?</h3>
      <div className='flex justify-center'>
        <div className="grid grid-cols-4 gap-4">
          <NamesList names={names} />
          <NamesList names={names2} />
          <NamesList names={names3} />
          <NamesList names={names4} />
        </div>
     </div>
      <h4 className='flex justify-center mt-10 text-white font-fun font-semibold'>Made with 🍿 by Caleb</h4>
    </div>
  );
};

export default App;

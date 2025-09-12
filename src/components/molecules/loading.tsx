import React, { useEffect, useState } from 'react';

const Loading = () => {

    const [dots, setDots] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => prev === '...' ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader-container">
        <div className="sun"></div>

        <div className="clouds">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
        </div>

        <div className="mountains">
          <div className="mountain mountain1"></div>
          <div className="mountain mountain2"></div>
        </div>
      </div>
      <div className="text-center text-primary text-2xl font-bold">Loading<span>{dots}</span>
      </div>
    </div>
  );
};

export default Loading;

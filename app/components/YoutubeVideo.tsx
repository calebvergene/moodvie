'use client'
import YouTube from 'react-youtube';
import { useEffect, useState } from 'react';

const YoutubeVideo = ({ video_id }) => {
  const [resolvedVideoId, setResolvedVideoId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Check if video_id is a promise
    if (video_id instanceof Promise) {
      // If video_id is a promise, resolve it
      video_id.then((resolvedId: string) => {
        setResolvedVideoId(resolvedId);
      })
    } else {
      // If video_id is not a promise, use it directly
      setResolvedVideoId(video_id);
    }
  }, [video_id]);

  if (!resolvedVideoId) {
    return <div>No Movie Trailer😢</div>;
  }

  return (
    <div>
      <YouTube videoId={resolvedVideoId}/>
    </div>
  );
};

export default YoutubeVideo;

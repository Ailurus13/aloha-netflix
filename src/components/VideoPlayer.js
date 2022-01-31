import { useEffect, useRef } from "react";
import { useState } from "react";

export function VideoPlayer({
  id,
  src,
  startTime = 0,
  type = "video/mp4",
  onTimeUpdate,
  className,
}) {
  const videoRef = useRef(null);
  const [lastStartTime, setLastStartTime] = useState(null);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      // Envoie du current time à chaque time update
      videoRef.current.ontimeupdate = () => {
        const currentTime = videoRef.current.currentTime;
        onTimeUpdate && onTimeUpdate(currentTime);
      };

      // Changement de la position de la video
      if (startTime && startTime !== lastStartTime) {
        setLastStartTime(startTime);
        videoRef.current.currentTime = startTime;
      }
    }
  }, [videoRef, onTimeUpdate, startTime, lastStartTime]);

  return (
    <div id={id} className={className}>
      <video ref={videoRef} className="h-full w-full" controls>
        <source src={src} type={type} />
      </video>
    </div>
  );
}

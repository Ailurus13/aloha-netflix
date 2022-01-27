import { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import styles from "./VideoPlayer.module.css";

export function VideoPlayer({
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
    <div className={className}>
      <video ref={videoRef} className={styles.video} controls>
        <source src={src} type={type} />
      </video>
    </div>
  );
}

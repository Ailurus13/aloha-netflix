import { useState, useEffect } from "react";
import { Map } from "./components/Map";
import { Chapters } from "./components/Chapters";
import { Keywords } from "./components/Keywords";
import { Chatroom } from "./components/Chatroom";
import { VideoPlayer } from "./components/VideoPlayer";
import { useMessage } from "./provider/Message";

function App() {
  const { display } = useMessage();

  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);

  const [film, setFilm] = useState();
  const [chapters, setChapters] = useState([]);

  const [allKeywords, setAllKeywords] = useState([]);
  const [currentKeywords, setCurrentKeywords] = useState([]);

  const [allWaypoints, setAllWaypoints] = useState([]);
  const [currentWaypoint, setCurrentWaypoint] = useState();

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://imr3-react.herokuapp.com/backend");
      const data = await response.json();
      setChapters(data.Chapters);
      setAllKeywords(data.Keywords);
      setAllWaypoints(data.Waypoints);
      setFilm(data.Film);
    };

    // Load data on mount
    loadData();
  }, [display]);

  useEffect(() => {
    display(
      "Attention, cette application a été réalisé pour les bonne connexions internet. Dans le cas contraire la vidéo ne charge pas et vous ne pourrez pas profiter. Bon visionnage !",
      "warning"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTimeUpdate = (time) => {
    setTime(time);

    // Regarde quel waypoint afficher
    for (const waypoint of allWaypoints) {
      if (waypoint.timestamp <= time) {
        setCurrentWaypoint(waypoint);
      }
    }

    // Regarde quel keywords afficher
    for (const keywords of allKeywords) {
      if (keywords.pos <= time) {
        setCurrentKeywords(keywords.data);
      }
    }
  };

  return (
    <div id="container">
      <div id="title" className="flex justify-center">
        <h1 className="text-xl font-bold self-center">{film?.title}</h1>
      </div>
      <VideoPlayer
        id="video"
        startTime={startTime}
        onTimeUpdate={onTimeUpdate}
        src="https://ia600900.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4"
      />
      <Chatroom
        className="p-2"
        id="chatroom"
        moment={time}
        onMessageClick={(message) => {
          if (message.moment) {
            setStartTime(message.moment);
          }
        }}
      />
      <Chapters
        id="chapters"
        onSelectChapter={(chapter) => {
          setStartTime(chapter.pos);
        }}
        chapters={chapters}
        className="p-2"
      />
      <div id="keywords" className="flex">
        <Keywords className="self-center" keywords={currentKeywords} />
      </div>
      <Map id="map" waypoint={currentWaypoint} className="p-2" />
    </div>
  );
}

export default App;

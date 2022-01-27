import { VideoPlayer } from "./components/VideoPlayer";
import { useEffect } from "react/cjs/react.development";
import { useState } from "react";
import { Chapters } from "./components/Chapters";
import { Keywords } from "./components/Keywords";
import { Map } from "./components/Map";
import styles from "./App.module.css";
import { Chatroom } from "./components/Chatroom";

function App() {
  const [startTime, setStartTime] = useState(0);

  const [chapters, setChapters] = useState([]);

  const [allKeywords, setAllKeywords] = useState([]);
  const [currentKeywords, setCurrentKeywords] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://imr3-react.herokuapp.com/backend");
      const data = await response.json();
      setChapters(data.Chapters);
      setAllKeywords(data.Keywords);
    };

    // Load data on mount
    loadData();
  }, []);

  const onTimeUpdate = (time) => {
    // Regarde quel keywords afficher
    for (const keywords of allKeywords) {
      if (keywords.pos <= time) {
        setCurrentKeywords(keywords.data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Aloha Netflix</h1>
      </div>
      <VideoPlayer
        startTime={startTime}
        onTimeUpdate={onTimeUpdate}
        className={styles.video}
        src="https://ia600900.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4"
      />
      <Chatroom className={styles.chatroom} />
      <Chapters
        className={styles.chapters}
        onSelectChapter={(chapter) => {
          setStartTime(chapter.pos);
        }}
        chapters={chapters}
      />
      <Keywords keywords={currentKeywords} className={styles.keywords} />
      <Map className={styles.map} />
    </div>
  );
}

export default App;

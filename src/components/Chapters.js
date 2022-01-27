function Chapter({ chapter, onClick }) {
  return <button onClick={onClick}>{chapter.title}</button>;
}

export function Chapters({ className, onSelectChapter, chapters = [] }) {
  return (
    <div className={className}>
      <h2>Chapitres</h2>
      {chapters.map((chapter, index) => (
        <Chapter
          key={index}
          chapter={chapter}
          onClick={() => {
            onSelectChapter && onSelectChapter(chapter);
          }}
        />
      ))}
    </div>
  );
}

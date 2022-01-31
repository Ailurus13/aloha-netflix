function Chapter({ chapter, onClick }) {
  return (
    <button className="border-2 rounded" onClick={onClick}>
      {chapter.title}
    </button>
  );
}

export function Chapters({ id, className, onSelectChapter, chapters = [] }) {
  return (
    <div id={id} className={`flex flex-col ${className}`}>
      <h2 className="text-lg font-bold">Chapitres</h2>
      <div className=" flex-1 flex flex-col gap-1 overflow-y-scroll">
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
    </div>
  );
}

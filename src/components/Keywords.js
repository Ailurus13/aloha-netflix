function Keyword({ keyword }) {
  return (
    <a
      className=" rounded bg-gray-400"
      href={keyword.url}
      target="_blank"
      rel="noreferrer"
    >
      {keyword.title}
    </a>
  );
}

export function Keywords({ keywords = [], id, className }) {
  return (
    <div id={id} className={className}>
      <div className="flex gap-2">
        <h2 className="text-lg font-bold">Mots clés : </h2>
        {keywords.length <= 0 && "No keywords"}
        {keywords.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} />
        ))}
      </div>
    </div>
  );
}

function Keyword({ keyword }) {
  return (
    <span>
      <a href={keyword.url} target="_blank" rel="noreferrer">
        {keyword.title}
      </a>
    </span>
  );
}

export function Keywords({ keywords = [], className }) {
  return (
    <div className={className}>
      <h2 style={{ display: "inline" }}>Mots clés : </h2>
      <div style={{ display: "inline" }}>
        {keywords.length <= 0 && "No keywords"}
        {keywords.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} />
        ))}
      </div>
    </div>
  );
}

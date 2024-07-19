const TabContent = ({ mapGit, tab }) => {
  if (!Array.isArray(mapGit)) {
    return null;
  }
  return (
    <>
      {mapGit.map((elem, id) => {
        if (tab === "github") {
          return (
            <ul className="tab_content one" key={id}>
              <li>
                <img
                  className="profileImg"
                  style={{ width: "20px", height: "20px" }}
                  src={elem.owner.avatar_url}
                  alt={elem.name}
                />
                <a href={elem.html_url} target="_blank">
                  <h2>{elem.full_name}</h2>
                </a>
              </li>
              <li>
                <p>{elem.description}</p>
              </li>
            </ul>
          );
        } else if (tab === "youtube") {
          const { id: youtubeId } = elem;
          const videoUrl =
            youtubeId.kind === "youtube#video"
              ? `https://www.youtube.com/watch?v=${youtubeId.videoId}`
              : youtubeId.kind === "youtube#playlist"
              ? `https://www.youtube.com/playlist?list=${youtubeId.playlistId}`
              : "";
          return (
            <ul className="tab_content two" key={id}>
              <li>
                <img
                  className="profileImg"
                  style={{ width: "120px", height: "90px" }}
                  src={elem.snippet.thumbnails.default.url}
                  alt={elem.snippet.title}
                />
                <p>
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                    <h2>{elem.snippet.title}</h2>
                  </a>
                  <p>{elem.snippet.description}</p>{" "}
                </p>
              </li>
              {/* <li>
              </li> */}
            </ul>
          );
        } else {
          return (
            <ul className="tab_content three" key={id}>
              <li>
                <img
                  className="profileImg"
                  style={{ width: "120px", height: "90px" }}
                  src={elem.pagemap.cse_thumbnail.src}
                  alt={elem.title}
                />
                <p>
                  <h2>
                    <a
                      href={elem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {elem.title}
                    </a>
                  </h2>
                  <p>{elem.snippet}</p>{" "}
                </p>
              </li>
            </ul>
          );
        }
      })}
    </>
  );
};

export default TabContent;

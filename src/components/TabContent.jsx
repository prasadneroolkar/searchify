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
        } else {
          return (
            <ul className="tab_content one" key={id}>
              <li>
                <img
                  className="profileImg"
                  style={{ width: "120px", height: "90px" }}
                  src={elem.snippet.thumbnails.default.url}
                  alt={elem.snippet.title}
                />
                <h2>{elem.snippet.title}</h2>
              </li>
              <li>
                <p>{elem.snippet.description}</p>
              </li>
            </ul>
          );
        }
      })}
    </>
  );
};

export default TabContent;

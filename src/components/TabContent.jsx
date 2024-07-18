const TabContent = ({ mapGit }) => {
  return (
    <>
      {mapGit.map((elem, id) => {
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
      })}
    </>
  );
};

export default TabContent;

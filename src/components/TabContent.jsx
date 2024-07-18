const TabContent = ({ mapGit }) => {
  return (
    <div>
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
                {elem.full_name}
              </a>
            </li>
            <li>{elem.description}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default TabContent;

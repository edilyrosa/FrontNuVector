import { Link } from "react-router-dom";
import "../stylies/ComponentHeader.css";
import nuVectorIcon from "../assets/nuVector_favicon.ico";
import {} from "../index.css";

function Header(props) {
  return (
    <>
      <div className="divFather ">
        <header className="header-content header">
          <section>
            <article className="logo">
              <img src={nuVectorIcon} alt="nuVector" />
            </article>
            <span className="titleLogo">Manager Nuvector App</span>
          </section>

          <ul className="menu">
            {/* //!HOME */}
            <li>
              <Link to="./">Home and Notifications</Link>{" "}
            </li>
            <li>
              {/* //!CLIENT */}
              <Link to="./form-client">Your Clients 🔽</Link>
              <ul>
                <li>
                  <Link className="sonAssets sonAssets1" to="./form-client">
                    Add, Update or Delate your Clients.
                  </Link>
                </li>
              </ul>
            </li>
            {/* //!PROJECTS*/}
            <li>
              <Link to="./list-search-project">Your Projects 🔽</Link>
              <ul>
                <li>
                  <Link className="sonAssets sonAssets1" to="./form-project">
                    Add, Update or Delate your Projects.
                  </Link>
                </li>
                <li>
                  <Link
                    className="sonAssets sonAssets2"
                    to="./list-search-project"
                  >
                    Watch all your Projects or find ones.
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {/* //!TASK ENTRY */}
              <Link to="./list-search-task">Your Task Entries 🔽</Link>
              <ul>
                <li>
                  <Link className="sonAssets sonAssets1" to="./form-tack">
                    Add, Update or Delate your Task Entries.
                  </Link>
                </li>
                <li>
                  <Link
                    className="sonAssets sonAssets2"
                    to="./list-search-task"
                  >
                    Watch all your Task Entries or find ones.
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {/* //!GRAPH */}
              <Link to="./graph-by-client">Project/Time Graph</Link>
            </li>
            <li>
              <a
                href="https://www.nu-vector.com/contact/"
                target="_blank"
                rel="noreferrer"
              >
                Support NuVector
              </a>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Header;

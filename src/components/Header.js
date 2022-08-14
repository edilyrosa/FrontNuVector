import { Link } from "react-router-dom";
import "../stylies/ComponentHeader.css";
import volvoicon from "../assets/faviconVOLVO.ico";

function Header(props) {
  return (
    <>
      <div className="divFather ">
        <header className="header-content header">
          <section>
            <article className="logo">
              <img src={volvoicon} alt="volvo" />
            </article>
            <span>Manager VOLVO App</span>
          </section>

          <ul className="menu">
            <li>
              <Link to="./">Home and Notifications</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="./clients">Your Clients 🔽</Link>
              <ul>
                <li>
                  <Link className="sonAssets sonAssets1" to="./FormAddAsset">
                    Add a new Client
                  </Link>
                </li>
                <li>
                  <Link className="sonAssets sonAssets2" to="./ProjectForm">
                    Show details Client's one
                  </Link>
                </li>
                <li>
                  <Link className="sonAssets sonAssets2" to="./ProjectForm">
                    Show all the Clients
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="./projects">Your Projects 🔽</Link>
              <ul>
                <li>
                  <Link className="sonAssets sonAssets1" to="./FormAddAsset">
                    Add a new Project
                  </Link>
                </li>
                <li>
                  <Link className="sonAssets sonAssets2" to="./ProjectForm">
                    Show details Project's one
                  </Link>
                </li>
                <li>
                  <Link className="sonAssets sonAssets2" to="./ProjectForm">
                    Show all the Projects
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              {" "}
              <Link to="./TableTaskEnties">The task entries 🔽</Link>
              <ul>
                <li>
                  <Link className="sonAssets sonAssets1" to="./FormAddAsset">
                    Add a new Task
                  </Link>
                </li>
                <li>
                  <Link className="sonAssets sonAssets2" to="./ProjectForm">
                    Show details Task's one
                  </Link>
                </li>
                <li>
                  <Link className="sonAssets sonAssets2" to="./ProjectForm">
                    Show all the task entries
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              {" "}
              <Link to="./Gaphs">Show status Project/Time</Link>
            </li>
            <li>
              <a
                href="https://www.nu-vector.com/contact/"
                target="_blank"
                rel="noreferrer"
              >
                Soport NuVector
              </a>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Header;

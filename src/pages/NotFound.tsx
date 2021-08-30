import Particles from "react-particles-js";
import { Link } from "react-router-dom";

const NotFoundPage: React.FunctionComponent = () => {
  return (
    <div className="view">
      <div className="notFound">
        <header className="center-h">
          <div>
            <h1 className="title-page">Not Found</h1>
            <Link to="/">
              <button>Return Home</button>
            </Link>
          </div>
        </header>
        <Particles className="particles" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default NotFoundPage;

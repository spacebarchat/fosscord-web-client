import Particles from "react-particles-js";

const LoadingPage = () => {
  const tips = [
    "This app took 2 weeks longer than expected to make.",
    "Stealing Discord since 1966.",
    "Disclaimer: Not actually a Discord clone.",
    "❤️ FOSSCORD",
  ];
  const randomIndex = Math.floor(Math.random() * tips.length);

  return (
    <div className="view">
      <div className="notFound">
        <header className="center-h">
          <div>
            <h1 className="title-page">Loading...</h1>
            <p className="description">{tips[randomIndex]}</p>
          </div>
        </header>
        <Particles className="particles" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default LoadingPage;

import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div
      className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
      style={{ minHeight: "80vh" }}
    >
      {/* Hero logo */}
      <img
        src={assets.homepage_logo}
        alt="header"
        width={200}
        className="mb-4"
      />

      {/* Hero text */}
      <h5 className="fw-semibold">
        Hey {userData ? userData.name : "Developer"}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h5>
      <h1 className="fw-bold diaply-5 mb-3">
        Welcome {userData ? "back to" : "to"} AuthentiQ!
      </h1>
      <p className="text-muted fs-5 mb-4" style={{ maxWidth: "500px" }}>
        Let's begin with a quick product tour so you can setup your
        authentication in no time!
      </p>

      {/* Hero primary btn */}
      <button className="btn btn-outline-dark rounded-pill px-4 py-2">
        Get Started
      </button>
    </div>
  );
};

export default Header;

import "./BodyNavButton.css";

const BodyNavButton = ({ text, clickFunction }) => {
  return (
    <button className="body-nav-button" onClick={clickFunction}>
      {text}
    </button>
  );
};

export default BodyNavButton;

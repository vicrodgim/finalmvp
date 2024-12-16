import "./NavButton.css";

export const NavButton = ({ text, onClick }) => {
  return (
    <button className="nav-button" onClick={onClick}>
      {text}
    </button>
  );
};

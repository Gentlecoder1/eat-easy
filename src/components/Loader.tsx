import "../styles/Loader.css";

const Loader = () => {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <div id="cooking">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bubble" />
        ))}
        <div id="area">
          <div id="sides">
            <div id="pan" />
            <div id="handle" />
          </div>
          <div id="pancake">
            <div id="pastry" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

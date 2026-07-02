const Header = () => {
  return (
    <div className="text-center mb-6 md:mb-8">
      <h1
        className="
          text-4xl sm:text-5xl md:text-6xl
          font-extrabold
          text-white
          tracking-tight
          drop-shadow-[0_8px_20px_rgba(0,0,0,0.30)]
        "
      >
        My Todo
      </h1>

      <p className="text-white/85 text-sm sm:text-base md:text-lg mt-2 md:mt-3 font-medium tracking-wide">
        Stay organized. Stay productive.
      </p>
    </div>
  );
};

export default Header;

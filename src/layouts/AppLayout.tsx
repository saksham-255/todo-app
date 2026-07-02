import Home from "../Pages/Home";

const AppLayout = () => {
  return (
    <div
      className="
        min-h-screen
        w-full
        bg-gradient-to-br
        from-[#2d6df6]
        via-[#4b8ff7]
        to-[#7fd4f0]
        flex
        items-start
        justify-center
        px-4 md:px-8
        py-6 md:py-8
      "
    >
      <div
        className="
          w-full
          max-w-[1100px]
          rounded-[32px]
          border border-white/25
          bg-white/10
          backdrop-blur-3xl
          shadow-[0_30px_70px_rgba(0,40,110,0.35)]
          ring-1 ring-inset ring-white/10
          p-5 md:p-8
        "
      >
        <Home />
      </div>
    </div>
  );
};

export default AppLayout;

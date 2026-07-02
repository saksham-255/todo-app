interface Props {
  progress: number;
  completed: number;
  total: number;
}

const Progress = ({ progress, completed, total }: Props) => {
  return (
    <div
      className="
          rounded-[20px] md:rounded-[24px]
          bg-white/15
          backdrop-blur-2xl
          border border-white/25
          p-4 md:p-5
          shadow-[0_20px_50px_rgba(0,50,120,0.25)]
          mb-6
          overflow-hidden
        "
    >
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-3">
        <h2 className="text-white text-base md:text-lg font-bold tracking-wide">
          Progress
        </h2>

        <h2 className="text-white text-base md:text-lg font-extrabold">
          {progress}% Completed
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="h-3 rounded-full bg-white/25 overflow-hidden shadow-inner">
        <div
          className="
              relative h-full rounded-full
              bg-gradient-to-r from-green-400 via-green-500 to-emerald-500
              transition-all duration-700 ease-out
              shadow-[0_0_12px_rgba(34,197,94,0.6)]
            "
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      {/* Bottom label */}
      <p className="text-white/80 mt-2.5 text-xs md:text-sm font-medium">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
};

export default Progress;

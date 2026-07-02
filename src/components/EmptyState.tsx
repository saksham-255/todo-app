const EmptyState = () => {
  return (
    <div
      className="
        rounded-[20px]
        border border-white/25
        bg-white/10
        backdrop-blur-xl
        py-8
        text-center
        shadow-xl
      "
    >
      <div className="text-4xl mb-3">📝</div>

      <h2 className="text-white text-xl font-bold">No tasks yet</h2>

      <p className="text-white/75 mt-1.5 text-sm font-medium">
        Add your first task above and get things done!
      </p>
    </div>
  );
};

export default EmptyState;

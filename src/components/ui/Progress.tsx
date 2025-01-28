type PROGRESS_TYPE = {
  value: number;
}

// Progress Component
export const Progress = ({ value = 0 }: PROGRESS_TYPE) => {
  return (
    <div className="relative w-full h-2 bg-gray-700 rounded-lg">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
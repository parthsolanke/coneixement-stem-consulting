export default function Button({ display = "", type, extra, onClick }) {
  const bg =
    type === "normal"
      ? "w-48 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none"
      : "w-full max-w-xs px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none";
  
  return (
    <button className={`${bg} ${extra}`} onClick={onClick}>
      {display}
    </button>
  );
}

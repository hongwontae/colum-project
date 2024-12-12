/* eslint-disable react/prop-types */
function HomeButton({ children, ...props }) {
  return (
    <div>
      <button {...props} className="text-red-300 mb-3">
        {children}
      </button>
    </div>
  );
}

export default HomeButton;

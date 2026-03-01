import "./GenericButton.css"

const GenericButton = ({
  currentClassName,
  onClickMethod,
  loading,
  children,
}) => {
  return (
    <>
      <button
        className={currentClassName}
        onClick={onClickMethod}
        disabled={loading}
      >
        {children}
      </button>
    </>
  );
};

export default GenericButton;

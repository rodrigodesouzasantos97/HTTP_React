import "./InputSubmit.css";

const InputSubmit = ({ loading, value }) => {
  return (
    <>
      <input
        type="submit"
        value={loading ? "Aguarde" : value}
        disabled={loading}
        className="submit-btn"
      />
    </>
  );
};

export default InputSubmit;

import "./InputField.css"

const InputField = ({ label, placeholder, onChangeMethod, value }) => {
  return (
    <>
      <label className="inputField-container">
        <span>{label}</span>
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          onChange={(e) => onChangeMethod(e.target.value)}
          value={value}
        />
      </label>
    </>
  );
};

export default InputField;

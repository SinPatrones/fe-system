const Input = ({
  label, inputID, inputType = 'text', onChange, value, boldLabel = true, required = false
               }) => {

  return (
    <div className="mb-3">
      <label htmlFor={inputID} className={`form-label ${boldLabel ? 'fw-bold' : ''}`}>{label}</label>
      <input type={inputType} value={value} className="form-control" id={inputID} name={inputID} onChange={onChange} required={required}/>
    </div>
  );
}

export default Input;

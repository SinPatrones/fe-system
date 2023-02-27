const InputEditMode = ({value, onChange, type = 'text'}) => {
  return (
    <input type={type} value={value} onChange={onChange} style={{border: 'none'}}/>
  );
}

export default InputEditMode;

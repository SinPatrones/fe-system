const Button = ({
  label, type, name, onClick, anotherClass, styles
                }) => {

  return (
    <button type={type} name={name} id={name} style={styles} className={`btn ${anotherClass}`} onClick={onClick}>{label}</button>
  );
};

export default Button;

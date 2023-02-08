const Button = ({ country, handleClick }) => {
  return (
    <button onClick={() => handleClick(country.name.common)}>
      show
    </button>
  )
}

export default Button
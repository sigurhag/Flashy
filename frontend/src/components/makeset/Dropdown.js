const Dropdown = ({ label, options, value, onChange, backgroundColor, backgroundColorDark, isDarkMode }) => {
  return (
    <div className='flex items-center mb2' >
      <label className='f3' style={{ marginLeft: '15px' }}>{label}</label>
      <div>
        <select 
          className="f3 tc bg-transparent ba b--transparent" 
          style={{
            color: isDarkMode ? '#f6c42e' : "#00489C",
            backgroundColor: isDarkMode ? backgroundColorDark : backgroundColor,
            borderRadius: '90px',
            marginLeft: '50px',
            marginRight: '30px'
          }}
          value={value} 
          onChange={e => onChange(e.target.value)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;

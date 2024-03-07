const Dropdown = ({ label, options, value, onChange, backgroundColor }) => {
    return (
      <div className='flex items-center mb2' > {/* Adding gap between items */}
        <label className='f3' style={{ marginLeft: '15px' }}>{label}</label>
        <div>
          <select 
            className="f3 tc bg-transparent ba b--transparent" 
            style={{
              color: "#00489C",
              backgroundColor: backgroundColor,
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
  
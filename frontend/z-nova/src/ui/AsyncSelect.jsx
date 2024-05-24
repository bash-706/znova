import AsyncSelect from 'react-select/async';

function AsyncSelectInput({
  defaultValue = [],
  loadOptions,
  isMulti,
  onChange,
  placeholder,
  value,
  styles,
}) {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions={true}
      isMulti={isMulti}
      placeholder={placeholder}
      loadOptions={loadOptions}
      onChange={onChange}
      value={value}
      styles={{
        container: (provided) => ({
          ...provided,
          ...styles,
        }),
      }}
    />
  );
}

export default AsyncSelectInput;

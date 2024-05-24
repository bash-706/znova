import CreatableSelect from 'react-select/creatable';

function CreatableSelectInput({
  defaultValue,
  isMulti = true,
  loadOptions,
  onChange,
  disabled,
  placeholder,
  styles,
}) {
  return (
    <CreatableSelect
      defaultValue={defaultValue}
      defaultOptions={true}
      loadOptions={loadOptions}
      isMulti={isMulti}
      placeholder={placeholder}
      onChange={onChange}
      isDisabled={disabled}
      styles={{
        container: (provided) => ({
          ...provided,
          ...styles,
        }),
      }}
    />
  );
}

export default CreatableSelectInput;

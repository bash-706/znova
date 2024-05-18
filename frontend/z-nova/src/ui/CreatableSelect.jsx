import CreatableSelect from 'react-select/creatable';

function CreatableSelectInput({
  defaultValue,
  isMulti = true,
  loadOptions,
  onChange,
  disabled,
  styles,
}) {
  return (
    <CreatableSelect
      defaultValue={defaultValue}
      defaultOptions={true}
      loadOptions={loadOptions}
      isMulti={isMulti}
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

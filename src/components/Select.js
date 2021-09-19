import { useField } from "formik";
import { useCallback } from "react";
import RSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

const Select = (props) => {
  const { name, isCreatable, onChange, onFocus, onBlur, ...rest } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched, setError } = helpers;

  const handleLocalChange = useCallback((selectedOption) => {
    console.log('handleLocalChange', selectedOption);
    let payloadToSend = null;
    if (props.isMulti) {
      payloadToSend = selectedOption.map((o) => ({
        id: o.__isNew__ ? null : o.value,
        name: o.label,
      }));
    } else {
      payloadToSend = {
        id: selectedOption.__isNew__ ? null : selectedOption.value,
        name: selectedOption.label,
      };
    }
    setValue(payloadToSend);
    setTouched(true);
    setError(false);
    if (onChange) {
      onChange(payloadToSend);
    }
  }, [setValue, setTouched, setError, onChange, props.isMulti]);

  const handleLocalBlur = useCallback((e) => {
    setTouched(true);
    if (onBlur) {
      onBlur(e);
    }
  }, [setTouched, onBlur]);

  const handleLocalFocus = useCallback((e) => {
    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);

  if (isCreatable) {
    if (props.isAsync) {
      return <AsyncCreatableSelect
        name={name}
        onChange={handleLocalChange}
        onFocus={handleLocalFocus}
        onBlur={handleLocalBlur}
        {...rest}
        />;
    }
    return (
      <CreatableSelect
        name={name}
        onChange={handleLocalChange}
        onBlur={handleLocalBlur}
        onFocus={handleLocalFocus}
        {...rest}
      />
    );
  }

  if (props.isAsync) {
    return <AsyncSelect
      name={name}
      onChange={handleLocalChange}
      onFocus={handleLocalFocus}
      onBlur={handleLocalBlur}
      {...rest}
    />;
  }

  return (
    <RSelect
      name={name}
      onChange={handleLocalChange}
      onBlur={handleLocalBlur}
      onFocus={handleLocalFocus}
      {...rest}
    />
  );
};

export default Select;

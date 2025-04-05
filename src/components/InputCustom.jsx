import { Input } from "antd";
import React from "react";

export const InputCustom = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
  type,
  placeholder,
}) => {
  return (
    <>
      <label>{label}</label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type ?? "string"}
      />
      {touched && error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export const InputPasswordCustom = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
  type,
}) => {
  return (
    <>
      <label>{label}</label>
      <Input.Password
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type ?? "string"}
      />
      {touched && error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

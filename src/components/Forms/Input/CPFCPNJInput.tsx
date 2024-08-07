import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const CPF_CNPJ_Input = () => {
  const { control } = useForm();
  const [mask, setMask] = useState("999.999.999-99");

  const handleKeyDown = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length < 11) {
      setMask("999.999.999-99");
    } else {
      setMask("99.999.999/9999-99");
    }
  };

  return (
    <Controller
      name="cpfcnpj"
      control={control}
      render={({ field }) => (
        <InputMask
          {...field}
          mask={mask}
          onKeyDown={handleKeyDown}
          onChange={(e) => field.onChange(e.target.value)}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="text"
              id="cpfcnpj"
              className="input-class"
              placeholder="Digite CPF ou CNPJ"
            />
          )}
        </InputMask>
      )}
    />
  );
};

export default CPF_CNPJ_Input;

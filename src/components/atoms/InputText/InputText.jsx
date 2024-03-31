import React, { useState } from "react";
import { styled } from "styled-components";

const StyledInput = styled.input``;
const InputText = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default InputText;

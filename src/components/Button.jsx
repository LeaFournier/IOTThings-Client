import styled from "styled-components";

export default function Button({ content }) {
  return <StyledButton>{content}</StyledButton>;
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  width: 50%;
  margin-right: 15px;
  height: 2.5rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  position: absolute;
  transform: translate(-35%, -50%);
`;
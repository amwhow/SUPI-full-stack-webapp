import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  .form-content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    label {
      font-size: 1.5rem;
      margin-bottom: 5px;
    }
    input {
      height: 25px;
      font-size: 20px;
    }
    #submit {
      width: 100px;
      margin-top: 20px;
    }
  }
`;

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

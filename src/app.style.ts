import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: -2px 2px rgba(0, 0, 0, 0.1);
`;

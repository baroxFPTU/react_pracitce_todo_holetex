import Button from '@atlaskit/button';
import React, { useContext } from 'react';
import styled, {css} from 'styled-components';
import CheckIcon from '@atlaskit/icon/glyph/check';
import {AppContext } from '../App';

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;
  &, &:hover {
    ${p => p.isCompleted && css`
      text-decoration: line-through;
    `}
  }

  &:hover {
    .check-icon {
      display: inline-block;
    }
  }

  .check-icon {
    display: none;
    &:hover {
      background-color: #e2e2e2;
      border-radius: 5px;
    }
  }
`;

function TodoItem({children, todo}) {
  const [handleCheckEvent] = useContext(AppContext);

  return (
    <ButtonStyled
      shouldFitContainer
      isCompleted={todo.isCompleted}
      iconAfter={
        !todo.isCompleted &&
        <span className="check-icon" onClick={handleCheckEvent.bind(null,todo.id)}>
          <CheckIcon/>
        </span>}>
          {children}
    </ButtonStyled>
  );
}

export default TodoItem;
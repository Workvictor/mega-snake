import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ICellWrapper extends HTMLAttributes<HTMLDivElement> {
  cellSize: number;
}

export const CellWrapper = styled.div.attrs<ICellWrapper>((props) => ({
  style: { width: `${props.cellSize}px`, height: `${props.cellSize}px` },
}))<ICellWrapper>`
  background-color: hsl(0, 0%, 10%);
  outline: 1px solid hsl(0, 0%, 5%);
`;

export const Cell = React.memo(CellWrapper);

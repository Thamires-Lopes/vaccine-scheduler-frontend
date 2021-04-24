/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/home/index';

describe('Renders', () => {
  it('renders home page', () => {
    const { queryByText } = render(<Home />);

    expect(queryByText('Cadastro')).toBeTruthy();
    expect(queryByText('Listagem')).toBeTruthy();
  });
});

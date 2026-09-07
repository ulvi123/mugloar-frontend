import React from 'react';
import { render, screen } from '@testing-library/react';
import AdList from '../components/AdList';
import '@testing-library/jest-dom';

test('renders list of ads', () => {
  const ads = [
    { adId: '1', message: 'A' },
    { adId: '2', message: 'B' }
  ];

  render(<AdList ads={ads} />);
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});

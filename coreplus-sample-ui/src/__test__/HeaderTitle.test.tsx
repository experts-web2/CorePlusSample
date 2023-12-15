// HeaderTitle.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import HeaderTitle from '../components/HeaderTitle';
import '@testing-library/jest-dom';

describe('HeaderTitle', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<HeaderTitle title="Test Title" />);

    // Check if the title is rendered
    expect(getByText('Test Title')).toBeInTheDocument();
  });
});
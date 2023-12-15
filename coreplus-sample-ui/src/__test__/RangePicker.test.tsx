// RangePicker.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RangePicker from '../components/RangePicker';
import '@testing-library/jest-dom';

describe('RangePicker', () => {
  it('renders the date range picker and responds to click events', () => {
    const mockHandleApply = jest.fn();
    const { getByText } = render(<RangePicker handleApply={mockHandleApply} />);

    // Check if the Apply button is rendered
    expect(getByText('Apply')).toBeInTheDocument();

    // Simulate a click event on the Apply button
    fireEvent.click(getByText('Apply'));

    // Check if the handleApply function was called
    expect(mockHandleApply).toHaveBeenCalled();
  });
});
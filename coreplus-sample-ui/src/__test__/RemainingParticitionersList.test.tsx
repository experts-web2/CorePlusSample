// RemainingParticitionersList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RemainingParticitionersList from '../components/RemainingParticitionersList';
import '@testing-library/jest-dom';

describe('RemainingParticitionersList', () => {
  it('renders the list and responds to click events', () => {
    const mockOnSelectPractitioner = jest.fn();
    const practitioners = {
      remaining: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
      // other properties...
    };

    const { getByText } = render(
      <RemainingParticitionersList
        practitioners={practitioners}
        onSelectPractitioner={mockOnSelectPractitioner}
      />
    );

    // Check if the practitioners are rendered
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Doe')).toBeInTheDocument();

    // Simulate a click event on the first practitioner
    fireEvent.click(getByText('John Doe'));

    // Check if the onSelectPractitioner function was called with the correct practitioner
    expect(mockOnSelectPractitioner).toHaveBeenCalledWith(practitioners.remaining[0]);
  });
});
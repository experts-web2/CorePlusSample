// PractitionerList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PractitionerList from '../components/PractitionerList';
import '@testing-library/jest-dom';

describe('PractitionerList', () => {
  it('renders the list and responds to click events', () => {
    const mockOnSelectPractitioner = jest.fn();
    const nonSupervisors = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    const { getByText } = render(
      <PractitionerList
        nonSupervisors={nonSupervisors}
        onSelectPractitioner={mockOnSelectPractitioner}
      />
    );

    // Check if the practitioners are rendered
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Doe')).toBeInTheDocument();

    // Simulate a click event on the first practitioner
    fireEvent.click(getByText('John Doe'));

    // Check if the onSelectPractitioner function was called with the correct practitioner
    expect(mockOnSelectPractitioner).toHaveBeenCalledWith(nonSupervisors[0]);
  });
});
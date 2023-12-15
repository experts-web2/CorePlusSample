import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirstTest from '../components/FirstTest';
import React from 'react';

test("Example 1 renders successfully", () => {
    render(<FirstTest/>);

    const element = screen.getByText(/first test/i);

    expect(element).toBeInTheDocument();
});
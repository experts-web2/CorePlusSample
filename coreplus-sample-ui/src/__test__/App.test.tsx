import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ApiService from '../services/apiService';
import { DateRange, Practitioner, Supervisor } from '../typings';
import AppointmentBreakdown from '../components/AppointmentBreakdown';


// Mock the apiService module
jest.mock('../services/apiService', () => ({
  getPractitioners: jest.fn(() => Promise.resolve({ data: [] })),
  getNonSupervisors: jest.fn(() => Promise.resolve({ data: [] })),
  getPractitionerReport: jest.fn(() => Promise.resolve({ data: { data: [], count: 0 } })),
}));

describe('App component', () => {
  test('renders the header with the correct title', () => {
    render(<App />);
    expect(screen.getByText('coreplus')).toBeInTheDocument();
  });
});
//   test('fetches practitioners on component mount', async () => {
//     render(<App />);
//     // Wait for the component to render and the API calls to resolve
//     await waitFor(() => {
//       expect(screen.getByText('Loading...')).not.toBeInTheDocument();
//     });
//     expect(screen.getByText('Supervisors')).toBeInTheDocument();
//     expect(screen.getByText('Non-Supervisors')).toBeInTheDocument();
//   });

//   test('fetches appointment list when practitioner and date range are selected', async () => {
//     render(<App />);
//     // Mock user selecting a practitioner
//     userEvent.click(screen.getByText('Select'));
//     // Mock user selecting date range
//     fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2022-01-01' } });
//     fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2022-02-01' } });
//     userEvent.click(screen.getByText('Apply'));

//     // Wait for the component to render and the API calls to resolve
//     await waitFor(() => {
//       expect(screen.getByText('Loading...')).not.toBeInTheDocument();
//     });

//     expect(screen.getByText('Appointment Breakdown')).toBeInTheDocument();
//     expect(screen.getByText('Total Records: 0')).toBeInTheDocument();
//   });

//   // Add more test cases based on your component's functionality

// });

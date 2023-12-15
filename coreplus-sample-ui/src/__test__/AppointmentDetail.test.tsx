// AppointmentDetail.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentDetail from '../components/AppointmentDetail';

describe('AppointmentDetail', () => {
  it('renders the appointment details correctly', () => {
    const specificAppointmentDetails :any= {
      appointment_type: 'Type A',
      client_name: 'John Doe',
      date: '2022-01-01',
      duration: '1 hour',
      id: 1,
    };

    const { getByText } = render(
      <AppointmentDetail
        specificAppointmentDetails={specificAppointmentDetails}
      />
    );

    // Check if the appointment details are rendered
    expect(getByText(/Appointment Type: Type A/)).toBeInTheDocument();
    expect(getByText(/Client Name: John Doe/)).toBeInTheDocument();
    expect(getByText(/Date: 2022-01-01/)).toBeInTheDocument();
    expect(getByText(/Duration: 1 hour/)).toBeInTheDocument();
    expect(getByText(/Id: 1/)).toBeInTheDocument();
  });
});
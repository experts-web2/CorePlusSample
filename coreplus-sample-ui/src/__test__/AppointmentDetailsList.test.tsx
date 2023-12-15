// AppointmentDetailsList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentDetailsList from '../components/AppointmentDetailsList';


describe('AppointmentDetailsList', () => {
  it('renders the list and responds to click events', () => {
    const mockSpecificAppointmentDetail = jest.fn();
    const appointmentDetailsList = [
      { id: 1, cost: 100, revenue: 200 },
      { id: 2, cost: 150, revenue: 250 },
    ];

    const { getByText } = render(
      <AppointmentDetailsList
        appointmentDetailsList={appointmentDetailsList}
        detailActiveIndex={null}
        specificAppointmentDetail={mockSpecificAppointmentDetail}
      />
    );

    // Check if the appointment details are rendered
    expect(getByText(/Appointment Id: 1 Cost: 100 Revenue: 200/)).toBeInTheDocument();
    expect(getByText(/Appointment Id: 2 Cost: 150 Revenue: 250/)).toBeInTheDocument();

    // Simulate a click event on the first appointment detail
    fireEvent.click(getByText(/Appointment Id: 1 Cost: 100 Revenue: 200/));

    // Check if the specificAppointmentDetail function was called with the correct id
    expect(mockSpecificAppointmentDetail).toHaveBeenCalledWith(1);
  });
});
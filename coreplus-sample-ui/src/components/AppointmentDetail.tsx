import React from "react";
import { AppointmentDetails } from "../typings";
const AppointmentDetail = ({
  specificAppointmentDetails,
}: {
  specificAppointmentDetails: AppointmentDetails;
}) => {
  return (
    <div className="w-2/5">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold text-green-600">
          Appointment Type: {specificAppointmentDetails.appointment_type}
        </h3>
        <h3 className="text-lg font-bold text-green-600">
          Client Name: {specificAppointmentDetails.client_name}
        </h3>
        <h3 className="text-lg font-bold text-green-600">
          Date: {specificAppointmentDetails.date}
        </h3>
        <h3 className="text-lg font-bold text-green-600">
          Duration: {specificAppointmentDetails.duration}
        </h3>
        <h3 className="text-lg font-bold text-green-600">
          Id: {specificAppointmentDetails.id}
        </h3>
      </div>
    </div>
  );
};

export default AppointmentDetail;

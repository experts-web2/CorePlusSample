// AppointmentDetailsList.tsx
import React from "react";
interface AppointmentDetailsListProps {
  appointmentDetailsList: any[];
  detailActiveIndex: number | null;
  specificAppointmentDetail: (id: number) => void;
}

const AppointmentDetailsList: React.FC<AppointmentDetailsListProps> = ({
  appointmentDetailsList,
  detailActiveIndex,
  specificAppointmentDetail,
}) => {
  return (
    <div  className="mt-2">
      {appointmentDetailsList.map((detail: any) => (
        <div
          key={detail.id}
          className={`p-4 rounded shadow hover:shadow-md transition duration-300 ease-in-out cursor-pointer ${
            detail.id === detailActiveIndex ? "bg-blue-100" : "bg-white"
          }`}
          onClick={() => specificAppointmentDetail(detail.id)}
        >
          <h3 className="text-lg font-bold text-blue-600">
            Appointment Id: {detail.id} Cost: {detail.cost} Revenue:{" "}
            {detail.revenue}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AppointmentDetailsList;

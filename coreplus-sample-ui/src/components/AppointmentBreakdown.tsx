import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import AppointmentDetail from "./AppointmentDetail";

const ITEMS_PER_PAGE = 3;

const AppointmentBreakdown: React.FC<any> = ({
  breakdownData,
  selectedPractitioner,
  fetchData,
  totalRecords,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [detailActiveIndex, setDetailActiveIndex] = useState<number | null>(
    null
  );
  const [appointmentDetails, setAppointmentDetails] = useState<any[]>([]);
  const [specificAppointmentDetails, setSpecificAppointmentDetails] =
    useState<any>();
  const [breakdownPage, setBreakdownPage] = useState<number>(1);
  const [detailsPage, setDetailsPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const callSpecificAppointment = async (month: string, index: number) => {
    try {
      const response = await apiService.getSpecificMonth(
        selectedPractitioner?.id,
        month,
        detailsPage,
        ITEMS_PER_PAGE
      );
      setAppointmentDetails(response.data.data);
      setTotalCount(response.data?.count);
      setActiveIndex(index);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      callSpecificAppointment(breakdownData[activeIndex].month, activeIndex);
    }
  }, [detailsPage, totalCount, activeIndex]);

  const specificAppointmentDetail = async (id: number) => {
    try {
      const response = await apiService.getClient(id);
      setDetailActiveIndex(id);
      setSpecificAppointmentDetails(response.data);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  return (
    <div className="space-y-4 flex flex-row w-100 gap-2">
      {breakdownData && breakdownData.length > 0 && (
        <div className="w-3/5 lg:w-2/5 xl:w-1/3">
          <h3 className="text-xl font-bold text-blue-600 text-center mt-4 mb-2">Total Appointments</h3>

          {breakdownData.map((appointment: any, index: number) => (
            <div
              key={appointment.id}
              className={`p-4 mt-3 bg-white rounded shadow transition transform hover:scale-105 ${
                activeIndex == index ? "bg-slate-300" : ""
              }`}
            >
              <button
                className="w-full text-left focus:outline-none"
                onClick={() =>
                  callSpecificAppointment(appointment.month, index)
                }
              >
                <h3 className="text-lg font-bold text-blue-600">
                  Appointment Cost: {appointment.cost} Revenue:{" "}
                  {appointment.revenue} Date: {appointment.month}
                </h3>
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                setBreakdownPage((prev) => Math.max(prev - 1, 1));
                fetchData(breakdownPage - 1, 3);
              }}
              className={`px-4 py-2 ${
                breakdownPage === 1
                  ? "bg-gray-300 text-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } rounded transition duration-300 ease-in-out`}
              disabled={breakdownPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                setBreakdownPage((prev) => prev + 1);
                fetchData(breakdownPage + 1, 3);
              }}
              className={`px-4 py-2 ${
                breakdownPage * ITEMS_PER_PAGE >= totalRecords
                  ? "bg-gray-300 text-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } rounded transition duration-300 ease-in-out`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="w-2/5">
      <h3 className="text-xl font-bold text-blue-600 text-center">Appointment Details</h3>
        {appointmentDetails && appointmentDetails.length > 0 && (
          <div className="mt-2">
            {appointmentDetails.map((detail: any) => (
              <div
                key={detail.id}
                className={`p-4 rounded shadow hover:shadow-md transition duration-300 ease-in-out cursor-pointer ${
                  detail.id === detailActiveIndex ? "bg-slate-300" : "bg-white"
                }`}
                onClick={() => specificAppointmentDetail(detail.id)}
              >
                <h3 className="text-lg font-bold text-blue-600">
                  Appointment Id : {detail.id} Cost: {detail.cost} Revenue:{" "}
                  {detail.revenue}
                </h3>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDetailsPage((prev) => prev - 1)}
                disabled={detailsPage === 1}
                className={`px-4 py-2 ${
                  detailsPage === 1
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } rounded transition duration-300 ease-in-out`}
              >
                Previous
              </button>
              <button
                disabled={breakdownPage * ITEMS_PER_PAGE >= totalRecords}
                onClick={() => setDetailsPage((prev) => prev + 1)}
                className={`px-4 py-2 ${
                  detailsPage * ITEMS_PER_PAGE >= totalCount
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } rounded transition duration-300 ease-in-out`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {specificAppointmentDetails && (
        <AppointmentDetail
          specificAppointmentDetails={specificAppointmentDetails}
        />
      )}
    </div>
  );
};

export default AppointmentBreakdown;

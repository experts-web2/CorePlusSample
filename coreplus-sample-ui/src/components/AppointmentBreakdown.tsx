import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import AppointmentDetail from "./AppointmentDetail";
import AppointmentDetailsList from "./AppointmentDetailsList";
import HeaderTitle from "./HeaderTitle";
import { AppointmentDetails } from "../typings";

const ITEMS_PER_PAGE = 3;

const AppointmentBreakdown: React.FC<any> = ({
  appointmentList,
  selectedPractitioner,
  fetchAppointmentList,
  totalRecords,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [detailActiveIndex, setDetailActiveIndex] = useState<number | null>(
    null
  );
  const [appointmentDetailsList, setAppointmentDetailsList] = useState<any[]>(
    []
  );
  const [specificAppointmentDetails, setSpecificAppointmentDetails] =
    useState<AppointmentDetails>();
  const [breakdownPage, setBreakdownPage] = useState<number>(1);
  const [detailsPage, setDetailsPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchSpecificAppointmentList = async (month: string, index: number) => {
    try {
      const response:any = await apiService.getMonthlyAppointmentList(
        selectedPractitioner?.id,
        month,
        detailsPage,
        ITEMS_PER_PAGE
      );
      setAppointmentDetailsList(response.data.data);
      setTotalCount(response.data?.count);
      setActiveIndex(index);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      fetchSpecificAppointmentList(
        appointmentList[activeIndex].month,
        activeIndex
      );
    }
  }, [detailsPage]);

  const specificAppointmentDetail = async (id: number) => {
    try {
      const response:any = await apiService.getAppointmentDetail(id);
      setDetailActiveIndex(id);
      setSpecificAppointmentDetails(response.data);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  return (
    <div className="space-y-4 flex flex-row w-100 gap-2">
      {appointmentList && appointmentList.length > 0 && (
        <div
          className="w-3/5 lg:w-2/5 xl:w-1/3 first-letter"
          style={{
            height: "612px !important",
            border: "2px solid rgb(191 180 180)",
            boxShadow: "rgb(176 187 157) 2px 3px 2px",
          }}
        >
          <HeaderTitle title=" Total Appointments" />

          {appointmentList.map((appointment: any, index: number) => (
            <div
              key={appointment.id}
              className={`p-4 mt-3 bg-white rounded shadow transition transform hover:scale-105 ${
                activeIndex == index ? "bg-slate-300" : ""
              }`}
            >
              <button
                className="w-full text-left focus:outline-none"
                onClick={() =>
                  fetchSpecificAppointmentList(appointment.month, index)
                }
              >
                <h3 className="text-lg font-bold text-blue-600">
                  Appointment Cost: {appointment.cost}{" "}
                  Revenue: {appointment.revenue}{" "}
                  Month: {appointment.month}
                </h3>
              </button>
            </div>
          ))}
          <div
            className="flex justify-between"
            style={{
              marginTop: "130px",
              padding: "10px",
            }}
          >
            <button
              onClick={() => {
                setBreakdownPage((prev) => prev - 1);
                fetchAppointmentList(breakdownPage - 1, 3);
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
                const nextPage = breakdownPage + 1;
                setBreakdownPage(nextPage);
                fetchAppointmentList(nextPage, ITEMS_PER_PAGE);
              }}
              disabled={breakdownPage * ITEMS_PER_PAGE >= totalRecords}
              className={`px-4 py-2 ${
                breakdownPage * ITEMS_PER_PAGE >= totalRecords
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } rounded transition duration-300 ease-in-out`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="w-2/5">
        {appointmentDetailsList && appointmentDetailsList.length > 0 && (
          <div
            style={{
              height: "640px !important",
              border: "2px solid rgb(191 180 180)",
              boxShadow: "rgb(176 187 157) 2px 3px 2px",
            }}
          >
            <HeaderTitle title="Appointment Details" />
            <div>
              <AppointmentDetailsList
                appointmentDetailsList={appointmentDetailsList}
                detailActiveIndex={detailActiveIndex}
                specificAppointmentDetail={specificAppointmentDetail}
              />
              <div
                className="flex justify-between mt-4"
                style={{
                  marginTop: "160px",
                  padding: "10px",
                }}
              >
                <button
                  onClick={() => setDetailsPage((prev) => prev - 1)}
                  disabled={detailsPage === 1}
                  className={`px-4 py-2 ${
                    detailsPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 "
                  } rounded transition duration-300 ease-in-out`}
                >
                  Previous
                </button>
                <button
                  // Fix the conditional check here
                  disabled={detailsPage * ITEMS_PER_PAGE >= totalCount}
                  onClick={() => setDetailsPage((prev) => prev + 1)}
                  className={`px-4 py-2 ${
                    detailsPage * ITEMS_PER_PAGE >= totalCount
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } rounded transition duration-300 ease-in-out`}
                >
                  Next
                </button>
              </div>
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

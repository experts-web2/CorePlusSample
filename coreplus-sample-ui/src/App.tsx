import "react-dates/lib/css/_datepicker.css";
import "./app.css";
import React, { useEffect, useState } from "react";
import PractitionerList from "./components/PractitionerList";
import AppointmentBreakdown from "./components/AppointmentBreakdown";
import RangePicker from "./components/RangePicker";
import apiService from "./services/apiService";
import SuperVisorsList from "./components/SuperVisorsList";
import { DateRange, Practitioner, Supervisor } from "./typings";

function App() {
  // State variables declaration
  const [selectedPractitioner, setSelectedPractitioner] = useState<
    Practitioner | {}
  >({});
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: "2019-01-01",
    endDate: "2021-01-01",
  });
  const [appointmentList, setAppointmentList] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[] | any>([]);
  const [nonSupervisors, setNonSupervisors] = useState<Practitioner[] | any>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<any>(0);

  // Function to handle date range selection
  const handleApply = async (startDate: string, endDate: string) => {
    setSelectedDateRange({ startDate, endDate });
  };

  // Function to fetch practitioners data from API
  const fetchPractitioners = async () => {
    try {
      const participants = await apiService.getPractitioners();
      const nonSupervisorsData = await apiService.getNonSupervisors();
      setSupervisors(participants.data);
      setNonSupervisors(nonSupervisorsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch practitioners data on component mount
  useEffect(() => {
    fetchPractitioners();
  }, []);

  // Function to fetch appointment list data from API
  const fetchAppointmentList = async (pageNo: any, ITEMS_PER_PAGE: any) => {
    try {
      setLoading(true);
      const response = await apiService.getPractitionerReport(
        selectedPractitioner?.id,
        selectedDateRange,
        pageNo,
        ITEMS_PER_PAGE
      );
      setAppointmentList(response?.data?.data);
      setTotalRecords(response?.data?.count);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching report data:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentList(1, 3);
  }, [selectedPractitioner, selectedDateRange]);

  return (
    <div className="h-screen w-full relative appshell">
      {/* Header component */}
      <div className="header flex flex-row sticky h-12 left-0 right-0 top-0 items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div>
        {/* Render Supervisors List component */}
        <div className="supervisors">
          <SuperVisorsList
            supervisors={supervisors}
            onSelectPractitioner={setSelectedPractitioner}
          />
        </div>
        {/* show nonSupervisors List */}
        <div className="practitioner-report overflow-auto">
          <PractitionerList
            nonSupervisors={nonSupervisors}
            onSelectPractitioner={setSelectedPractitioner}
          />
        </div>
      </div>
      {/* Render date picker and appointment breakdown components */}
      <div className="p-2">
        <div className="date-picker">
          <RangePicker
            onSelectDateRange={setSelectedDateRange}
            handleApply={handleApply}
          />
        </div>
        {/* show appointment breakdown list */}
        <div className="appointment-breakdown">
          <AppointmentBreakdown
            selectedPractitioner={selectedPractitioner as Practitioner}
            appointmentList={appointmentList}
            loading={loading}
            fetchAppointmentList={fetchAppointmentList}
            totalRecords={totalRecords}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

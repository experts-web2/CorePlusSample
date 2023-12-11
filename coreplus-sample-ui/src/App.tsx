// App.tsx
import React, { useEffect, useState } from "react";
import PractitionerList from "./components/PractitionerList";
import AppointmentBreakdown from "./components/AppointmentBreakdown";
import "./app.css";
import RangePicker from "./components/RangePicker";
import apiService from "./services/apiService";
import SuperVisorsList from "./components/SuperVisorsList";
import { DateRange, Practitioner, Supervisor } from "./typings";

function App() {
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | {}>({});
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: "2019-01-01",
    endDate: "2021-01-01",
  });
  const [reportData, setReportData] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[] | any>([]);
  const [nonSupervisors, setNonSupervisors] = useState<Practitioner[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<any>(0);

  const handleApply = async (startDate: string, endDate: string) => {
    await setSelectedDateRange({ startDate, endDate });
  };

  useEffect(() => {
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
    fetchPractitioners();
  }, []);

  const fetchData = async (pageNo:any,ITEMS_PER_PAGE:any) => {
    try {
      setLoading(true);
      const response = await apiService.getPractitionerReport(
        (selectedPractitioner?.id),
        selectedDateRange,
        pageNo,ITEMS_PER_PAGE
      );
      setReportData(response?.data?.data);
      setTotalRecords(response?.data?.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  useEffect(() => {
    fetchData(1,3);
  }, [selectedPractitioner, selectedDateRange]);

  return (
    <div className="h-screen w-full relative appshell">
      <div className="header flex flex-row sticky h-12 left-0 right-0 top-0 items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div>
        <div className="supervisors">
          <SuperVisorsList
            supervisors={supervisors}
            onSelectPractitioner={setSelectedPractitioner}
          />
        </div>
        <div className="practitioner-report overflow-auto">
          <PractitionerList
            nonSupervisors={nonSupervisors}
            onSelectPractitioner={setSelectedPractitioner}
          />
        </div>
      </div>
      <div className="p-2">
        <div className="date-picker">
          <RangePicker
            onSelectDateRange={setSelectedDateRange}
            handleApply={handleApply}
          />
        </div>
        <div className="appointment-breakdown">
          <AppointmentBreakdown
            selectedPractitioner={selectedPractitioner as Practitioner}
            breakdownData={reportData}
            loading={loading}
            fetchData={fetchData}
            totalRecords={totalRecords}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

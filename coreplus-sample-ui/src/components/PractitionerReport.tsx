import React from "react";



const PractitionerReport: React.FC<any> = ({
  reportData,
  setSelectedPrtionersMOnthData,
}) => {
  console.log(reportData);
  return (
    <div className="space-y-4 h-64 overflow-auto">
      {reportData &&
        reportData?.map((practitioner: any) => (
          <div key={practitioner.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold text-blue-600">
              {practitioner.name}
            </h3>

            <div
              key={practitioner?.month}
              className="mt-2"
              onClick={() => {
                setSelectedPrtionersMOnthData(practitioner);
              }}
            >
              <p className="text-gray-700">Month: {practitioner.month}</p>
              <p className="text-gray-700">Cost: {practitioner.cost}</p>
              <p className="text-gray-700">Revenue: {practitioner.revenue}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PractitionerReport;

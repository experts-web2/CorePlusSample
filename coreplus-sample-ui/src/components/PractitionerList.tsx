import React from "react";
import { Supervisor } from "../typings";

interface PractitionerListProps {
  nonSupervisors: Supervisor[];
  onSelectPractitioner: (practitioner: any) => void;
}

const PractitionerList: React.FC<PractitionerListProps> = ({
  onSelectPractitioner,
  nonSupervisors,
}) => {
  return (
    <div className="bg-white rounded shadow p-4 space-y-4 h-80 overflow-auto">
      <h2 className="font-bold text-blue-600">Remaining Practitioners</h2>
      {nonSupervisors &&
        nonSupervisors.map((practitioner: any) => (
          <div
            key={practitioner.id}
            onClick={() => onSelectPractitioner(practitioner)}
            className="cursor-pointer hover:bg-blue-100 p-2 rounded"
          >
            {practitioner.name}
          </div>
        ))}
    </div>
  );
};

export default PractitionerList;

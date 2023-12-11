import React from "react";
import { SuperVisorsListProps } from "../typings";

const SuperVisorsList: React.FC<SuperVisorsListProps> = ({
  supervisors,
  onSelectPractitioner,
}) => {
    return (
        <div className="bg-white rounded shadow p-4 space-y-4 h-80 overflow-auto">
          <h2 className="font-bold text-blue-600">
            Supervisor Practitioners
          </h2>
          {supervisors.map((practitioner) => (
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

export default SuperVisorsList;

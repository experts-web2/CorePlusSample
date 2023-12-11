import React from "react";
import { PractitionerListProps } from "../typings";

const RemainingParticitionersList: React.FC<PractitionerListProps> = ({
  practitioners,
  onSelectPractitioner,
}) => {
  return (
    <div>
      <h2>Remaining Practitioners</h2>
      {practitioners.remaining.map((practitioner) => (
        <div
          key={practitioner.id}
          onClick={() => onSelectPractitioner(practitioner)}
        >
          {practitioner.name}
        </div>
      ))}
    </div>
  );
};

export default RemainingParticitionersList;

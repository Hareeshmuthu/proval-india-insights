
import React from "react";

interface GeneralSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const GeneralSection: React.FC<GeneralSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        I. GENERAL
      </h2>
      {/* Content will be added here */}
    </div>
  );
};

export default GeneralSection;

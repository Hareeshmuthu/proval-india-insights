
import React from 'react';

export const VerificationSection = () => {
  return (
    <div className="mt-12 space-y-8">
      <p className="text-sm leading-relaxed dark:text-white">
        The undersigned has inspected the property detailed in the Valuation Report dated ___________ 
        on __________. We are satisfied that the fair and reasonable market value of the property 
        is Rs._________________ ( Rs. only).
      </p>
      
      <div className="flex justify-end">
        <div className="text-center">
          <div className="w-[300px] h-[100px] border rounded border-dashed flex items-center justify-center dark:border-gray-600">
            <span className="text-muted-foreground text-sm">Bank Manager Signature Here</span>
          </div>
          <p className="mt-2 text-sm dark:text-white">(Name of the Bank Manager with office Seal)</p>
        </div>
      </div>
    </div>
  );
};

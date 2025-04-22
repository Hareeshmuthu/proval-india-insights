
export const calculateRowValue = (quantity: number, ratePerUnit: number) => {
  return (quantity * ratePerUnit) / 100000;
};

export const calculateTotal = (rows: {quantity: number, ratePerUnit: number}[]) =>
  rows.reduce((total, row) => total + calculateRowValue(row.quantity, row.ratePerUnit), 0);

// Enhanced numberToWords function to convert numbers to words
export const numberToWords = (num: number): string => {
  if (isNaN(num)) return "Zero";

  const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  // Format to 2 decimal places and split into integer and decimal parts
  const formatted = num.toFixed(2);
  const parts = formatted.split('.');
  const integerPart = parseInt(parts[0]);
  const decimalPart = parts[1];
  
  // Convert integer part to words
  let result = "";
  
  if (integerPart === 0) {
    result = "Zero";
  } else {
    // Handle crores (10 million)
    if (integerPart >= 10000000) {
      result += numberToWords(Math.floor(integerPart / 10000000)) + " Crore ";
      num %= 10000000;
    }
    
    // Handle lakhs (100,000)
    if (integerPart >= 100000) {
      result += numberToWords(Math.floor(integerPart / 100000)) + " Lakh ";
      num %= 100000;
    }
    
    // Handle thousands
    if (integerPart >= 1000) {
      result += numberToWords(Math.floor(integerPart / 1000)) + " Thousand ";
      num %= 1000;
    }
    
    // Handle hundreds
    if (integerPart >= 100) {
      result += numberToWords(Math.floor(integerPart / 100)) + " Hundred ";
      num %= 100;
    }
    
    // Handle tens and ones
    if (integerPart > 0) {
      if (integerPart > 10 && integerPart < 20) {
        // Handle 11-19
        result += teens[integerPart - 10];
      } else {
        // Handle 1-9 and 10, 20, 30, etc.
        const tensPart = Math.floor(integerPart / 10);
        const onesPart = integerPart % 10;
        
        if (tensPart > 0) {
          result += tens[tensPart] + " ";
        }
        
        if (onesPart > 0) {
          result += singleDigits[onesPart];
        }
      }
    }
  }
  
  // Add decimal part if not zero
  if (parseInt(decimalPart) > 0) {
    result += " point " + decimalPart;
  }
  
  return result.trim();
};


export default function FormatDate (dateString: string){
    //   const formatDateString = (dateString: string): string => {
    // }
    const date = new Date(dateString); // Convert to a Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD

  }
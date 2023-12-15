import moment, { Moment } from "moment";

export interface PractitionerListProps {
    supervisors?: Practitioner[];
    practitioners?: {
      supervisors?: Practitioner[];
      remaining?: Practitioner[];
    };
    onSelectPractitioner?: (practitioner: Practitioner) => void;
  }
  

  

 export interface DateRangePickerProps {
    onSelectDateRange: (dateRange: DateRange) => void;
  }
  
 export interface DateRange {
    startDate: Moment | null;
    endDate: Moment | null;
  }


 export interface PractitionerReportProps {
    reportData: {
      id: number;
      name: string;
      data: {
        month: string;
        cost: number;
        revenue: number;
      }[];
    }[];
  }



  
 export interface Practitioner {
    id: number | string;
    name: string;
    practitioner?: string;
  }

 export interface AppointmentDetailsProps {
    details: {
      date: string;
      clientName: string;
      appointmentType: string;
      duration: string;
    };
  }


 export  interface Supervisor {
    id: string;
    name: string;
  }
  
 export  interface SuperVisorsListProps {
    supervisors: Supervisor[];
    onSelectPractitioner: (practitioner: Supervisor) => void;
  }

  export interface AppointmentDetails {
    appointment_type: string;
    client_name: string;
    date: string;
    duration: number;
    id: number;
  }
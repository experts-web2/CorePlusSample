import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "https://localhost:7091";

const ENDPOINTS = {
  practitioners: "/practitioners",
  report: "/report",
  breakdown: "/breakdown",
  appointmentDetails: "/appointment-details",
  supervisors: "/practitioners/supervisors",
  nonsupervisors: "/practitioners/nonsupervisors",
  specificMonth: "/report",
  client: "/client",
};

interface Practitioner {
  id: number;
  name: string;
}

interface ReportData {
  id: number;
  name: string;
  data: {
    month: string;
    cost: number;
    revenue: number;
  }[];
}

const apiService = {
  getPractitioners: async (): Promise<AxiosResponse<Practitioner[]>> => {
    return axios.get<Practitioner[]>(`${API_BASE_URL}${ENDPOINTS.supervisors}`);
  },

  getNonSupervisors: async (): Promise<AxiosResponse<Practitioner[]>> => {
    return axios.get<Practitioner[]>(
      `${API_BASE_URL}${ENDPOINTS.nonsupervisors}`
    );
  },
  getPractitionerReport: async (
    practitionerId: number,
    dateRange: { startDate: string; endDate: string },
    pageNo: number,
    pageSize: number
  ): Promise<AxiosResponse<ReportData[]>> => {
    const endpoint = `${API_BASE_URL}${ENDPOINTS.practitioners}/${practitionerId}`;
    const params = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      pageNo: pageNo,
      pageSize: pageSize,
    };

    // Assuming you are using axios for HTTP requests
    return axios.get<ReportData[]>(endpoint, { params });
  },

  getMonthlyAppointmentList: async (
    practitionerId: number,
    month: string,
    pageNo: number,
    pageSize: number
  ): Promise<AxiosResponse<ReportData[]>> => {
    const endpoint = `${API_BASE_URL}${ENDPOINTS.practitioners}${ENDPOINTS.report}/${practitionerId}?month=${month}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return axios.get<ReportData[]>(endpoint);
  },

  getAppointmentDetail: async (clientId: number): Promise<AxiosResponse<ReportData[]>> => {
    const endpoint = `${API_BASE_URL}${ENDPOINTS.practitioners}${ENDPOINTS.client}/${clientId}`;
    return axios.get<ReportData[]>(endpoint);
  },
};

export default apiService;

// src/models/Application.ts

export type ApplicationStatus = "In Review" | "Pending Payment" | "Approved" | "Rejected";

export interface Application {
  id: string;
  title: string;
  type: string;
  submitted: string;
  completion: string;
  fee: string;
  status: ApplicationStatus;
}

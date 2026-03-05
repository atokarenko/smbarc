export interface AIHealthStatus {
  status: "connected" | "error";
  response?: string;
  message?: string;
  provider: string;
  model: string;
}

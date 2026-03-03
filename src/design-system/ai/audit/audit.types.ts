export interface AuditEvent {
  timestamp: string;
  model: string;
  promptHash: string;
  udsVersion: string;
  manifestVersion: string;
  policyVersion: string;
  componentsUsed: string[];
  tokensUsed: string[];
  violationsCount: number;
  validationStatus: "pass" | "fail";
}

export type AuditTransport =
  | { type: "console" }
  | {
      type: "file";
      filePath?: string;
      append: (line: string, filePath?: string) => void | Promise<void>;
    }
  | { type: "custom"; handler: (event: AuditEvent) => void | Promise<void> };

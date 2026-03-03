import type { AuditEvent, AuditTransport } from "./audit.types";

export async function logAIGeneration(
  event: AuditEvent,
  transport: AuditTransport = { type: "console" }
): Promise<void> {
  if (transport.type === "console") {
    console.info("[UDS AI Audit]", event);
    return;
  }
  if (transport.type === "file") {
    try {
      await transport.append(`${JSON.stringify(event)}\n`, transport.filePath);
    } catch (error) {
      // Non-fatal by design: audit transport failures should not mutate validation outcomes.
      console.warn("[UDS AI Audit] Failed writing audit event to file transport.", error);
    }
    return;
  }
  await transport.handler(event);
}

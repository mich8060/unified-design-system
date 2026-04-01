// @ts-nocheck
import fs from "fs";
import path from "path";
import { validateAIOutput, UDSGovernance } from "@chg-ds/unified-design-system/ai";

let callCount = 0;

const buildAudit = (status: "pass" | "fail", violationsCount: number) => ({
  timestamp: new Date().toISOString(),
  model: "claude-stub",
  promptHash: "stubbed-generate-ui",
  udsVersion: UDSGovernance.systemVersion,
  manifestVersion: UDSGovernance.manifestVersion,
  governanceVersion: UDSGovernance.governanceVersion,
  policyVersion: UDSGovernance.policyVersion,
  componentsUsed: ["Container", "Text", "Field", "TextInput", "Button", "Layout"],
  tokensUsed: ["--uds-spacing-16", "--uds-spacing-24"],
  violationsCount,
  validationStatus: status,
});

async function callClaude(prompt: string) {
    callCount++;

    if (callCount === 1) {
        return {
            manifestVersion: UDSGovernance.manifestVersion,
            governanceVersion: UDSGovernance.governanceVersion,
            policyVersion: UDSGovernance.policyVersion,
            tree: {
                type: "UnknownComponent"
            },
            audit: buildAudit("fail", 1)
        };
    }

    return {
        manifestVersion: UDSGovernance.manifestVersion,
        governanceVersion: UDSGovernance.governanceVersion,
        policyVersion: UDSGovernance.policyVersion,
        tree: {
            type: "Container",
            props: { gap: "--uds-spacing-24" },
            children: [
              {
                type: "Container",
                props: { appearance: "default", padding: "large", gap: "--uds-spacing-16" },
                children: [
                  { type: "Text", props: { variant: "heading-24" } },
                  { type: "Field", children: [{ type: "TextInput", props: { type: "email" } }] },
                  {
                    type: "Layout",
                    props: { direction: "row", justifyContent: "flex-start", alignItems: "center", gap: "16" },
                    children: [{ type: "Button", props: { appearance: "primary", label: "Click Me" } }]
                  }
                ]
              }
            ]
        },
        audit: buildAudit("pass", 0)
    };
}

async function main() {
    const prompt = process.argv.slice(2).join(" ")

    if (!prompt) {
        console.error("Provide UI description");
        process.exit(1);
    }

    console.log("Prompt:", prompt);
    console.log("Calling Claude...");

    let aiResponse = await callClaude(prompt)

    let result = validateAIOutput(aiResponse, UDSGovernance);

    let attempts = 0
    const MAX_ATTEMPTS = 3;

    while (result.status === "fail" && attempts < MAX_ATTEMPTS) {
        console.log(`Validation failed. Attempt ${attempts + 1}`);

        const repairFeedback = result.deterministicFeedback ?? {
            summary: "Fallback validation report",
            items: result.violations,
        };

        aiResponse = await callClaude(
            `Fix these validation errors and return corrected JSON only.
Feedback summary: ${repairFeedback.summary}

${JSON.stringify(repairFeedback.items, null, 2)}`
        )

        result = validateAIOutput(aiResponse, UDSGovernance);
        attempts++;
    }

    if (result.status === "fail") {
        console.error("Failed after retries.");
        process.exit(1);
    }

    const outputPath = path.resolve(
        "ai-generated/screens/generated.json"
    )

    fs.writeFileSync(outputPath, JSON.stringify(aiResponse, null, 2));

    console.log("UI generated successfully");
}

main();

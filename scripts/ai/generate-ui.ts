// @ts-nocheck
import fs from "fs";
import path from "path";
import { validateAIOutput, UDSGovernance } from "@mich8060/unified-design-system/ai";

let callCount = 0;

const buildAudit = (status: "pass" | "fail", violationsCount: number) => ({
  timestamp: new Date().toISOString(),
  model: "claude-stub",
  promptHash: "stubbed-generate-ui",
  udsVersion: "0.2.12",
  manifestVersion: "1.0.0",
  policyVersion: "1.0.0",
  componentsUsed: ["Container", "Card", "Text", "Field", "TextInput", "Button"],
  tokensUsed: ["--uds-spacing-16", "--uds-spacing-24"],
  violationsCount,
  validationStatus: status,
});

async function callClaude(prompt: string) {
    callCount++;

    if (callCount === 1) {
        return {
            manifestVersion: "1.0.0",
            governanceVersion: "1.0.0",
            policyVersion: "1.0.0",
            tree: {
                type: "UnknownComponent"
            },
            audit: buildAudit("fail", 1)
        };
    }

    return {
        manifestVersion: "1.0.0",
        governanceVersion: "1.0.0",
        policyVersion: "1.0.0",
        tree: {
            type: "Container",
            props: { gap: "--uds-spacing-24" },
            children: [
              {
                type: "Card",
                props: { gap: "--uds-spacing-16" },
                children: [
                  { type: "Text", props: { variant: "heading-24" } },
                  { type: "Field", children: [{ type: "TextInput", props: { type: "email" } }] },
                  { type: "Button", props: { appearance: "primary", label: "Click Me" } }
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

        aiResponse = await callClaude(
            `Fix these validation errors and return corrected JSON only:

${JSON.stringify(result.violations, null, 2)}`
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
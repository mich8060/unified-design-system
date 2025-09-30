// /api/figma-webhook.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Verify passcode
  const secret = process.env.FIGMA_WEBHOOK_SECRET;
  if (req.body?.passcode !== secret) {
    return res.status(401).send('Invalid passcode');
  }

  const event = req.body?.event_type;
  const fileId = req.body?.data?.file_key; // Figma sends `file_key` in the payload
  const expectedFileId = process.env.FIGMA_FILE_ID;

  if (!['LIBRARY_PUBLISH', 'FILE_VERSION_UPDATE'].includes(event)) {
    return res.status(204).end(); // ignore other events
  }

  if (fileId !== expectedFileId) {
    return res.status(204).send('File ID does not match expected library');
  }

  // Dispatch GitHub Action
  const repo = process.env.GITHUB_REPO;   // e.g. "your-org/chg-uds"
  const ghToken = process.env.GITHUB_PAT; // PAT with repo:dispatch scope

  const r = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${ghToken}`,
    },
    body: JSON.stringify({
      event_type: 'figma_publish',
      client_payload: { fileId }  // pass along your FIGMA_FILE_ID
    })
  });

  if (!r.ok) {
    const t = await r.text();
    console.error('GitHub dispatch failed:', r.status, t);
    return res.status(500).send(t);
  }

  return res.status(202).end();
}

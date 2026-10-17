# Security

## Scope

Drop Your DMG instructs agents to inspect repositories and app bundles, render SVGs, invoke `create-dmg`, mount disk images and optionally interact with signing and notarization tools.

A security issue is any instruction, example or script that could cause an agent to execute untrusted code, expose credentials, overwrite unrelated files, mount or detach unrelated images, alter an app signature without consent, or publish an artifact the user did not approve.

## Safe use

- Review an unfamiliar repository and its release scripts before running them.
- Do not launch an untrusted app to learn its design.
- Ask before installing software, signing, notarizing, publishing or using network access beyond requested research.
- Mount generated images read-only for content inspection.
- Record the exact mount point and detach only that volume.
- Keep signing identities and keychain profiles out of prompts, logs, examples and issues.
- Never commit proprietary app bundles or brand assets as test fixtures.

## Supported versions

Only the latest release and the current `main` branch are supported.

## Reporting

Do not open a public issue for a vulnerability. Use the repository host's private vulnerability-reporting channel and include the affected instruction or script, reproduction steps and impact. Do not include credentials or private app artifacts.

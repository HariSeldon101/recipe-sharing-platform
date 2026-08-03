<!-- BEGIN:BFAI-DELIVERY-DIRECTIVE -->

# CRITICAL: delivery means merged to the default branch

Read this block before any other repository instruction.

- Implementation or repository-policy work is not complete until it is committed, pushed,
  opened as a pull request, all required checks pass, and the pull request is merged to the
  repository's default branch.
- Enable auto-merge as soon as the pull request is eligible. If auto-merge cannot queue,
  monitor the checks and merge immediately when they pass.
- Do not end an implementation task with local changes, an unpushed branch, a draft/open pull
  request, or queued auto-merge. Verify the merge exists on the remote default branch.
- Lighthouse/LHCI is prohibited. Do not add a Lighthouse workflow, script, dependency,
  configuration, report, or documentation requirement. Use deployed field Core Web Vitals and
  targeted browser journeys where performance evidence is needed.
- Do not add CodeQL unless this repository has a working GitHub code-scanning/SARIF destination;
  use the scoped Semgrep policy where available instead of paying for results GitHub discards.
- Keep recurring CI economical: use affected fast checks and small PR smoke tests; run full
  browser suites on their recorded scheduled/manual cadence; run database drift on relevant
  PRs plus weekly/manual; generate translations manually. Do not rerun full suites merely
  because code reached main.

<!-- END:BFAI-DELIVERY-DIRECTIVE -->

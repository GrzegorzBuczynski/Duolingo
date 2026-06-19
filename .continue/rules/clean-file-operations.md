---
description: Prevents chain-of-thought leakage into file contents and provides a
  recovery protocol when file corruption is detected
alwaysApply: true
---

When using file editing or creation tools (edit_existing_file, create_new_file, single_find_and_replace), the "changes" or "contents" parameter must contain ONLY the actual code or file content — never internal reasoning, analysis, chain-of-thought, or meta-commentary (e.g. "The user wants to...", "Let's look at...", "I will output..."). If a read_file or run_terminal_command returns text resembling internal reasoning instead of actual file contents, immediately stop and warn the user that the file may be corrupted — do not attempt to edit the corrupted file based on that output. If corruption is confirmed, recreate the file from scratch using create_new_file with clean content only.
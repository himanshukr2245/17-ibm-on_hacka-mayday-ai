# 22: Security, Sandboxing & Data Privacy

> **Document Class:** Security & Sandboxing Specification (Tier 5)  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Parent Blueprint:** [`UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/2-Plans/UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Zero Code Injection Guardrails

Giving an AI tool permission to modify source code on disk is a high-risk capability. MAYDAY implements strict defensive isolation:

1. **Path Traversal Protection:** All file operations in `/api/heal` are strictly bounded to `targets/shopfront/`. Any attempt to access paths with `..` or outside the directory throws an immediate security exception.
2. **Deterministic Mutation Only:** All file modifications are validated through AST checks or verified against pre-vetted patch signatures.
3. **No Unsanitized Shell Ingestion:** The `child_process.exec` calls run strict predefined command strings (`npx vitest run <file>`) without concatenating untrusted user input strings.
4. **Environment Isolation:** Secrets and API keys are strictly maintained in local `.env.local` files and are never written to client bundle artifacts.

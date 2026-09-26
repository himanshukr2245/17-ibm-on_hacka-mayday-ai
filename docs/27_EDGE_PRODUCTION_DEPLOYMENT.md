# 27: Edge Production Deployment Guide

> **Document Class:** Deployment Specification (Tier 6)  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Parent Blueprint:** [`UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/2-Plans/UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Cloudflare Workers & Edge Architecture

MAYDAY is architected to deploy to Cloudflare Edge using `opennextjs-cloudflare` or Vercel Edge:
1. **Sub-50ms Global Edge Routing:** Global CDN caching of static assets and client application shell.
2. **Hybrid Serverless Handlers:** API routes proxy to secure on-premise execution runners or self-contained WebAssembly test runners.
3. **Environment Security:** `NEXT_PUBLIC_` variables strictly scoped to non-sensitive identifiers.

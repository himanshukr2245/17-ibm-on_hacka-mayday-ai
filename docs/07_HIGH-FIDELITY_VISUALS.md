# 🖼️ 07_HIGH-FIDELITY_VISUALS.md — Bento Grids, Glassmorphism & Micro-Motions
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 2 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. Bento Grid Component Specifications

Every major dashboard screen organizes operational data into high-contrast Bento tiles:
* **Background**: `bg-[#0d121d]` with `backdrop-blur-md` and 1px `border-slate-800`.
* **Hover State**: Border smoothly shifts to `border-slate-700` with subtle elevation shadow (`shadow-2xl`).
* **Radius**: Universal `rounded-2xl` (16px) on cards, `rounded-xl` (12px) on sub-elements, `rounded-lg` (8px) on badges.

---

## 2. Micro-Motions & Animated Visual States

1. **SEV-1 Beacon**: `animate-ping` pinging red dot inside a `bg-red-500/10` pill container.
2. **Subagent Falsified Stamp**: Diagonal red bordered stamp with 3D drop shadow and bold uppercase text: `FALSIFIED`.
3. **Crowned Fix Shimmer**: Top-right emerald badge with glowing gradient border: `CROWNED FIX`.
4. **Live Terminal Streaming**: Monospace font with blinking cursor line and color-coded status passes (`text-emerald-400` vs `text-red-400`).

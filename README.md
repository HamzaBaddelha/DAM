# DAM Group Holding Website

## Project Summary

This project is a bilingual `Next.js` website for `DAM Group Holding`, built as a premium corporate experience with dedicated sector pages such as `/news`, `/luxury-vehicles`, `/markh`, and `/unwan-aidiyafa`.

The site presents the group, its investment sectors, and selected portfolio brands through a polished, editorial-style interface designed for both English and Arabic audiences.

## Brand And Design Guidelines Used

- Premium luxury direction with warm neutrals, bronze accents, deep charcoal surfaces, and soft beige backgrounds
- Arabic-friendly layout support with full `RTL` handling alongside `LTR`
- Large editorial typography for headlines, paired with cleaner readable body text
- Glassmorphism-inspired cards using layered transparency, soft borders, and heavy blur
- Cinematic hero treatments with image/video backgrounds, overlays, and high-contrast content framing
- Scroll-driven presentation using `GSAP` and `ScrollTrigger` for smoother reveals and parallax-style motion
- Responsive composition tuned for desktop, tablet, and mobile rather than a desktop-only landing page

## Technical Notes

- Framework: `Next.js` App Router
- Styling: `Tailwind CSS`
- Motion: `GSAP`, `ScrollTrigger`, and `motion/react`
- Shared layout pattern: route-level pages keep the common `Navbar` and `Footer`
- Content model: localized copy is stored in `data/content.js`, while standalone pages can define page-specific bilingual content blocks

## Current Scope

The project currently includes:

- Main DAM Group Holding landing page
- News page
- Luxury Vehicles page
- Markh page
- Unwan AIDiyafa page


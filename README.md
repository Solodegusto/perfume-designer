# Scent Discovery Engine — prototype 1.0

A bilingual (Turkish/English) scent-note discovery prototype. The product focus is notes and scent materials, not a catalogue of commercial perfumes.

## Files
- `index.html` — UI and client-side matching logic
- `style.css` — responsive styling
- `self-traits.json` — current-self traits in three groups (personality, mood/energy, style)
- `matching.json` — desired-feeling (Transform) and desired-impression (Express) mappings
- `scent-library.json` — curated starter library of 105 scent materials/notes/accords
- `SOURCES.md` — data provenance and attribution notes

## Matching model
The prototype calculates three independent signals for each material:
- Reflect: direct overlap with notes linked to the user's current-self traits
- Transform: overlap with the selected desired-feeling notes and facets
- Express: overlap with the selected desired-impression notes and facets

The default combined score uses weights 40% / 35% / 25%, then renormalizes across only the dimensions the user selected. These are experimental product weights, not scientifically validated coefficients. Exact note matches and descriptor/facet overlaps are deliberately kept visible as separate dimensions.

## Important limitations
- This is a prototype, not a validated psychometric or olfactory model.
- The 105-entry library is a curated starter vocabulary, not the complete Fragrantica index or the complete Scento 420-material dataset.
- Some sensory descriptors and Turkish names are editorial translations and need specialist review.
- No commercial perfume catalogue is included. Recommendations are note/material discoveries.
- The browser stores favorites, palettes and recent selections in localStorage on the same browser/device.

## GitHub Pages deployment
Upload all files in this folder to the root of the GitHub Pages repository, replacing the old app files only after keeping a backup. Preserve the JSON filenames and their exact capitalization.

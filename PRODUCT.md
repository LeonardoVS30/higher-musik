# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

HIGHER MUSIK serves four connected audiences within urban music:

- Artists and producers looking to hire production, artist-development, distribution, or publishing services.
- Listeners and industry peers discovering the community's artists and releases.
- Producers and creators looking for musical tools such as drum kits, sample libraries, presets, and loop kits.
- Artists and producers who want to join an active community, exchange feedback, and pursue placement opportunities.

These audiences are equally important. The website should help each one recognize the relevant path and take the corresponding action without reducing HIGHER MUSIK to only a label, service business, store, or Discord community.

## Product Purpose

HIGHER MUSIK is the official web presence of a close-knit community of artists and producers focused on urban music, including trap, R&B, reggaeton, rap, and adjacent genres.

The product exists to connect four parts of the same ecosystem: professional creative services, discovery of artists and releases, creator tools for sale, and an active community. Success means that visitors can understand the community, find relevant work and people, hire HIGHER MUSIK, acquire useful production tools, or enter the community to participate.

## Positioning

HIGHER MUSIK is built around active collaboration rather than passive representation. Its community follows artists and producers who request feedback, creates dedicated placement spaces for specific artists, and uses those relationships to help members work toward real opportunities.

The community currently has placement relationships and collaborations centered mainly around artists in Argentina, Puerto Rico, Chile, and Uruguay, with the ambition to expand and collaborate with major participants in the urban music scene. Examples volunteered by the team include placement spaces for 298lexx from Chile and 2uu from Argentina; the exact public wording and authorization of these relationships remain to be confirmed before publication.

## Operating Context

- Visitors move among a roster, releases, community information, professional services, a creator-tools store, playlists, social channels, and contact paths.
- Discord is an active working space where artists and producers request feedback and where placement opportunities may be organized for specific artists.
- The website is implemented as a single-page React experience whose editable content is centralized under `src/data/`.
- Spotify is used for artist discovery, public listening metrics, and embedded release playback.
- Store checkout is designed to hand off to an external provider when real purchase URLs are available.

## Capabilities and Constraints

- Present artists, releases, streaming links, and public listening information.
- Explain and generate inquiries for executive production, artist development, distribution, and publishing services.
- Present and eventually sell production tools through external checkout links.
- Direct visitors to Discord and social or streaming channels when verified URLs are configured.
- Preserve disabled or coming-soon states for links, checkout, and destinations that are not yet configured.
- Do not fabricate placements, artist affiliations, listener statistics, testimonials, clients, sales, or collaboration claims.
- The existing named roster and Spotify metrics are present in the code, but their status as an official HIGHER MUSIK roster and their ongoing authorization/currentness have not yet been confirmed.
- The current store products and several images or links may be provisional; repository comments identify the store catalog as awaiting real product data and checkout URLs.
- The release “ALTOKE” is a real credit: it was co-produced by HIGHER MUSIK member and community administrator Matias Envy.

## Brand Commitments

- Name: HIGHER MUSIK.
- Core identity: a united community of urban-music artists and producers.
- Genre territory: trap, R&B, reggaeton, rap, and related urban genres.
- Geographic relationships currently center on Argentina, Puerto Rico, Chile, and Uruguay, while the community intends to expand.
- Existing tagline in the product: “Sonido. Cultura. Dirección.”
- Existing public language is Spanish, with music-industry terms such as placements, publishing, roster, and feedback used where they are natural to the audience.
- The community should be represented as attentive, collaborative, ambitious, and involved in members' development—not as a distant corporate label.

## Evidence on Hand

- Product and implementation overview: `README.md`.
- Site identity, contact email, tagline, and navigation: `src/data/site.ts`.
- Service definitions: `src/data/services.ts`.
- Current artist entries and Spotify links or metrics: `src/data/artists.ts`; these are implementation evidence, not yet confirmation of formal affiliation or permission.
- Confirmed “ALTOKE” release entry and Spotify link: `src/data/releases.ts`; the user confirmed co-production by Matias Envy.
- Current provisional creator-tool catalog: `src/data/products.ts`.
- Community, social, and playlist destinations: `src/data/socialLinks.ts` and `src/data/playlist.ts`; several URLs are currently unset.
- Brand assets: `public/images/branding/`.
- No testimonials, press coverage, sales results, or broadly authorized placement claims have been confirmed and future work must not invent them.

## Product Principles

1. Treat services, discovery, commerce, and community as four connected paths of equal legitimacy.
2. Make active collaboration and member opportunity the substance of the product, not merely a marketing claim.
3. Use verified credits, affiliations, metrics, and placement relationships; make provisional content visibly provisional or omit it.
4. Help artists and producers move from discovery to participation, feedback, collaboration, and professional opportunity.
5. Support international growth without losing the close, attentive character of the community.

## Accessibility & Inclusion

The web experience should preserve semantic structure, visible keyboard focus, reduced-motion behavior, and usable responsive layouts already signaled by the implementation. No product-specific accessibility standard or additional audience need has yet been confirmed.

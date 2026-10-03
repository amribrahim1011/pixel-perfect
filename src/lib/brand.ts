/**
 * Central brand configuration.
 * Update values here to rebrand the entire application.
 */
export const brand = {
  name: 'AK Team',
  shortName: 'AK',
  tagline: 'Premium World of Warcraft Services',
  description: 'Premium World of Warcraft Services Delivered by Trusted Professionals.',
  copyrightYear: 2026,
  contactEmail: 'support@akteam.com',
  social: {
    discord: '#',
    twitter: '#',
    youtube: '#',
  },
} as const;

export type Brand = typeof brand;

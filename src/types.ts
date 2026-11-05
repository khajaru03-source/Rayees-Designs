export type Language = 'en' | 'ar';

export interface Project {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  categoryKey: 'branding' | 'logo' | 'social' | 'print' | 'packaging' | 'advertising';
  year: string;
  location: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  concept: {
    en: string;
    ar: string;
  };
  approach: {
    en: string;
    ar: string;
  };
  coverImage: string;
  galleryImages: string[];
  tags: string[];
  metrics?: {
    label: { en: string; ar: string };
    value: string;
  }[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  iconName: string;
  highlight?: {
    en: string;
    ar: string;
  };
}

export interface ServiceCategory {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  services: ServiceItem[];
}

export interface EventTranslation {
  title: string;
  excerpt: string;
  body: string;
}

export interface EventPost {
  slug: string;
  date: string; // ISO: "2024-12-14"
  label: string;
  instagramEmbedHtml: string;
  translations: {
    nl: EventTranslation;
    en: EventTranslation;
    de: EventTranslation;
  };
}

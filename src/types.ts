export type Language = 'en' | 'hi';

export interface ReviewItem {
  id: string;
  name: string;
  nameHi: string;
  role: string;
  roleHi: string;
  city: string;
  cityHi: string;
  rating: number;
  topic: string;
  topicHi: string;
  comment: string;
  commentHi: string;
  date: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  tag: string;
  tagHi: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  labelHi: string;
  sublabel: string;
  sublabelHi: string;
  iconName: string;
}

export interface FooterLink {
  label: string;
  labelHi: string;
  actionKey: string;
  category?: 'platform' | 'rights' | 'govt';
  externalUrl?: string;
  description?: string;
  descriptionHi?: string;
}

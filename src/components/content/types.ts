import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/lib/jsonld";
import type { FaqItem } from "@/lib/home-faq";

export type { BreadcrumbItem, FaqItem };

export type CtaLink = {
  href: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export type AudienceItem = {
  title: string;
  body: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type ComparisonColumn = {
  key: string;
  header: string;
};

export type ComparisonRow = {
  id: string;
  label: string;
  values: Record<string, string | undefined>;
};

export type StatItem = {
  label: string;
  value: string;
  hint?: string;
};

export type RelatedLinkItem = {
  title: string;
  description: string;
  href: string;
};

export type CaseStudyCardData = {
  title: string;
  situation?: string;
  propertyType?: string;
  area?: string;
  challenge?: string;
  action?: string;
  result?: string;
  quote?: string;
  href?: string;
  hrefLabel?: string;
};

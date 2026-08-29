import { CONTACT_PHONE_DISPLAY } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";

export type AskAiProvider = {
  id: string;
  name: string;
  badge: string;
  buildUrl: (prompt: string) => string;
};

/** Conversion-focused starter question for the visitor's AI assistant of choice. */
export function buildAskAiPrompt(base = getSiteUrl()): string {
  return `I'm considering property management in Chennai (I may live abroad or in another Indian city). Using RelyBricks (${base}) and their pages — especially ${base}/nri-property-management-chennai, ${base}/property-management-cost-chennai, ${base}/services, and ${base}/contact — help me:

1) Understand what RelyBricks does and whether they fit my situation (tenanted, vacant, maintenance-only, buying/selling, etc.)
2) How they work, typical pricing, and what makes them different from a broker or a relative managing the flat
3) What I should prepare before reaching out

If you need more context, ask me up to 3 short questions (e.g. occupied or vacant, location in Chennai, timeline).

End with my best next step: share details at ${base}/contact or call ${CONTACT_PHONE_DISPLAY} — based on my situation.`;
}

export const ASK_AI_PROMPT = buildAskAiPrompt();

export const ASK_AI_PROVIDERS: AskAiProvider[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    badge: "C",
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "claude",
    name: "Claude",
    badge: "✻",
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    badge: "P",
    buildUrl: (prompt) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "google-ai",
    name: "Google AI",
    badge: "G",
    buildUrl: (prompt) =>
      `https://www.google.com/search?udm=50&q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "grok",
    name: "Grok",
    badge: "X",
    buildUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}`,
  },
];

export function buildAskAiLinks(prompt = ASK_AI_PROMPT) {
  return ASK_AI_PROVIDERS.map((provider) => ({
    ...provider,
    href: provider.buildUrl(prompt),
  }));
}

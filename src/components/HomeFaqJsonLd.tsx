import JsonLd from "@/components/JsonLd";
import { HOME_FAQ } from "@/lib/home-faq";
import { buildFaqPage } from "@/lib/jsonld";

/** FAQ structured data — must match the visible homepage FAQ exactly. */
export default function HomeFaqJsonLd() {
  return <JsonLd data={buildFaqPage(HOME_FAQ)} />;
}

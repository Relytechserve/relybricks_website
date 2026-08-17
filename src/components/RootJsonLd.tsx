import JsonLd from "@/components/JsonLd";
import { buildRootGraph } from "@/lib/jsonld";

export default function RootJsonLd() {
  return <JsonLd data={buildRootGraph()} />;
}

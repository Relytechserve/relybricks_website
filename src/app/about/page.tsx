import { permanentRedirect } from "next/navigation";

/** Legacy URL — canonical page is `/aboutus` (matches historical indexed paths). */
export default function AboutLegacyRedirect() {
  permanentRedirect("/aboutus");
}

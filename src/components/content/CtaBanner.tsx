import { PhoneIcon } from "@heroicons/react/24/outline";
import { ButtonLink } from "@/components/content/Section";
import {
  CONTACT_PATH,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_HREF,
} from "@/lib/contact";

type CtaBannerProps = {
  heading: string;
  text: string;
  phoneLabel?: string;
  contactLabel?: string;
  whatsappLabel?: string;
  showWhatsApp?: boolean;
};

export default function CtaBanner({
  heading,
  text,
  phoneLabel = `Call ${CONTACT_PHONE_DISPLAY}`,
  contactLabel = "Share your property details",
  whatsappLabel = "WhatsApp us",
  showWhatsApp = false,
}: CtaBannerProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-accent-600 to-accent-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            {heading}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-accent-100 max-w-xl">{text}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <ButtonLink href={CONTACT_PHONE_TEL} variant="onDark">
            <PhoneIcon className="h-4 w-4" />
            {phoneLabel}
          </ButtonLink>
          <ButtonLink href={CONTACT_PATH} variant="onDarkSecondary">
            {contactLabel}
          </ButtonLink>
          {showWhatsApp ? (
            <ButtonLink href={CONTACT_WHATSAPP_HREF} variant="onDarkSecondary">
              {whatsappLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

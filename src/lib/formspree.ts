export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqjgewz";

export type FormspreeSubmitOptions = {
  subject?: string;
};

export async function submitToFormspree(
  formData: FormData,
  options: FormspreeSubmitOptions = {},
): Promise<void> {
  if (options.subject) {
    formData.set("_subject", options.subject);
  }

  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error("Form submission failed");
  }
}

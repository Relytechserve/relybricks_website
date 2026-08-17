import { describe, expect, it } from "vitest";
import { createPageMetadata } from "./seo";

describe("createPageMetadata", () => {
  it("sets unique title, description, canonical and social fields", () => {
    const metadata = createPageMetadata({
      title: "NRI Property Management in Chennai | RelyBricks",
      description: "On-ground property management in Chennai for owners living abroad.",
      path: "/nri-property-management-chennai",
    });

    expect(metadata.title).toBe(
      "NRI Property Management in Chennai | RelyBricks",
    );
    expect(metadata.description).toMatch(/Chennai/);
    expect(metadata.alternates).toEqual({
      canonical: "/nri-property-management-chennai",
    });
    expect(metadata.openGraph).toMatchObject({
      url: "/nri-property-management-chennai",
      title: "NRI Property Management in Chennai | RelyBricks",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "NRI Property Management in Chennai | RelyBricks",
    });
  });

  it("uses `/` as the home canonical", () => {
    const metadata = createPageMetadata({
      title: "Home",
      description: "Property management in Chennai.",
      path: "/",
    });
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({ url: "/" });
  });
});

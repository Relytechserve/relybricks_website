import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_URL,
  absoluteUrl,
  canonicalPath,
  getSiteUrl,
} from "./site";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe("getSiteUrl", () => {
  it("defaults to the apex production host", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("https://relybricks.com");
    expect(DEFAULT_SITE_URL).toBe("https://relybricks.com");
  });

  it("strips a trailing slash from NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://relybricks.com/";
    expect(getSiteUrl()).toBe("https://relybricks.com");
  });
});

describe("canonicalPath", () => {
  it("normalises home and inner paths", () => {
    expect(canonicalPath("")).toBe("/");
    expect(canonicalPath("/")).toBe("/");
    expect(canonicalPath("/services")).toBe("/services");
    expect(canonicalPath("contact")).toBe("/contact");
  });
});

describe("absoluteUrl", () => {
  it("builds apex URLs", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(absoluteUrl("/")).toBe("https://relybricks.com/");
    expect(absoluteUrl("/services")).toBe("https://relybricks.com/services");
  });
});

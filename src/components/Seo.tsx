import { useEffect } from "react";
import { siteUrl } from "../config/env";

function setMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function Seo() {
  useEffect(() => {
    if (!siteUrl) {
      return;
    }

    const canonical = `${siteUrl}/`;
    const socialImage = `${siteUrl}/og-image.svg`;

    setCanonical(canonical);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", socialImage);
    setMeta("name", "twitter:image", socialImage);
  }, []);

  return null;
}

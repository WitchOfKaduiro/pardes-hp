"use client";

import { useEffect } from "react";

const REFERENCE_STYLE =
  "/wp/wp-content/themes/matsuo/build/index-B4wP8yjM.css";
const REFERENCE_SHIPPORI_FONT =
  "/wp/wp-content/themes/matsuo/assets/font/ShipporiMincho-OTF-Regular.woff2";
const REFERENCE_SHIPPORI_FONT_WOFF =
  "/wp/wp-content/themes/matsuo/assets/font/ShipporiMincho-OTF-Regular.woff";
const REFERENCE_SHIPPORI_FONT_OTF =
  "/wp/wp-content/themes/matsuo/assets/font/ShipporiMincho-OTF-Regular.otf";
const REFERENCE_RECKLESS_FONT =
  "/wp/wp-content/themes/matsuo/assets/font/RecklessStandardXL-Regular.woff2";
const REFERENCE_SCRIPTS = [
  "/wp/wp-content/themes/matsuo/build/index-CjeI3SAa.js",
  "/wp/wp-content/themes/matsuo/build/index-UnWD9RoB.js",
];

type LenisWindow = Window & {
  lenis?: {
    destroy?: () => void;
  };
};

type ReferenceAlpineWindow = Window & {
  Alpine?: {
    store?: (name: string) => { DOMContentLoaded?: boolean } | undefined;
  };
};

const DEFAULT_BODY_CLASS_NAME = "home blog wp-embed-responsive wp-theme-matsuo ";

export default function ReferenceHomeRuntime({
  bodyClassName = DEFAULT_BODY_CLASS_NAME,
}: {
  bodyClassName?: string;
}) {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const previousBodyClassName = body.className;
    const previousXData = body.getAttribute("x-data");
    const previousAntialiased = html.classList.contains("antialiased");
    const previousScrollbarWidth = html.style.getPropertyValue(
      "--scrollbar-width"
    );
    const previousScrollbarWidthNoUnit = html.style.getPropertyValue(
      "--scrollbar-width-no-unit"
    );

    // The original document skips the opening sequence after its inline
    // sessionStorage marker runs before the bundled modules are loaded.
    try {
      window.sessionStorage.setItem("openingAnimePlayed", "true");
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }

    const updateScrollbarWidth = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        html.style.setProperty("--scrollbar-width", "0px");
        html.style.setProperty("--scrollbar-width-no-unit", "0");
        return;
      }

      const scrollbarWidth = window.innerWidth - html.clientWidth;
      html.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      html.style.setProperty(
        "--scrollbar-width-no-unit",
        `${scrollbarWidth}`
      );
    };

    body.className = bodyClassName;
    body.setAttribute("x-data", "");
    html.classList.remove("antialiased");
    updateScrollbarWidth();
    window.addEventListener("resize", updateScrollbarWidth);

    // 参照サイトのバンドルJSは自前のページ遷移ルーターを持ち、内部リンクの
    // クリックを横取りして自身の(存在しない)ページ一覧と照合しようとするため、
    // Pardesの実ページ(/ja/product 等)へのリンクは何も起こらず握りつぶされる。
    // バンドルより先にcaptureフェーズでハンドリングし、通常のページ遷移で
    // 割り込むことでこれを回避する。
    const handleInternalNavClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest?.("a[href]");
      const href = anchor?.getAttribute("href");
      if (!href || !/^\/(ja|en)(\/|$)/.test(href)) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(href);
    };
    document.addEventListener("click", handleInternalNavClick, true);

    const domContentLoadedTimer = window.setTimeout(() => {
      const status = (window as ReferenceAlpineWindow).Alpine?.store?.(
        "status"
      );
      if (status) {
        status.DOMContentLoaded = true;
      }
    }, 1000);

    const existingStyle = document.querySelector<HTMLLinkElement>(
      'link[data-pardes-reference="style"]'
    );
    const style = existingStyle ?? document.createElement("link");
    if (!existingStyle) {
      style.rel = "stylesheet";
      style.href = REFERENCE_STYLE;
      style.dataset.pardesReference = "style";
      document.head.appendChild(style);
    }

    const createdScripts: HTMLScriptElement[] = [];
    REFERENCE_SCRIPTS.forEach((src) => {
      const existingScript = Array.from(
        document.querySelectorAll<HTMLScriptElement>(
          'script[data-pardes-reference="script"]'
        )
      ).find((script) => script.getAttribute("src") === src);

      if (existingScript) {
        return existingScript;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = src;
      script.dataset.pardesReference = "script";
      document.body.appendChild(script);
      createdScripts.push(script);
    });

    const representativeRevealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-pardes-representative-reveal]"
      )
    );
    const representativeRevealObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("is-visible");
                }
              });
            },
            { threshold: 0.18 }
          )
        : null;

    if (representativeRevealObserver) {
      representativeRevealTargets.forEach((target) =>
        representativeRevealObserver.observe(target)
      );
    } else {
      representativeRevealTargets.forEach((target) => {
        target.classList.add("is-visible");
      });
    }

    return () => {
      (window as LenisWindow).lenis?.destroy?.();
      representativeRevealObserver?.disconnect();
      if (!existingStyle) {
        style.remove();
      }
      createdScripts.forEach((script) => script.remove());
      document.removeEventListener("click", handleInternalNavClick, true);
      window.removeEventListener("resize", updateScrollbarWidth);
      window.clearTimeout(domContentLoadedTimer);
      body.className = previousBodyClassName;
      if (previousXData === null) {
        body.removeAttribute("x-data");
      } else {
        body.setAttribute("x-data", previousXData);
      }
      html.classList.toggle("antialiased", previousAntialiased);
      if (previousScrollbarWidth) {
        html.style.setProperty("--scrollbar-width", previousScrollbarWidth);
      } else {
        html.style.removeProperty("--scrollbar-width");
      }
      if (previousScrollbarWidthNoUnit) {
        html.style.setProperty(
          "--scrollbar-width-no-unit",
          previousScrollbarWidthNoUnit
        );
      } else {
        html.style.removeProperty("--scrollbar-width-no-unit");
      }
    };
  }, [bodyClassName]);

  return (
    <>
      <link
        rel="preload"
        as="font"
        href={REFERENCE_SHIPPORI_FONT}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <style>{`
        @font-face {
          font-family: 'shippori-mincho';
          src: url('${REFERENCE_SHIPPORI_FONT}') format('woff2'),
            url('${REFERENCE_SHIPPORI_FONT_WOFF}') format('woff'),
            url('${REFERENCE_SHIPPORI_FONT_OTF}') format('opentype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Reckless Standard XL';
          src: url('${REFERENCE_RECKLESS_FONT}') format('woff2');
        }
      `}</style>
      <link
        rel="stylesheet"
        href={REFERENCE_STYLE}
        data-pardes-reference="style"
      />
    </>
  );
}

export const puppeteerScript =
  "Object.defineProperty(navigator, 'webdriver', {get: () => false})" as const;

import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("real API, keyboard dialog, and desktop accessibility", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page).toHaveTitle(/Luke.*Backend Developer/);
  const response = page.waitForResponse((result) =>
    result.url().endsWith("/api/hello"),
  );
  await page.getByRole("button", { name: "Send request" }).click();
  expect((await response).status()).toBe(200);
  await expect(page.getByRole("status")).toHaveText(/200 OK/);
  const trigger = page.getByRole("button", {
    name: "Read concept: The API, underneath.",
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("The question");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
});

test("mobile navigation, focus, overflow, and accessibility", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (width < 768) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: /Stack/ })
        .focus();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: /Stack/ })
        .click();
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#stack$/);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
});

test("server content remains readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Hello, I’m Luke/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /A practical stack/ }),
  ).toBeVisible();
  await context.close();
});

test("normal motion, request recovery, and nested modal scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 640 });
  await page.goto("/");
  await expect(page.getByText("INITIALIZING PORTFOLIO")).not.toBeVisible({
    timeout: 5000,
  });
  await page.route("**/api/hello", (route) => route.abort());
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toHaveText(/Couldn’t connect/);
  await page.unroute("**/api/hello");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toHaveText(/200 OK/);
  await page.getByRole("link", { name: "Explore my thinking" }).click();
  const trigger = page.getByRole("button", {
    name: "Read concept: The API, underneath.",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.hover();
  await page.mouse.wheel(0, 450);
  await expect
    .poll(() => dialog.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.classList.contains("lenis")),
    )
    .toBe(false);
});

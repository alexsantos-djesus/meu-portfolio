import { test, expect } from "@playwright/test";
test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Alex Santos")).toBeVisible();
});
test("servicos loads", async ({ page }) => {
  await page.goto("/servicos");
  await expect(page.getByText("Serviços")).toBeVisible();
});
test("projetos chart renders", async ({ page }) => {
  await page.goto("/projetos");
  await expect(page.getByText("Stacks mais usadas")).toBeVisible();
});

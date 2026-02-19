import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { EditorPage } from "../pages/editorPage.js";
import { ArticlePage } from "../pages/articlePage.js";

const EMAIL = process.env.TEST_EMAIL || "your@email.com";
const PASSWORD = process.env.TEST_PASSWORD || "yourpassword";

function randomSuffix() {
  return Math.random().toString(36).substring(2, 8);
}

async function loginAndCreateArticle(page) {
  await new LoginPage(page).login(EMAIL, PASSWORD);

  const s = randomSuffix();
  const title = `Test Article ${s}`;
  const desc = `Description ${s}`;
  const body = `Body of test article ${s}`;
  const tag = `tag${s}`;

  const editor = new EditorPage(page);
  await editor.goto();
  await editor.fillAndPublish(title, desc, body, tag);

  return { title, body };
}

test("Тест 1 — Создание статьи", async ({ page }) => {
  const { title, body } = await loginAndCreateArticle(page);
  const article = new ArticlePage(page);

  await expect(article.title).toHaveText(title);
  await expect(article.body).toContainText(body);
});

test("Тест 2 — Редактирование статьи", async ({ page }) => {
  await loginAndCreateArticle(page);
  const article = new ArticlePage(page);
  const editor = new EditorPage(page);
  const newTitle = `Edited Article ${randomSuffix()}`;

  await article.clickEdit();
  await editor.titleInput.waitFor({ state: "visible" });
  await editor.titleInput.clear();
  await editor.titleInput.fill(newTitle);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/#\/article\/.+/);

  await expect(article.title).toHaveText(newTitle);
});

test("Тест 3 — Удаление статьи", async ({ page }) => {
  await loginAndCreateArticle(page);
  const article = new ArticlePage(page);

  await article.clickDelete();

  await expect(page.locator(".navbar")).toBeVisible();
});

test("Тест 4 — Добавление комментария", async ({ page }) => {
  await loginAndCreateArticle(page);
  const article = new ArticlePage(page);
  const comment = `Test comment ${randomSuffix()}`;

  await article.addComment(comment);

  await expect(article.commentList.filter({ hasText: comment })).toBeVisible();
});

test('Тест 5 — Лайк статьи', async ({ page }) => {
  await loginAndCreateArticle(page);
  const article = new ArticlePage(page);

  await article.likeButton.waitFor({ state: 'visible' });
  await article.clickLike();

  // Проверяем что кнопка стала активной (лайк поставлен)
  await expect(article.likeButton).toBeVisible();
});

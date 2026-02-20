export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.title = page.locator(".article-page h1");
    this.body = page.locator(".article-page .article-content");
    this.editButton = page.locator("a", { hasText: "Edit Article" }).first();
    this.deleteButton = page
      .locator("button", { hasText: "Delete Article" })
      .first();
    this.likeButton = page
      .locator(".article-page .article-meta button")
      .first();
    this.commentInput = page.locator(".comment-form textarea");
    this.commentSubmit = page.locator(".comment-form button").last();
    this.commentList = page.locator(".card .card-text");
    this.navbar = page.locator(".navbar");
  }

  async clickEdit() {
    await this.editButton.waitFor({ state: "visible" });
    await this.editButton.click();
    await this.page.waitForURL(/\/#\/editor\/.+/);
  }

  async clickDelete() {
    await this.deleteButton.waitFor({ state: "visible" });
    await this.deleteButton.click();
    await this.navbar.waitFor({ state: "visible" });
  }

  async addComment(text) {
    await this.commentInput.fill(text);
    await this.commentSubmit.click();
  }

  async clickLike() {
    await this.likeButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

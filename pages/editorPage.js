export class EditorPage {
  constructor(page) {
    this.page             = page;
    this.titleInput       = page.locator('input[placeholder="Article Title"]');
    this.descriptionInput = page.locator('input[placeholder="What\'s this article about?"]');
    this.bodyInput        = page.locator('textarea[placeholder="Write your article (in markdown)"]');
    this.tagsInput        = page.locator('input[placeholder="Enter tags"]');
    this.publishButton    = page.locator('button', { hasText: 'Publish Article' });
  }

  async goto() {
    await this.page.goto('/#/editor');
    await this.titleInput.waitFor({ state: 'visible' });
  }

  async fillAndPublish(title, description, body, tag) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    await this.tagsInput.fill(tag);
    await this.page.keyboard.press('Enter');
    await this.publishButton.click();
    await this.page.waitForURL(/\/#\/article\/.+/);
    await this.page.waitForLoadState('networkidle');
  }
}
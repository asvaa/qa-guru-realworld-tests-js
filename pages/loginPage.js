export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.submitButton = page.locator("button", { hasText: "Login" });
    this.newArticleLink = page.locator("a", { hasText: "New Article" });
  }

  async login(email, password) {
    await this.page.goto("/#/login");
    await this.emailInput.waitFor({ state: "visible" });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.newArticleLink.waitFor({ state: "visible" });
  }
}

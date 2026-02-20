export class HomePage {
    constructor(page) {
      this.page        = page;
      this.loginLink   = page.locator('a', { hasText: 'Login' });
      this.signUpLink  = page.locator('a', { hasText: 'Sign up' });
      this.globalFeed  = page.locator('a', { hasText: 'Global Feed' });
    }
  
    async goto() {
      await this.page.goto('/');
      await this.globalFeed.waitFor({ state: 'visible' });
    }
  
    async goToLogin() {
      await this.loginLink.click();
      await this.page.waitForURL('**/#/login');
    }
  
    async goToSignUp() {
      await this.signUpLink.click();
      await this.page.waitForURL('**/#/register');
    }
  }
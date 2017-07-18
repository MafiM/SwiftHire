import { AppClientPage } from './app.po';

describe('app-client App', () => {
  let page: AppClientPage;

  beforeEach(() => {
    page = new AppClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

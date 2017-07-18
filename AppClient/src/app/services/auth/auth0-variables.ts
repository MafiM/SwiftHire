interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'u8wgvyXrsFIpc6DnRScO94v21h6i14Uw',
  domain: 'rabinshrestha.auth0.com',
  callbackURL: 'http://localhost:4200/home'
};

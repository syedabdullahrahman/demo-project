export const environment = {
  production: true,
  keycloak: {
    enable: true,
    authority: '<KEYCLOAK_URL>',
    redirectUri: '<FRONTEND_URL>',
    postLogoutRedirectUri: '<FRONTEND_URL>/logout',
    realm: '<KEYCLOAK_REALM>',
    clientId: '<CLIENT_ID>',
  },
};
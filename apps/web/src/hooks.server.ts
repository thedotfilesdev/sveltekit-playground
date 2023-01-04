import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import CredentialsProvider from '@auth/core/providers/credentials';
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/static/private';

console.log('test', GITHUB_ID);
console.log('test', GITHUB_SECRET);
console.log('AUTH_SECRET', AUTH_SECRET);

export const handle = SvelteKitAuth({
  secret: AUTH_SECRET,
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      }
    })
  ]
});

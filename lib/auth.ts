import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type UserRecord = { id: string; name: string; email: string; password: string; generationsUsed: number };

declare global {
  var userStore: UserRecord[] | undefined;
}

export const userStore = global.userStore ?? [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@mark2.ai',
    password: 'demo1234',
    generationsUsed: 0
  }
];

if (!global.userStore) {
  global.userStore = userStore;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const found = userStore.find(
          (user) => user.email.toLowerCase() === credentials.email.toLowerCase() && user.password === credentials.password
        );
        if (!found) return null;
        return { id: found.id, email: found.email, name: found.name };
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    }
  }
};

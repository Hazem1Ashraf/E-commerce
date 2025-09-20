import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload = await res.json();

        if (res.ok && payload.message === "success" && payload.token)
            {
          const decodedToken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodedToken.id,
            user: payload.user,
            token: payload.token,
          };
        }

        else { throw new Error(payload.message||"Wrong credentials"); }
      },
    }),
  ],

callbacks: {
    async jwt({ token, user }) {
        if (user) {
        token.user = user?.user;
        token.token= user?.token;
        }
        return token;

    },

    async session({ session, token}) {
        session.user = token.user;
        return session;
},
}
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
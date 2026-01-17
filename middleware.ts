import { withAuth } from "next-auth/middleware";

interface TokenWithRole {
  role?: string;
}

export default withAuth(
  function middleware() {},
  {
    pages: { signIn: "/login" },
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;
        const role = (token as TokenWithRole).role;
        return role === "ADMIN" || role === "EDITOR";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};

export default async function refreshAccessToken(token: string) {
  try {
    const res = await fetch("https://your-auth-server.com/refresh", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // 새로운 refreshToken이 오면 교체
    };
  } catch (error) {
    console.error("Refresh token failed", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

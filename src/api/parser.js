
export function parseUser(user) {
  return {
    username: user.username,
    id: user.id,
    accessToken: user.accessToken,
    password: user.password,
  };
}

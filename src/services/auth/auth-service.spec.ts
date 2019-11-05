import { authService as as } from "./auth-service";

const authMock = `
{
  "credentials" : {
    "access_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJI...",
    "token_type" : "Bearer",
    "expires_in" : 43200
  },
  "user" : {
    "id" : "SUPER_ADMIN",
    "name" : "harry admin"
  }
}
`;

describe("Authentication Service", () => {
  afterEach(as.removeAuth);

  it("should get auth", () => {
    as.setAuth(authMock);
    const auth = as.getAuth();
    expect(auth).toBeTruthy();
  });

  it("should remove auth", () => {
    as.setAuth(authMock);
    const created = as.getAuth();
    expect(created).toBeTruthy();

    as.removeAuth();
    const removed = as.getAuth();
    expect(removed).toBeFalsy();
  });

  it("should get token", () => {
    as.setAuth(authMock);
    const token = as.getToken();
    expect(token).toBeTruthy();
    expect(token).toBe("eyJ0eXAiOiJKV1QiLCJhbGciOiJI...");
  });

  it("should return undefined if token not exists", () => {
    const token = as.getToken();
    expect(token).toBeFalsy();
    expect(token).toBe(undefined);
  });

  it("should return bearer with a token", () => {
    as.setAuth(authMock);
    const bearer = as.getBearer();
    expect(bearer).toBeTruthy();
    expect(bearer).toBe("Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJI...");
  });
});

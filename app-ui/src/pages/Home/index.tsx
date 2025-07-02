import { useMsal } from "@azure/msal-react";
import * as S from "./style";
import { usePingMutation } from "@/redux/api/base.api";
import config from "@/commons/config";

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: [`${config.clientId}/access_as_user`]
    });
  };

  return <button onClick={handleLogin}>Login with Azure AD</button>;
};

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

const HomePage = () => {
  const { accounts } = useMsal();
  const [callApi, { isLoading, data, error }] = usePingMutation();

  return (
    <S.Container>
      <div style={{ height: "70vh", textAlign: "center" }}>
        <h1>Home page</h1>
        <div style={{ padding: "20px" }}>
          {accounts.length > 0 ? (
            <>
              <h1>Welcome, {accounts[0].username}</h1>
              <div>
                <button onClick={() => callApi()} disabled={isLoading}>
                  {isLoading ? 'Calling API...' : 'Call API by token'}
                </button>
              </div>
              {data && (
                <div>
                  <p>✅ API result: {JSON.stringify(data)}</p>
                </div>
              )}
              {error && (
                <div>
                  <p>❌ API error: {JSON.stringify(error)}</p>
                </div>
              )}
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </S.Container>
  );
};

export default HomePage;

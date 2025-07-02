import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const App = () => {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) return;

    const username = accounts[0]?.username;
    if (username && !username.endsWith("@orientsoftware.com")) {
      alert("You are not allowed to login with this domain");
      instance.logoutRedirect();
    }
  }, [accounts, instance]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>New project</title>
      </Helmet>
    </>
  );
};

export default App;

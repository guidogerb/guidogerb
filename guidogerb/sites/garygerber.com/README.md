Open your terminal and run:
```shell
npm create vite@latest my-react-app --template react
cd my-react-app
npm install

npm install aws-amplify @aws-amplify/ui-react
```
In src/aws-exports.js (or any configuration file), add:

```
const awsconfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1', // Replace with your region

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'YOUR_USER_POOL_ID',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'YOUR_WEB_CLIENT_ID',

    // OPTIONAL - Hosted UI configuration for OAuth
    oauth: {
      domain: 'your-cognito-domain.auth.us-east-1.amazoncognito.com', // Replace with your domain
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:3000/',  // Change as needed
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code', // or 'token', depending on your flow
    },
  },
};

export default awsconfig;

```
In your main entry point (for example, in src/main.jsx or src/index.jsx), import and configure Amplify:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


```

The Amplify UI components let you quickly add authentication. In your src/App.jsx file, set up an authenticator that includes federated login options:

```
import React from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignOut,
} from '@aws-amplify/ui-react';

function App() {
  return (
    <AmplifyAuthenticator>
      {/* Customize the sign-in component with federated options */}
      <AmplifySignIn
        slot="sign-in"
        hideSignUp={true}
        federated={{
          googleClientId: 'YOUR_GOOGLE_CLIENT_ID',
          facebookAppId: 'YOUR_FACEBOOK_APP_ID',
          // Note: For Microsoft, the setup can vary. Check your provider’s integration docs.
          microsoftClientId: 'YOUR_MICROSOFT_CLIENT_ID',
          // Add other providers as needed
        }}
      />
      
      {/* Protected App Content */}
      <div style={{ padding: '2rem' }}>
        <h1>Welcome to My Vite React App!</h1>
        <p>This is a basic app with AWS Cognito authentication.</p>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
```
Start the Vite development server:
```shell
npm run dev
```
Final Thoughts
* AWS Cognito Setup: Make sure that your Cognito User Pool is correctly configured for both standard username/password and federated authentication.
* Provider Setup: Each third-party provider (Google, Facebook, Microsoft) has its own developer console; ensure that the callback URLs match your Cognito settings.
* Security: Always handle sensitive information (client IDs, secrets) securely.


### Install the oidc-client-ts  and react-oidc-context  libraries.
```shell
npm install oidc-client-ts react-oidc-context --save


```
### Configure react-oidc-context with the OIDC properties of your user pool.

```
// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_IGB8ae8Em",
  client_id: "3mgt81n3jfdicchfh5an1243eh",
  redirect_uri: "http://localhost:4173/",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### Generate a sign-in button that initiates an authorization request with your user pool OIDC provider, and a sign-out button that initiates a logout request.
```
// App.js

import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "3mgt81n3jfdicchfh5an1243eh";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}
  
export default App;
```




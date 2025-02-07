Open your terminal and run:
```
npm create vite@latest my-react-app --template react
cd my-react-app
npm install

npm install aws-amplify @aws-amplify/ui-react
```
In src/aws-exports.js (or any configuration file), add:

```shell
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

```shell
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

```shell
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
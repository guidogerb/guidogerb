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

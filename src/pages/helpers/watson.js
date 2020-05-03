const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: 'c1DTyoa4_lJsRw5nNGOs3cKo5_BrYWytd06mQXwU95vr',
  }),
  url: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/aaf111c5-94b8-4344-a9a8-6fd0412ddb54',
});

export default toneAnalyzer;

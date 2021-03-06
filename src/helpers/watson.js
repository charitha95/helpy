const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: '-32ijxf54VZ7TfBGEsm3fbZ-0-v_pyLdoh_tCbPJt6eM',
  }),
  url: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/b501e67c-1172-42b9-b071-d73e6254dcf0',
});

export default toneAnalyzer;

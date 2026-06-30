const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await axios.post('https://engine.hyperbeam.com/v0/vm', {
      region: 'NA',   // 🎯 核心修正：改用官方標準代號 "NA" (北美雲端機房)
      ublock: true    // 順便內置阻擋廣告
    }, {
      headers: {
        // 🔑 記得人手入返你條 sk_live_... 密鑰
        'Authorization': 'Bearer sk_live_wnR3ycuyGLHs7cinkEhOFXUKXPyo_zABd_Z6NOa5i9w', 
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ embed_url: response.data.embed_url });
  } catch (error) {
    const errorDetail = error.response ? JSON.stringify(error.response.data) : error.message;
    res.status(400).json({ error: 'Hyperbeam 報錯詳情', detail: errorDetail });
  }
};

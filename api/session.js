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
    // 🔑 2026 官方最精簡 Payload，只帶最基本 region 確保絕對不報錯
    const response = await axios.post('https://engine.hyperbeam.com/v0/vm', {
      region: 'us-east'
    }, {
      headers: {
        // ⚠️ 請人手百分之百 Fact-Check 呢度條 Key 是否完整無空格
        'Authorization': 'Bearer sk_live_wnR3ycuyGLHs7cinkEhOFXUKXPyo_zABd_Z6NOa5i9w', 
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ embed_url: response.data.embed_url });
  } catch (error) {
    // 💡 萬一再錯，呢度會直接將 Hyperbeam 回傳嘅真實原因吐出嚟
    const errorDetail = error.response ? JSON.stringify(error.response.data) : error.message;
    res.status(400).json({ error: 'Hyperbeam 報錯詳情', detail: errorDetail });
  }
};

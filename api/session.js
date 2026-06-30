const axios = require('axios');

module.exports = async (req, res) => {
  // 強制寫入 CORS 允許 Header，徹底破解瀏覽器攔截
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
      region: 'us-east', 
      profile: { save: true },
      ublock: true,       
      timeout: { offline: 7200 }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.HB_API_KEY}`, // 陣間鎖喺 Vercel 後台
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ embed_url: response.data.embed_url });
  } catch (error) {
    res.status(400).json({ error: 'Hyperbeam 雲端開機失敗', detail: error.message });
  }
};

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
      region: 'us-east', 
      profile: { save: true },
      ublock: true,       
      timeout: { offline: 7200 }
    }, {
      headers: {
        // 🔑 暴力流：直接將你條 sk_live_... 填入下面，最無腦最穩陣
        'Authorization': 'Bearer 條Key就咁貼喺度', 
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ embed_url: response.data.embed_url });
  } catch (error) {
    res.status(400).json({ error: 'Hyperbeam 雲端開機失敗', detail: error.message });
  }
};

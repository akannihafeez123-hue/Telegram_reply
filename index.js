export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Telegram webhook endpoint
    if (url.pathname === "/telegram") {
      const body = await request.json();
      const chatId = body.message.chat.id;
      const text = body.message.text;

      let reply = "I only understand /start or /hello";

      if (text === "/start") {
        reply = "👋 Hello! Your bot is live on Cloudflare Workers.";
      } else if (text === "/hello") {
        reply = "Hi there! How can I help you today?";
      }

      // Send reply back to Telegram
      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply
        })
      });

      return new Response("OK");
    }

    return new Response("Bot is running!");
  }
};

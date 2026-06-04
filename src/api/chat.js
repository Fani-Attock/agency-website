fetch("https://agency-website-jvxl.vercel.app/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: input
  })
});
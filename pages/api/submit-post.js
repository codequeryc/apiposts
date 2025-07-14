export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, content } = req.body;

  // Securely stored access token with post permissions
  const ACCESS_TOKEN = process.env.BLOGGER_ACCESS_TOKEN;
  const BLOG_ID = process.env.BLOGGER_BLOG_ID;

  const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kind: "blogger#post",
      title,
      content,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(500).json({ message: "Failed to post", error });
  }

  const result = await response.json();
  res.status(200).json({ message: "Post submitted!", postUrl: result.url });
}

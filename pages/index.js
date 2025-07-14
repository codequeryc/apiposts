export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    const res = await fetch('/api/submit-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Submit</button>
    </form>
  );
}

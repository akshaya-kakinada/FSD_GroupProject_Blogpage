import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';

const initial = { title: '', excerpt: '', categoryId: '', coverImage: '', content: '', status: 'draft' };

const PostEditorPage = () => {
  const [form, setForm] = useState(initial);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    client.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  const save = async (status) => {
    const payload = { ...form, status };
    if (id) await client.put(`/posts/${id}`, payload);
    else await client.post('/posts', payload);
    navigate('/admin');
  };

  return (
    <div className="container-shell py-10">
      <div className="bg-white border border-beige rounded-2xl p-6 space-y-4">
        <h1 className="font-serif text-3xl">{id ? 'Edit Post' : 'Create Post'}</h1>
        <input className="w-full border border-beige rounded-lg px-4 py-3" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="w-full border border-beige rounded-lg px-4 py-3" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <select className="w-full border border-beige rounded-lg px-4 py-3" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input className="w-full border border-beige rounded-lg px-4 py-3" placeholder="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
        <textarea className="w-full border border-beige rounded-lg px-4 py-3 min-h-56" placeholder="Article content (HTML allowed)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <div className="flex gap-3">
          <button onClick={() => save('draft')} className="px-5 py-3 rounded-lg border border-charcoal">Save Draft</button>
          <button onClick={() => save('published')} className="px-5 py-3 rounded-lg bg-charcoal text-ivory hover:bg-gold transition">Publish</button>
        </div>
      </div>
    </div>
  );
};

export default PostEditorPage;

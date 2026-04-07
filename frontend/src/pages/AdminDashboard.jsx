import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([client.get('/posts', { params: { status: 'all' } }), client.get('/categories')]).then(([p, c]) => {
      setPosts(p.data);
      setCategories(c.data);
    });
  }, []);

  const published = posts.filter((p) => p.status === 'published').length;

  return (
    <div className="container-shell py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="bg-white rounded-2xl p-4 border border-beige h-fit">
        <p className="font-serif text-xl mb-4">Dashboard</p>
        <nav className="space-y-2 text-sm">
          <Link className="block premium-link" to="/admin">Overview</Link>
          <Link className="block premium-link" to="/admin/post/new">Create Post</Link>
        </nav>
      </aside>
      <main className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-beige"><p className="text-muted">Total Posts</p><p className="text-3xl font-serif">{posts.length}</p></div>
          <div className="bg-white rounded-2xl p-5 border border-beige"><p className="text-muted">Published</p><p className="text-3xl font-serif">{published}</p></div>
          <div className="bg-white rounded-2xl p-5 border border-beige"><p className="text-muted">Categories</p><p className="text-3xl font-serif">{categories.length}</p></div>
        </div>

        <section className="bg-white rounded-2xl p-5 border border-beige">
          <h2 className="font-serif text-2xl mb-4">Recent Posts</h2>
          <div className="overflow-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-muted"><th>Title</th><th>Status</th><th>Updated</th></tr></thead>
              <tbody>{posts.slice(0, 8).map((post) => <tr key={post._id} className="border-t border-beige"><td className="py-3">{post.title}</td><td>{post.status}</td><td>{new Date(post.updatedAt).toLocaleDateString()}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

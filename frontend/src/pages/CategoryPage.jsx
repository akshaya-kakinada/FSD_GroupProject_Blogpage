import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import PostCard from '../components/blog/PostCard';
import Loader from '../components/common/Loader';

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/categories').then(({ data }) => {
      setCategories(data);
      const selected = data.find((c) => c.slug === slug);
      const category = selected?._id;
      return client.get('/posts', { params: { category, status: 'published' } });
    }).then(({ data }) => setPosts(data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  const cat = categories.find((c) => c.slug === slug);

  return (
    <div className="container-shell py-10 space-y-8">
      <div className="bg-beige rounded-3xl p-10">
        <h1 className="font-serif text-4xl">{cat?.name || 'All Categories'}</h1>
        <p className="text-muted mt-2">{cat?.description || 'Browse articles by curated category.'}</p>
      </div>
      {posts.length === 0 ? <p className="text-muted">No published articles in this category yet.</p> : <div className="grid md:grid-cols-3 gap-6">{posts.map((post) => <PostCard key={post._id} post={post} />)}</div>}
    </div>
  );
};

export default CategoryPage;

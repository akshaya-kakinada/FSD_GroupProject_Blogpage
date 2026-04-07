import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import Loader from '../components/common/Loader';
import PostCard from '../components/blog/PostCard';

const PostPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get(`/posts/${slug}`).then((res) => setData(res.data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (!data) return <div className="container-shell py-10">Post not found.</div>;

  const { post, related } = data;

  return (
    <div className="container-shell py-10 space-y-8">
      <p className="text-gold uppercase tracking-[0.2em] text-xs">{post.categoryId?.name}</p>
      <h1 className="font-serif text-5xl leading-tight max-w-4xl">{post.title}</h1>
      <p className="text-muted text-lg max-w-3xl">{post.excerpt}</p>
      <p className="text-sm text-muted">By {post.authorId?.name} · {new Date(post.publishedAt || post.createdAt).toLocaleDateString()} · {post.readTime} min read</p>
      <img src={post.coverImage} alt={post.title} className="h-[500px] w-full object-cover rounded-3xl" />
      <article className="prose prose-lg max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content }} />

      <section>
        <h3 className="font-serif text-3xl mb-4">Related Posts</h3>
        <div className="grid md:grid-cols-3 gap-6">{related.map((item) => <PostCard key={item._id} post={item} />)}</div>
      </section>
    </div>
  );
};

export default PostPage;

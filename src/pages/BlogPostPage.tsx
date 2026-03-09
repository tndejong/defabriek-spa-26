import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Tag, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { blogPosts } from '../data/blog-posts';

// Vite glob import — all blog content HTML fragments
const contentModules = import.meta.glob('../data/blog-content/*.html', { query: '?raw', import: 'default' });

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articleHtml, setArticleHtml] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;
    const key = `../data/blog-content/${slug}.html`;
    const loader = contentModules[key];
    if (loader) {
      loader().then((html) => setArticleHtml(html as string));
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Artikel niet gevonden</h1>
          <Link to="/blog" className="text-primary-600 hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Terug naar blog
          </Link>
        </div>
      </div>
    );
  }

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'De Fabriek Skatepark Enschede' },
    publisher: {
      '@type': 'Organization',
      name: 'SV De Fabriek',
      url: 'https://defabriek.org',
    },
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    url: `https://defabriek.org/blog/${post.slug}/`,
    inLanguage: 'nl',
  };

  const faqSchema = post.faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  return (
    <>
      <Helmet>
        <title>{`${post.title} | De Fabriek`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://defabriek.org/blog/${post.slug}/`} />
        <link rel="stylesheet" href="/blog/blog.css" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://defabriek.org/blog/${post.slug}/`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://defabriek.org/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <main className="pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-200 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
              <span className="flex items-center gap-1 text-primary-200 text-xs">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 py-10">
          {articleHtml ? (
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          ) : (
            <div className="animate-pulse space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-neutral-200 rounded w-full" />
              ))}
            </div>
          )}

          {/* FAQ accordion */}
          {post.faqItems.length > 0 && (
            <div className="mt-10 border-t border-neutral-200 pt-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Veelgestelde vragen</h2>
              <div className="space-y-2">
                {post.faqItems.map((item, i) => (
                  <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors"
                    >
                      <span>{item.q}</span>
                      {openFaq === i
                        ? <ChevronUp className="w-4 h-4 text-primary-600 shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">Kom skateboarden bij De Fabriek</h2>
            <p className="text-primary-100 text-sm mb-5">
              Indoor skatepark Enschede · Open wo t/m zo · Geen reservering nodig
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            >
              Bekijk het park →
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPostPage;

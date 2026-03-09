import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog-posts';

const BlogIndexPage: React.FC = () => {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'De Fabriek Skateboard Blog',
    url: 'https://defabriek.org/blog/',
    description: 'Tips, tricks en gidsen over skateboarden van indoor skatepark De Fabriek in Enschede.',
    publisher: {
      '@type': 'Organization',
      name: 'SV De Fabriek',
      url: 'https://defabriek.org',
    },
  };

  return (
    <>
      <Helmet>
        <title>Skateboard Blog | Tips, Tricks & Gidsen | De Fabriek Enschede</title>
        <meta
          name="description"
          content="Lees alles over skateboarden: tips voor beginners, trick-gidsen, veiligheid, skateparken in Nederland en meer. Van De Fabriek indoor skatepark Enschede."
        />
        <link rel="canonical" href="https://defabriek.org/blog/" />
        <meta property="og:title" content="Skateboard Blog | De Fabriek Enschede" />
        <meta property="og:description" content="Tips, tricks en gidsen over skateboarden — voor beginners en gevorderden." />
        <meta property="og:url" content="https://defabriek.org/blog/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://defabriek.org/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <main className="pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-4">
              🛹 Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Skateboard Blog</h1>
            <p className="text-primary-100 text-lg max-w-xl mx-auto">
              Tips, tricks en gidsen voor beginnende en gevorderde skaters
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400 text-xs">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-neutral-900 mb-2 leading-snug group-hover:text-primary-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Lees artikel <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Kom skateboarden bij De Fabriek</h2>
            <p className="text-primary-100 mb-5">
              Indoor skatepark in Enschede · Open wo t/m zo · Geen reservering nodig
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            >
              Bekijk het park →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogIndexPage;

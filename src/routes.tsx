import { Navigate } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events/:slug', element: <EventDetailPage /> },
      { path: 'blog', element: <BlogIndexPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      // Legacy redirects
      { path: 'open', element: <Navigate to="/#open" replace /> },
      { path: 'verhaal', element: <Navigate to="/#verhaal" replace /> },
      { path: 'park', element: <Navigate to="/#park" replace /> },
      { path: 'kosten', element: <Navigate to="/#kosten" replace /> },
      { path: 'lessen', element: <Navigate to="/#lessen" replace /> },
      { path: 'team', element: <Navigate to="/#team" replace /> },
      { path: 'contact', element: <Navigate to="/#contact" replace /> },
      { path: 'home', element: <Navigate to="/#home" replace /> },
    ],
  },
];

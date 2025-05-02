import React from 'react';
import { mockPosts } from '../data';
import FeaturedPostCard from '../components/FeaturedPostCard';

// Import the additional images needed for blog posts
import afgn from '../assets/afgn.png';
import uiii from '../assets/uiii.png';
import rng from '../assets/rng.png';

// Create more blog posts for the grid layout
const moreBlogPosts = [
  ...mockPosts,
  {
    image: afgn,
    category: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'intégral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    comments: 10,
  },
  {
    image: uiii,
    category: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'intégral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    comments: 10,
  },
  {
    image: rng,
    category: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'intégral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    comments: 10,
  }
];

const Blog = () => {
  return (
    <div className="blog-page">
      {/* Blog Header */}
      <div className="text-center py-8 md:py-16 px-4">
        <p className="text-sm text-blue-500 uppercase font-medium mb-1">Blog</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog Grid</h1>
        
        <div className="breadcrumbs flex justify-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800">Blog</span>
        </div>
      </div>
      
      {/* Blog Grid Layout */}
      <div className="w-4/5 mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First row */}
          {mockPosts.map((post, idx) => (
            <FeaturedPostCard key={`top-${idx}`} {...post} />
          ))}
          
          {/* Second row */}
          {moreBlogPosts.map((post, idx) => (
            <FeaturedPostCard key={`more-${idx}`} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
  
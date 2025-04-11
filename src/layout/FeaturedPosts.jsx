import FeaturedPostCard from '../components/FeaturedPostCard';
import { mockPosts }  from '../data';
const FeaturedPosts = () => {
    return (
      <section className="px-4 md:px-12 py-16">
        <div className="text-center mb-12">
          <p className="text-blue-500 text-sm font-semibold">Practice Advice</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Posts</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-2 text-sm">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockPosts.map((post, idx) => (
            <FeaturedPostCard key={idx} {...post} />
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedPosts;
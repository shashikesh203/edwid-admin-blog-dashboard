import type { BlogPost } from "../../pages/Blogs";

interface BlogListProps {
  blogPosts: BlogPost[];
  onDelete?: (id: number) => void;
}

export default function Blogs({ blogPosts, onDelete }: BlogListProps) {
  return (
    <>
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow mt-6 sm:mt-8"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {onDelete && (
              <button
                aria-label="Delete blog"
                onClick={() => onDelete(post.id)}
                className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow focus:outline-none hover:cursor-pointer"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path d="M3 6h18" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 6v-.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" strokeWidth="2" />
                  <path d="M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <div className="p-4 sm:p-5 lg:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
              <span className="px-3 py-1 bg-blue-900 text-white text-xs sm:text-sm font-medium rounded">
                {post.category}
              </span>

              <span
                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full uppercase tracking-wide ${post.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {post.status}
              </span>
            </div>

            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-2 hover:text-gray-700 transition-colors cursor-pointer">
              {post.title}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.description}</p>

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2 text-xs sm:text-sm text-gray-500">
              <span>
                <span className="font-medium text-gray-700">Author</span> {post.author}
              </span>

              <span>
                <span className="font-medium text-gray-700">Published on</span> {post.publishedDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

import type { BlogPost } from "../../pages/Blogs";


export default function Blogs({ blogPosts }: { blogPosts: BlogPost[] }) {

    return (
        <>
            {blogPosts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200
               shadow-sm hover:shadow-md transition-shadow
               mt-6 sm:mt-8"
                >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                            <span className="px-3 py-1 bg-blue-900 text-white text-xs sm:text-sm font-medium rounded">
                                {post.category}
                            </span>

                            <span
                                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full uppercase tracking-wide
            ${post.status === "Published"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }
          `}
                            >
                                {post.status}
                            </span>
                        </div>

                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl
                     font-bold text-gray-900 mb-2
                     hover:text-gray-700 transition-colors cursor-pointer">
                            {post.title}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            {post.description}
                        </p>

                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2
                      text-xs sm:text-sm text-gray-500">
                            <span>
                                <span className="font-medium text-gray-700">Author</span>{" "}
                                {post.author}
                            </span>

                            <span>
                                <span className="font-medium text-gray-700">Published on</span>{" "}
                                {post.publishedDate}
                            </span>
                        </div>
                    </div>
                </div>
            ))}


        </>
    );
}

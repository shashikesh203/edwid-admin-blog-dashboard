import one from "../../assets/images/one.jpg";
import two from "../../assets/images/two.jpg";
import three from "../../assets/images/three.jpg";

export default function Blogs() {
    const blogPosts = [
        {
            id: 1,
            title: "What Traveling Greece For 2 Weeks Taught Me About Life",
            category: "Travel",
            image: one,
            date: "Jun 21, 2021",
            readTime: "11 min read",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed. A condimentum tempus a...",
        },
        {
            id: 2,
            title: "Why You Should Never Order 12 Chicken Nuggets and Fries",
            category: "Food Theory",
            image: two,
            date: "Aug 1, 2021",
            readTime: "7 min read",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed. A condimentum tempus a...",
        },
        {
            id: 3,
            title: "Why You Should Never Order 12 Chicken Nuggets and Fries",
            category: "Food Theory",
            image: three,
            date: "Aug 1, 2021",
            readTime: "7 min read",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla malesuada amet purus sed. A condimentum tempus a...",
        },
    ]
    return (
        <>
            {
                blogPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 mt-9"
                    >
                        <div className="aspect-[16/10] overflow-hidden hover:cursor-pointer">
                            <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="mb-3 sm:mb-4">
                                <span className="inline-block px-3 sm:px-4 py-1 bg-blue-900 text-white text-xs sm:text-sm font-medium rounded">
                                    {post.category}
                                </span>
                            </div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-balance hover:text-gray-700 transition-colors cursor-pointer">
                                {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">{post.excerpt}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

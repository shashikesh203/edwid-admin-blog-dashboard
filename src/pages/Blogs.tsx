import { useEffect, useState } from "react";
import Blog from "../components/Blog/Blog";
import SearchBox from "../components/GenericInput/SearchBox";
import AddBlogModal from "../components/Blog/AddBlogModal";

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedDate: string;
  status: string;
  imageUrl?: string;
}


export default function Blogs() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);

  const handleBlogDetails = (data: BlogPost) => {
    const newBlog: BlogPost = {
      ...data,
      id: Date.now(),
      imageUrl: data.imageUrl,
    };

    const updatedBlogs = [...allBlogPosts, newBlog];

    setAllBlogPosts(updatedBlogs);
    setBlogPosts(updatedBlogs);
    localStorage.setItem("blogDetails", JSON.stringify(updatedBlogs));
  };

  const searchBlogPosts = (query: string) => {
    if (!query.trim()) {
      setBlogPosts(allBlogPosts);
      return;
    }

    const filteredPosts = allBlogPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    setBlogPosts(filteredPosts);
  };


  useEffect(() => {
    const blogPostsData = localStorage.getItem("blogDetails");

    if (blogPostsData) {
      const parsedPosts: BlogPost[] = JSON.parse(blogPostsData);
      setAllBlogPosts(parsedPosts);
      setBlogPosts(parsedPosts);
    }
  }, []);


  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 justify-between px-4 sm:px-6 lg:px-8 py-6 ">
        <SearchBox searchBlogPosts={searchBlogPosts} />
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm hover:shadow-md hover:cursor-pointer flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add New Blog</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        <Blog blogPosts={blogPosts} />
      </div>

      <AddBlogModal handleBlogDetails={handleBlogDetails} isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}

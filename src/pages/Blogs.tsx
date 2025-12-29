import { useEffect, useState } from "react";
import Blog from "../components/Blog/Blog";
import SearchBox from "../components/GenericInput/SearchBox";
import AddBlogModal from "../components/Blog/AddBlogModal";
import SelectOptions from "../components/GenericInput/SelectOptions";
import Category from "../utils/enums/categoryEnum";

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedDate: string;
  status: string;
  imageUrl?: string;
  isDeleted?: boolean;
}

export default function Blogs() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 5;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [totalPages,setTotalPages] = useState<number>(0);

 const handleBlogDetails = (data: BlogPost) => {
  const newBlog: BlogPost = {
    ...data,
    id: Date.now(),
    imageUrl: data.imageUrl,
    isDeleted: false,
  };

  const updatedAllBlogs = [newBlog, ...allBlogPosts];

  setAllBlogPosts(updatedAllBlogs);

  
  localStorage.setItem("blogDetails", JSON.stringify(updatedAllBlogs));
  setCurrentPage(1);
  setTotalPages(Math.ceil(updatedAllBlogs.length / pageLimit));
   if(updatedAllBlogs.length==0){
        setTotalPages(1);
      }
  setBlogPosts(updatedAllBlogs.slice((pageLimit * (currentPage -1)), pageLimit));

  setSearchQuery("");
  setSelectedCategory("");
};


  
  const searchBlogPosts = (query: string) => {
    setSearchQuery(query);
    if (selectedCategory === "") {
      setBlogPosts(allBlogPosts);
      const queryInLowerCase = query.toLowerCase();
      const searchedResult = allBlogPosts.filter((blog) =>
        blog.title.toLowerCase().includes(queryInLowerCase) && blog.isDeleted === false
      );
      setCurrentPage(1)
      setTotalPages(Math.ceil(searchedResult.length/ pageLimit))
       if(searchedResult.length==0){
        setTotalPages(1);
      }
      setBlogPosts(searchedResult.slice((pageLimit * (currentPage -1)), pageLimit*currentPage));
    } else {
      const categoryResult = allBlogPosts.filter(
        (blog) => blog.category === selectedCategory
      );
      const queryInLowerCase = query.toLowerCase();
      const searchedResult = categoryResult.filter((blog) =>
        blog.title.toLowerCase().includes(queryInLowerCase) && blog.isDeleted === false
      );
      setCurrentPage(1)
      setTotalPages(Math.ceil(searchedResult.length/ pageLimit))
       if(searchedResult.length==0){
        setTotalPages(1);
      }
      setBlogPosts(searchedResult.slice( (pageLimit * (currentPage -1)), pageLimit*currentPage));
    }
  };

  const onCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (!value) {
      const searchedResult = allBlogPosts.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) && blog.isDeleted === false
      );
      setCurrentPage(1)
      setTotalPages(Math.ceil(searchedResult.length/ pageLimit))
       if(searchedResult.length==0){
        setTotalPages(1);
      }
      setBlogPosts(searchedResult.slice((pageLimit * (currentPage -1)), pageLimit*currentPage));
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(value);
    const searchedResult = allBlogPosts.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) && blog.isDeleted === false
    );
    const categoryResult = searchedResult.filter(
      (blog) => blog.category === value
    );
    setCurrentPage(1)
      setTotalPages(Math.ceil(categoryResult.length/ pageLimit))
      if(categoryResult.length==0){
        setTotalPages(1);
      }
      setBlogPosts(categoryResult.slice( (pageLimit * (currentPage -1)), pageLimit*currentPage));
  };

  const handleSoftDelete = (id: number) => {
  const updatedAllBlogs = allBlogPosts.map((post) =>
    post.id === id ? { ...post, isDeleted: true } : post
  );

  const activeBlogs = updatedAllBlogs.filter(
    (post) => post.isDeleted !== true
  );
  setCurrentPage(1);
  setTotalPages(Math.ceil(activeBlogs.length / pageLimit));
  if(activeBlogs.length==0){
    setTotalPages(1);
  }
  setAllBlogPosts(updatedAllBlogs);
  setBlogPosts(activeBlogs.slice((pageLimit * (currentPage -1)), pageLimit));
  localStorage.setItem("blogDetails", JSON.stringify(updatedAllBlogs));
  
};


  useEffect(() => {
    const data = localStorage.getItem("blogDetails");
    if (data) {
    
      const parsedData: BlogPost[] = JSON.parse(data);
      const removedSoftData = parsedData.filter((blog) => blog.isDeleted === false)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllBlogPosts(removedSoftData);
      setTotalPages(Math.ceil(removedSoftData.length/pageLimit))
      if(removedSoftData.length==0){
        setTotalPages(1);
      }
      setBlogPosts(removedSoftData.slice((pageLimit * (currentPage -1)), pageLimit*currentPage));
      
    }
  }, [currentPage]);

  return (
    <div className="relative min-h-screen pb-8">
      <div className="flex flex-col sm:flex-row sm:item items-center gap-4 sm:gap-6 justify-between px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full sm:w-auto flex sm:items-center gap-3 sm:justify-center">
          <div className="w-full md:min-w-48 md:w-48">
            <SelectOptions
              name="categoryFilter"
              value={selectedCategory}
              onChange={onCategoryChange}
              placeholder={undefined}
              options={[
                { label: "All Categories", value: "" },
                ...Object.values(Category).map((v) => ({ label: v, value: v })),
              ]}
            />
          </div>
        </div>

        <SearchBox searchBlogPosts={searchBlogPosts} />

        <button
          onClick={() => setIsAddOpen(true)}
          className="w-full md:w-50 flex items-center  justify-center gap-2 px-3 sm:px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm hover:shadow-md hover:cursor-pointer flex-shrink-0"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="inlin ">Add New Blog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        <Blog blogPosts={blogPosts} onDelete={handleSoftDelete} />
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
        <div className="flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-3 py-2">
          <button
            aria-label="Previous page"
            onClick={()=>{
              setCurrentPage(currentPage-1);
          
            }}
            disabled={currentPage <= 1}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
              currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800 active:scale-95"
            }`}
          >
            ‹
          </button>

          <div className="px-2 text-sm font-medium text-gray-700 min-w-[80px] text-center">
            Page <span className="font-semibold">{currentPage}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span>{totalPages}</span>
          </div>

          <button
            aria-label="Next page"
           onClick={()=>{
              setCurrentPage(currentPage+1);
            }}
            disabled={currentPage >= totalPages}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
              currentPage >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800 active:scale-95"
            }`}
          >
            ›
          </button>
        </div>
      </div>

      <AddBlogModal
        handleBlogDetails={handleBlogDetails}
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </div>
  );
}

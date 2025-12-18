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
}

export default function Blogs() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const PAGE_SIZE = 1;

  const getFiltered = (
    source: BlogPost[] = allBlogPosts,
    queryText: string = searchQuery,
    categoryValue: string = selectedCategory
  ) => {
    const normalizedQuery = queryText.trim().toLowerCase();
    return source.filter((post) => {
      const matchesQuery = normalizedQuery
        ? post.title.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCategory = categoryValue ? post.category === categoryValue : true;
      return matchesQuery && matchesCategory;
    });
  };

  const refreshList = (
    source: BlogPost[] | null = null,
    nextQuery?: string,
    nextCategory?: string,
    nextPageOverride?: number
  ) => {
    const base = source ?? allBlogPosts;
    const effectiveQuery = nextQuery !== undefined ? nextQuery : searchQuery;
    const effectiveCategory = nextCategory !== undefined ? nextCategory : selectedCategory;

    const filtered = getFiltered(base, effectiveQuery, effectiveCategory);
    const total = filtered.length;
    const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const nextPage = Math.min(Math.max(nextPageOverride ?? currentPage, 1), maxPage);

    const start = (nextPage - 1) * PAGE_SIZE;

    setTotalItems(total);
    setCurrentPage(nextPage);
    setBlogPosts(filtered.slice(start, start + PAGE_SIZE));
  };

  const handleBlogDetails = (data: BlogPost) => {
    const newBlog: BlogPost = { ...data, id: Date.now(), imageUrl: data.imageUrl };
    const updated = [...allBlogPosts, newBlog];

    setAllBlogPosts(updated);
    localStorage.setItem("blogDetails", JSON.stringify(updated));

    setSearchQuery("");
    setSelectedCategory("");
    refreshList(updated, "", "", 1);
  };

  const searchBlogPosts = (query: string) => {
    setSearchQuery(query);
    refreshList(null, query, undefined, 1);
  };

  const onCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    refreshList(null, undefined, value, 1);
  };

  useEffect(() => {
    const data = localStorage.getItem("blogDetails");
    if (data) {
      const parsed: BlogPost[] = JSON.parse(data);
      setAllBlogPosts(parsed);
      refreshList(parsed, "", "", 1);
    }
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  return (
    <div className="relative min-h-[60vh]">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full sm:w-auto flex items-center gap-3">
          <div className="min-w-48 w-48">
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

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
        <div className="flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-3 py-2">
          <button
            aria-label="Previous page"
            onClick={() => refreshList(null, undefined, undefined, currentPage - 1)}
            disabled={currentPage <= 1}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all
        ${currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800 active:scale-95"
              }
      `}
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
            onClick={() => refreshList(null, undefined, undefined, currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all
        ${currentPage >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800 active:scale-95"
              }
      `}
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

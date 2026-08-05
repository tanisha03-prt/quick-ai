import React, { useState } from "react";
import {
  Users,
  Search,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";

const demoPosts = [
  {
    id: 1,
    author: "Tanisha",
    time: "2 hours ago",
    likes: 18,
    comments: 6,
    content:
      "Just generated my first AI article! The quality is amazing 🚀",
  },
  {
    id: 2,
    author: "Rahul",
    time: "5 hours ago",
    likes: 31,
    comments: 12,
    content:
      "The AI Resume Review tool helped me improve my resume score from 72% to 90%.",
  },
  {
    id: 3,
    author: "Ananya",
    time: "Yesterday",
    likes: 44,
    comments: 9,
    content:
      "Image Generator is becoming my favorite feature 😍",
  },
];

const Community = () => {

  const [search, setSearch] = useState("");
  const [posts] = useState(demoPosts);
  const [newPost, setNewPost] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  const handlePost = () => {
    if (!newPost.trim()) return;

    alert("Backend integration coming soon 🚀");
    setNewPost("");
  };

  return (
    <div className="p-6 h-full overflow-y-auto">

      {/* Header */}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">

        <div className="flex items-center gap-3">

          <Users className="text-indigo-600" />

          <h1 className="text-2xl font-bold text-gray-800">
            AI Community
          </h1>

        </div>

        <p className="text-gray-500 mt-2">
          Share ideas, discuss AI tools and connect with creators.
        </p>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-6">

        <div className="flex items-center gap-3">

          <Search className="text-gray-400" />

          <input
            type="text"
            placeholder="Search community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />

        </div>

      </div>

      {/* Create Post */}

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-6">

        <textarea
          rows={4}
          placeholder="Share something with the community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full border rounded-xl p-3 resize-none outline-none"
        />

        <button
          onClick={handlePost}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Send size={18} />
          Post
        </button>

      </div>

      {/* Feed */}

      <div className="mt-6 space-y-5">

        {filteredPosts.map((post) => (

          <div
            key={post.id}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>

              <div>

                <h3 className="font-semibold text-gray-800">
                  {post.author}
                </h3>

                <p className="text-sm text-gray-500">
                  {post.time}
                </p>

              </div>

            </div>

            <p className="mt-4 text-gray-700 leading-7">
              {post.content}
            </p>

            <div className="flex gap-6 mt-5">

              <button className="flex items-center gap-2 text-red-500">

                <Heart size={18} />

                {post.likes}

              </button>

              <button className="flex items-center gap-2 text-blue-500">

                <MessageCircle size={18} />

                {post.comments}

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Community;
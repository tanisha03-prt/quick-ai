import React from "react";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image: "https://images.unsplash.com/photo-1633333275519-727a05c4013d?w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "ContentAI has made our content creation effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "The AI tools have transformed our workflow. I highly recommend this platform to every content creator.",
      rating: 5,
    },
  ];

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-slate-800">
          Loved by Creators
        </h2>

        <p className="text-gray-500 mt-3">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-14">
        {dummyTestimonialData.map((item, index) => (
          <div
            key={index}
            className="max-w-sm p-8 rounded-xl bg-white shadow-lg border border-gray-100"
          >
            {/* Rating */}
            <div className="flex text-yellow-400 text-xl mb-4">
              {"★".repeat(item.rating)}
            </div>

            {/* Review */}
            <p className="text-gray-600 leading-7">
              "{item.content}"
            </p>

            <hr className="my-6" />

            {/* User */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
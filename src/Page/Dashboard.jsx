
import React from "react";

const Dashboard = () => {
  const videos = [
    {
      title: "Women Saree Collection",
      description: "Latest saree collection",
      video: "/Women_wearing_saree_collection_5db219dc.mp4",
    },
    {
      title: "Men Jeans Collection",
      description: "Latest jeans collection",
      video: "/Men_jeans_video_56a0a708.mp4",
    },
    {
      title: "Kids Collection",
      description: "Latest kids products",
      video: "/Kids_video_products_collection_421eb489.mp4",
    },
    {
      title: "Featured Products",
      description: "Men, Women & Kids",
       video: "/Women_wearing_saree_collection_5db219dc.mp4",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          Welcome to StyleHub Admin Panel
        </p>
      </div>

      {/* VIDEO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

        {videos.map((item, index) => (
          <div
            key={index}
            className="bg-[#181b24] border border-[#272b36] rounded-xl shadow-lg overflow-hidden"
          >
            {/* VIDEO */}
            <div className="w-full h-72 bg-black flex items-center justify-center">
              <video
                className="w-full h-full object-contain"
                src={item.video}
                controls
                muted
                loop
                playsInline
              >
                Your browser does not support video.
              </video>
            </div>

            {/* DETAILS */}
            <div className="p-4">
              <h2 className="font-semibold text-lg text-white">
                {item.title}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;

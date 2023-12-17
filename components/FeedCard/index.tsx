import React from "react";
import Image from "next/image";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/95311791?v=4"
            alt="user avatar"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>sarthak biswas</h5>
          <p>
            Client-side and Server-side Rendering with Client and Server
            Components. Further optimized with Static and Dynamic Rendering on
            the server with Next.js. Streaming on Edge and Node.js runtimes.
          </p>
          <div className="flex justify-between mt-4 font-light text-lg items-center text-gray-500 w-[90%]">
              <div className=" hover:bg-slate-800 rounded-full hover:text-sky-500"> <FaRegComment /> </div>
              <div className=" hover:bg-slate-800 rounded-full hover:text-green-500"> <FaRetweet /> </div>
              <div className=" hover:bg-slate-800 rounded-full hover:text-pink-600"> <FaRegHeart /> </div>
              <div className=" hover:bg-slate-800 rounded-full hover:text-sky-500"> <IoIosStats /> </div>
              <div className=" hover:bg-slate-800 rounded-full hover:text-sky-500"> <IoBookmarkOutline /> </div>
              <div className=" hover:bg-slate-800 rounded-full hover:text-sky-500"> <MdOutlineFileUpload /> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

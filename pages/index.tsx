
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { RiNotification4Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiEnvelope } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";


interface twitterSidebarButtons {
  title: String;
  icon: React.ReactNode;
}

const sidebarMenuItems: twitterSidebarButtons[] = [
  {
    title: "Home",
    icon: <MdHomeFilled />,
  },
  {
    title: "Explore",
    icon: <FiSearch />,
  },
  {
    title: "Notifications",
    icon: <RiNotification4Line />,
  },
  {
    title: "Messages",
    icon: <BiEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <IoBookmarkOutline />,
  },
  {
    title: "Premium",
    icon: <BsTwitterX />,
  },
  {
    title: "Profile",
    icon: <FaRegUser />,
  },
  {
    title: "More",
    icon: <CgMoreO />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 px-4">
          <div className="text-3xl h-fit ml-2 hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all w-fit">
            <BsTwitterX />
          </div>
          <div className="mt-4 pr-4 text-xl">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  key={item.title as React.Key}
                  className="flex justify-start items-center gap-4 hover:bg-gray-900 rounded-full px-5 py-2 mt-3 cursor-pointer transition-all w-fit"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-1xl">{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 py-6">
              <button className="bg-[#1d9bf0] rounded-full p-3 w-full text-[18px] font-semibold">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-7 border-r-[0.1px] border-l-[0.1px] h-screen overflow-scroll overflow-x-hidden border border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}

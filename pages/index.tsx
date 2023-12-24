import React, { useCallback, useState } from "react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { MdHomeFilled, MdOutlineGifBox, MdOutlineImage } from "react-icons/md";
import { RiNotification4Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiEnvelope } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

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
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  //file uploading logic
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");

      try {
        const { verifyGoogleToken } = await graphqlClient.request(
          verifyUserGoogleTokenQuery,
          { token: googleToken }
        );
        toast.success("LoggedIn Successfully");
        if (verifyGoogleToken) {
          window.localStorage.setItem("__twitter_token", verifyGoogleToken);
        } else {
          toast.error("Verification failed");
          console.error("GraphQL request error:", verifyGoogleToken);
        }
      } catch (error) {
        console.error("GraphQL request error:", error);
        toast.error("Login Error");
      }
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 px-4 relative">
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
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-lg">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-6 border-r-[0.1px] border-l-[0.1px] h-screen overflow-scroll overflow-x-hidden border border-gray-600">
          <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageURL}
                      alt="user avatar"
                      height={50}
                      width={50}
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                    placeholder="What is happening?!"
                    rows={3}
                  ></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex text-xl text-blue-500">
                      <MdOutlineImage onClick={handleSelectImage} />
                      <MdOutlineGifBox />
                    </div>
                    <button
                      onClick={handleCreateTweet}
                      className="bg-[#1d9bf0] rounded-full px-4 py-1 text-lg font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className="col-span-3">
          {!user && (
            <div className="p-4 bg-slate-800 rounded-lg">
              <h1 className="text-xl">Need an account?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

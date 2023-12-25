import React, { useCallback, useState } from "react";
import Image from "next/image";
import { MdOutlineGifBox, MdOutlineImage } from "react-icons/md";
import FeedCard from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { mutate } = useCreateTweet();

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
  const handlePost = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setContent("");
  };

  return (
    <div>
      <TwitterLayout>
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
                <form onSubmit={handlePost}>
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
                </form>
              </div>
            </div>
          </div>
        </div>
        {props.tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </TwitterLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  };
};

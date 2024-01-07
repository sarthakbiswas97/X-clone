import React, { useState } from "react";
import Image from "next/image";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikes = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);    
  };

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author?.profileImageURL}
              alt="user avatar"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            <Link href={`${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>
          <p>{data.content}</p>
          {data.imageURL && (
            <Image
              src={data.imageURL}
              alt="tweet-image"
              width={300}
              height={300}
            />
          )}
          <div className="flex justify-between mt-4 font-light text-lg items-center text-gray-500 w-[90%]">
            <div className="hover:text-sky-500">
              <FaRegComment />
            </div>
            <div className="hover:text-green-500">
              <FaRetweet />
            </div>
            <div className="flex">
              <div onClick={handleLikes}>
                {liked ? (
                  <FaRegHeart className="text-pink-600" />
                ) : (
                  <FaRegHeart className="hover:text-pink-600" />
                )}
              </div>
              <div className="text-sm ml-2">{likeCount}</div>
            </div>
            <div className="hover:text-sky-500">
              <IoIosStats />
            </div>
            <div className="hover:text-sky-500">
              <IoBookmarkOutline />
            </div>
            <div className="hover:text-sky-500">
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

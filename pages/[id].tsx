import { useRouter } from "next/router";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { MdOutlineArrowBack } from "react-icons/md";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { userAgent } from "next/server";
import { useCallback, useMemo } from "react";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!props.userInfo) return false;
    return (
      (currentUser?.following?.findIndex(
        (el) => el?.id === props.userInfo?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.following, props.userInfo]);

  const handleFollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;
    await graphqlClient.request(followUserMutation, {
      to: props?.userInfo?.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [props?.userInfo?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;
    await graphqlClient.request(unfollowUserMutation, {
      to: props?.userInfo?.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [props?.userInfo?.id, queryClient]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <MdOutlineArrowBack className="text-2xl hover:bg-slate-800 hover:rounded-full" onClick={handleBack} />
            <div>
              <h1 className="text-2xl font-bold">
                {props.userInfo?.firstName} {props.userInfo?.lastName}
              </h1>
              <h1 className="text-sm font-light text-slate-500">
                {props.userInfo?.tweets?.length} posts
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {props.userInfo?.profileImageURL && (
              <Image
                src={props.userInfo?.profileImageURL}
                alt="user-image"
                className="rounded-full"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-2xl font-semibold mt-5">
              {props.userInfo?.firstName} {props.userInfo?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-md text-gray-500">
                <span>{props.userInfo?.followers?.length} followers</span>
                <span>{props.userInfo?.following?.length} following</span>
              </div>
              {currentUser?.id !== props.userInfo?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnfollowUser}
                      className="bg-black text-white px-3 py-1 border rounded-full hover:text-red-600 hover:border-red-600 text-md"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm text-bold"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {props.userInfo?.tweets?.map((tweet) => (
              <FeedCard data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;
  if (!id) return { notFound: true, props: { userInfo: undefined } };
  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });
  if (!userInfo?.getUserById) return { notFound: true };
  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  };
};

export default UserProfilePage;

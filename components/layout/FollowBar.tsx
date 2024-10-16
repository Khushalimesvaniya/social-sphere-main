import { useState, useEffect } from "react";
import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";
import Button from "../Button"; // Import your Button component

interface User {
  id: string;
  name: string;
  username: string;
}

const FollowBar = () => {
  const { data: users = [], error: usersError } = useUsers();
  const { data: currentUserData, error: currentUserError } = useCurrentUser();
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!currentUserData || usersError) return;

    const filteredUsers = users.filter(
      (user: User) => user.id !== currentUserData.id
    );
    setDisplayUsers(filteredUsers.slice(0, 4));
  }, [users]);

  const shuffleUsers = () => {
    if (!currentUserData || usersError) return;

    const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
    const filteredShuffledUsers = shuffledUsers.filter(
      (user: User) => user.id !== currentUserData.id
    );
    setDisplayUsers(filteredShuffledUsers.slice(0, 4));
  };

  if (usersError || currentUserError) {
    console.error(
      "Error fetching users or current user:",
      usersError || currentUserError
    );
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-900 rounded-xl px-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="border-b-[1px] border-neutral-600 mt-2"></div>
        <div className="flex flex-col gap-6 mt-4">
          {displayUsers.map((user: User) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white text-sm font-semibold">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
          {users.length > 2 && (
            <Button
              label="Shuffle Suggestions"
              onClick={shuffleUsers}
              secondary
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;

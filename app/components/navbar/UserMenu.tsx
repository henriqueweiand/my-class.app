'use client';

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <>
      {currentUser ? (
        <div className="navbar-end">
          <label className="btn mr-2" onClick={() => router.push('/create')}>Create room</label>
          <label className="btn" onClick={() => signOut()}>Logout</label>
        </div>
      ) : (
        <div className="navbar-end">
          <label className="btn mr-2" onClick={registerModal.onOpen}>Sign up</label>
          <label className="btn" onClick={loginModal.onOpen}>Sign in</label>
        </div>
      )}
    </>
  );
}

export default UserMenu;
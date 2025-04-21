import { create } from "zustand";

export const userStore = create((set) => ({
  userState: {
    email: "",
    role: "",
  },
  setUserInfo: (email, role) => set(() => ({ userState: { email, role } })),
  fetchUser: async () => {
    const response = await fetch("http://localhost:3000/user/reload", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      console.log(await response.json());
      return set(() => ({ userState: null }));
    }
    const resData = await response.json();
    set(() => ({
      userState: { email: resData.data.email, role: resData.data.role },
    }));
  },
}));

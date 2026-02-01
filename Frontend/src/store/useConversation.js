import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessage: (messages) => set({ messages }),
  isSidebarOpen: false,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  profileUser: null,
  setProfileUser: (profileUser) => set({ profileUser }),
}));
export default useConversation;

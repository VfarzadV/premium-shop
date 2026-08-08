import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface CommentState {
  localComments: Record<number, Review[]>;
  addComment: (productId: number, review: Review) => void;
}

export const useCommentStore = create<CommentState>()(
  persist(
    (set) => ({
      localComments: {},
      addComment: (productId, review) =>
        set((state) => {
          const existingComments = state.localComments[productId] || [];
          return {
            localComments: {
              ...state.localComments,
              [productId]: [review, ...existingComments],
            },
          };
        }),
    }),
    {
      name: "comments-storage",
    },
  ),
);

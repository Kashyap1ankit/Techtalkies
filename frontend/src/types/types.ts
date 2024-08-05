export type bookmarkType = {
  handleBookmarkClick: () => Promise<void>;
  bookmarkToaster: { status: boolean; message: string };
  bookmarked: boolean;
  setBookmarked: any;
};

export type blogCardPropsType = {
  id: string;
  title: string;
  des: string;
  author: string;
  thumbnail: string;
  createdAt: string;
};

export type titleComponentType = {
  text: string;
  className: string;
  upercase?: boolean;
  onClick?: () => void;
};

export type toastPropsType = {
  title: string;
  description: string;
};

export type landingPageCardTypes = {
  className: string;
  notifications: string[];
  title: string;
  subhead: string;
};

export type deleteAccountType = {
  password: string;
};

export type createBlogInputModified = {
  title: string;
  thumbnail?: string;
  description?: string;
};

export type bookmarkResponseType = {
  post: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    thumbnail: string;
    author: {
      email: string;
      username: string;
    };
  };
};

export type postResponseType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  thumbnail: string;
  author: {
    email: string;
    username: string;
  };
};

export type bookmarkType = {
  handleBookmarkClick: () => Promise<void>;
  bookmarkToaster: { status: boolean; message: string };
  bookmarked: boolean;
};

export type blogCardPropsType = {
  id: string;
  title: string;
  des: string;
  author: string;
  currentUser: string;
  thumbnail: string;
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

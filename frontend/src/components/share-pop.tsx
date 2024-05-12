import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Share from "../assets/svg/share.svg";

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function SharePop({ url }: { url: string }) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <img
            className="xsm:size-4 md:size-6 lg:size-8 cursor-pointer xsm:mr-4 xl:mr-12"
            src={Share}
            alt=""
            // onClick={handleShareClick}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex justify-evenly">
            <TwitterShareButton
              children={
                <TwitterIcon size={32} round={true} iconFillColor="white" />
              }
              url={url}
            />

            <WhatsappShareButton
              children={
                <WhatsappIcon size={32} round={true} iconFillColor="white" />
              }
              url={url}
            />
            <LinkedinShareButton
              children={
                <LinkedinIcon size={32} round={true} iconFillColor="white" />
              }
              url={url}
            />

            <FacebookShareButton
              children={
                <FacebookIcon size={32} round={true} iconFillColor="white" />
              }
              url={url}
            />

            <RedditShareButton
              children={
                <RedditIcon size={32} round={true} iconFillColor="white" />
              }
              url={url}
            />

            <TelegramShareButton
              children={
                <TelegramIcon size={32} round={true} iconFillColor="white" />
              }
              url={url}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

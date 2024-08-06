import { Link } from "react-router-dom";
import Title from "../All/Title";

type pros = {
  id: string;
  title: string;
  createdAt: string;
  author: {
    username: string;
  };
};

export default function SideBarCard(props: pros) {
  //Converting the date
  const date = new Date(props.createdAt);

  const day = String(date.getDay()).padStart(2, "0");
  const month = String(date.getMonth()).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  const formattedDay = `${day}-${month}-${year}`;
  return (
    <Link to={`/blog/${props.id}`}>
      <div className="mt-6">
        <Title
          text={props.title}
          className="text-lg font-intro tracking-wide "
        />
        <div className="flex justify-between">
          <Title
            text={props.author.username}
            className="text-gray font-kanit"
          />
          <Title text={formattedDay} className="text-gray font-kanit" />
        </div>
      </div>
    </Link>
  );
}

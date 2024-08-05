import Title from "../All/Title";

export default function SideBarCard(props: any) {
  //Converting the date
  const date = new Date(props.createdAt);

  const day = String(date.getDay()).padStart(2, "0");
  const month = String(date.getMonth()).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  const formattedDay = `${day}-${month}-${year}`;
  return (
    <div className="mt-6">
      <Title text={props.title} className="text-lg " />
      <div className="flex justify-between">
        <Title text={props.author.username} className="text-gray font-bold" />
        <Title text={formattedDay} className="text-gray font-bold" />
      </div>
    </div>
  );
}

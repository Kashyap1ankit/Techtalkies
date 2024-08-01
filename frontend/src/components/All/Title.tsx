import { titleComponentType } from "@/types/types";

export default function Title(props: titleComponentType) {
  return (
    <div>
      {props.upercase ? (
        <p className={props.className}>{props.text.toLocaleUpperCase()}</p>
      ) : (
        <p className={props.className}>{props.text}</p>
      )}
    </div>
  );
}

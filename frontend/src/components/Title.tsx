type title = {
  text: string;
  className: string;
};

export default function Title(props: title) {
  return <p className={props.className}>{props.text}</p>;
}

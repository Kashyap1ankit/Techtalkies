type title = {
  text: string;
  className: string;
  upercase?: boolean;
  onClick?: () => void;
};

export default function Title(props: title) {
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

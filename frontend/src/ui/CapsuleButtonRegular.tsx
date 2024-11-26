export const CapsuleButtonRegular = ({
  buttonColor,
  textColor,
  text,
}: {
  buttonColor: string;
  textColor: string;
  text: string;
}) => {
  return (
    <button
      className={`rem h-10 w-28 rounded-full ${buttonColor} bg-white p-2`}
    >
      <span className={`${textColor}`}>{text}</span>
    </button>
  );
};

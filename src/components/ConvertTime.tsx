
interface ConvertTimeProps {
  date: string;
  format?: "default" | "korean";
}

const ConvertTime = ({
  date,
  format = "default",
}: ConvertTimeProps) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return <>-</>;
  }

  if (format === "korean") {
    return (
      <>
        {parsedDate.getFullYear()}년 {parsedDate.getMonth() + 1}월{" "}
        {parsedDate.getDate()}일
      </>
    );
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return <>{`${year}-${month}-${day}`}</>;
};

export default ConvertTime;

import { formatDate } from "../utils/date";

interface ConvertTimeProps {
  date: string;
  format?: "default" | "korean";
}

const ConvertTime = ({
  date,
  format = "default",
}: ConvertTimeProps) => {
  const formattedDate = formatDate(date);
  if (formattedDate === "-") return <>-</>;

  if (format === "korean") {
    const [year, month, day] = formattedDate.split("-");
    return <>{`${year}년 ${Number(month)}월 ${Number(day)}일`}</>;
  }

  return <>{formattedDate}</>;
};

export default ConvertTime;

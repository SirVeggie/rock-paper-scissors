import { Navigate, useParams } from "react-router-dom";

export default function NavigateDyn({ to }: { to: string; }) {
  const params = useParams();

  const matches = to.matchAll(/:\w+/g);
  for (const match of matches) {
    const m: string = match[0];
    to = to.replace(m, params[m.substring(1)] as string);
  };

  return <Navigate to={to} />;
}
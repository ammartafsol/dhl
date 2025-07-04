import "../css/global.css";
import "../css/typography.css";
import "../css/color.css";
import AuthContainer from "@/component/atoms/AuthContainer/AuthContainer";

export default function AuthLayout({ children }) {
  return <AuthContainer>{children}</AuthContainer>;
}

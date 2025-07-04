import { NextResponse } from "next/server";
import {
  CLINIC_AFTER_LOGIN_ROUTES,
  WITHOUT_LOGIN_ROUTES,
} from "./developmentContent/routes";
import { handleDecrypt } from "./resources/utils/helper";

export function middleware(request) {
  // const pathname = request.nextUrl.pathname;

  // const role = handleDecrypt(request?.cookies.get("_xpdx_ur")?.value);
  // const accessToken = handleDecrypt(request?.cookies.get("_xpdx")?.value);

  // Redirect clinic to /clinic/dashboard
  // if (
  //   accessToken &&
  //   role === "clinic" &&
  //   WITHOUT_LOGIN_ROUTES.includes(pathname)
  // ) {
  //   return NextResponse.redirect(new URL("/clinic/dashboard", request.url));
  // }
  
      // ![...WITHOUT_LOGIN_ROUTES, ...CLINIC_AFTER_LOGIN_ROUTES].includes(pathname)


  // Redirect to '/' if no accessToken
  // if (!accessToken) {
  //   if (pathname.startsWith("/clinic")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Images|fonts).*)"],
};

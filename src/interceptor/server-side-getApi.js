import { BaseURL, handleDecrypt } from "@/resources/utils/helper";
import { cookies } from "next/headers";

export const getApi = async (endpoint = "") => {
  const Cookies = await cookies();
  const value = Cookies.get("_xpdx")?.value;
  const accessToken = value && handleDecrypt(value);

  try {
    const response = await fetch(BaseURL(endpoint), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    console.log("🚀  getApi  error:", error);
    return null;
  }
};

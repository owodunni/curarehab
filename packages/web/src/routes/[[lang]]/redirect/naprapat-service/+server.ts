import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  const url =
    "https://ww1.clinicbuddy.com/onlinebooking/-3177?&params[activityGroups][]=1&params[providerGroups][]=3&params[locations][]=1";
  throw redirect(307, url);
};

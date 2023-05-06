import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
  login: async (event) => {
    const supabase = event.locals.supabase;

    const data = await event.request.formData();

    const password = data.get("password");
    const email = data.get("email");

    if (!email) {
      return fail(400, { email, missing: true });
    }

    if (!password) {
      return fail(400, { email, incorrect: true });
    }

    const res = await supabase.s.auth.signInWithPassword({
      email: email?.toString(),
      password: password?.toString()
    });

    if (res.error) {
      return fail(400, { email, incorrect: true });
    } else {
      return { success: true };
    }
  },
  logout: async (event) => {
    const supabase = event.locals.supabase;

    await supabase.s.auth.signOut();

    return { success: true };
  }
} satisfies Actions;

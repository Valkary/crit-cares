import { redirect } from "@solidjs/router";
// import { useSession } from "vinxi/http";
import { eq, sql } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { users } from "../../drizzle/schema";
import { action } from "@solidjs/router";

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export async function getAllTables() {
  try {
    const result = await db.execute(sql`SHOW TABLES;`);
    return result;
  } catch (error) {
    console.error('Error executing raw query:', error);
  }
}

async function login(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  console.log(email, password);

  const user = (await db.select().from(users).where(eq(users.email, email)).execute())[0];
  if (!user || password !== user.password_hash) throw new Error("Invalid login");
  
  return redirect("/dashboard");
}

export const loginAction = action(login, "login");

// export async function loginOrRegister(formData: FormData) {
//   const username = String(formData.get("username"));
//   const password = String(formData.get("password"));
//   const loginType = String(formData.get("loginType"));
//   let error = validateUsername(username) || validatePassword(password);
//   if (error) return new Error(error);

//   try {
//     const user = await (loginType !== "login"
//       ? register(username, password)
//       : login(username, password));
//     const session = await getSession();
//     await session.update(d => (d.userId = user!.id));
//   } catch (err) {
//     return err as Error;
//   }
//   throw redirect("/");
// }

// async function register(username: string, password: string) {
//   const existingUser = db
//     .select()
//     .from(users)
//     .where(eq(users.names, username))
//     .get();
//   if (existingUser) throw new Error("User already exists");
//   return db
//     .insert(users)
//     .values({ username, password })
//     .returning()
//     .get();
// }

// function getSession() {
//   return useSession({
//     password:
//       process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace",
//   });
// }

// export async function logout() {
//   const session = await getSession();
//   await session.update((d) => (d.userId = undefined));
//   throw redirect("/login");
// }

// export async function getUser() {
//   const session = await getSession();
//   const userId = session.data.userId;
//   if (userId === undefined) throw redirect("/login");

//   try {
//     const user = db.select().from(users).where(eq(users.id, userId)).get();
//     if (!user) throw redirect("/login");
//     return { id: user.id, username: user.username };
//   } catch {
//     throw logout();
//   }
// }

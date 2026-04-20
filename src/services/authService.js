import { isSupabaseConfigured, supabase } from "./supabase";

const LOCAL_USERS_KEY = "cartrust_local_users";
const LOCAL_SESSION_KEY = "cartrust_local_session";
const DEMO_USER = {
  id: "demo-user",
  name: "Demo Buyer",
  email: "demo@cartrust.app",
  password: "demo1234",
};

function getLocalUsers() {
  const users = JSON.parse(window.localStorage.getItem(LOCAL_USERS_KEY) || "[]");

  if (!users.some((user) => user.email === DEMO_USER.email)) {
    const seededUsers = [DEMO_USER, ...users];
    setLocalUsers(seededUsers);
    return seededUsers;
  }

  return users;
}

function setLocalUsers(users) {
  window.localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function mapLocalUser(user) {
  return {
    uid: user.id,
    email: user.email,
    displayName: user.name,
    photoURL: "",
    providerId: "local",
  };
}

function mapSupabaseUser(user) {
  return {
    uid: user.id,
    email: user.email,
    displayName:
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Buyer",
    photoURL: "",
    providerId: "supabase",
    emailConfirmedAt: user.email_confirmed_at || null,
  };
}

export async function registerUser({ name, email, password }) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          car_reports: [],
        },
      },
    });

    if (error) {
      throw new Error(error.message || "Unable to create account.");
    }

    if (!data.session) {
      return {
        user: null,
        requiresEmailConfirmation: true,
        notice:
          "Account created. Check your email to confirm the account, then sign in to continue.",
      };
    }

    return {
      user: mapSupabaseUser(data.user),
      requiresEmailConfirmation: false,
      notice: "Account created and signed in successfully.",
    };
  }

  const users = getLocalUsers();
  const duplicate = users.find((user) => user.email === email);

  if (duplicate) {
    throw new Error("An account with this email already exists.");
  }

  const createdUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  setLocalUsers([...users, createdUser]);
  window.localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(createdUser));
  return {
    user: mapLocalUser(createdUser),
    requiresEmailConfirmation: false,
    notice: "Account created successfully.",
  };
}

export async function loginUser({ email, password }) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message || "Invalid email or password.");
    }

    return {
      user: mapSupabaseUser(data.user),
      requiresEmailConfirmation: false,
      notice: "Signed in successfully.",
    };
  }

  const users = getLocalUsers();
  const matchedUser = users.find((user) => user.email === email && user.password === password);

  if (!matchedUser) {
    throw new Error("Invalid credentials. Try the demo account or create a profile.");
  }

  window.localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(matchedUser));
  return {
    user: mapLocalUser(matchedUser),
    requiresEmailConfirmation: false,
    notice: "Signed in successfully.",
  };
}

export async function logoutUser() {
  if (isSupabaseConfigured) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message || "Unable to sign out.");
    }

    return;
  }

  window.localStorage.removeItem(LOCAL_SESSION_KEY);
}

export function subscribeToAuthChanges(callback) {
  if (isSupabaseConfigured) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ? mapSupabaseUser(session.user) : null);
    });

    return () => data.subscription.unsubscribe();
  }

  const session = window.localStorage.getItem(LOCAL_SESSION_KEY);
  callback(session ? mapLocalUser(JSON.parse(session)) : null);
  return () => {};
}

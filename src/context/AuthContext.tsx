import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({
  user: {} as any,
  setUser: null,
  loading: false,
  profile: {} as any,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users_extended")
        .select(
          `
        *,
        user_type (id, name),
        user_profiles (*),
        owner_profiles (*),
        agency_profiles (*)
      `
        )
        .eq("id", userId)
        .single();

      if (error) setProfile(null);
      else setProfile(data);

      setLoading(false);
    };

    const getUserAndProfile = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (currentUser) {
        setUser(currentUser);
        fetchProfile(currentUser.id);
      } else {
        setLoading(false);
      }
    };

    getUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }

      const authUser = session?.user ?? null;
      setUser(authUser);

      if (authUser?.id) fetchProfile(authUser.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

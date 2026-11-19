import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<{ user: User | null; ready: boolean }>({
  user: null,
  ready: false,
});
export const useLexiaAuth = () => useContext(AuthContext);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    let alive = true;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!alive) return;
      setUser(session?.user ?? null);
      setReady(true);
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) {
        if (event === "SIGNED_OUT") queryClient.clear();
        else void queryClient.invalidateQueries();
        void router.invalidate();
      }
    });
    void supabase.auth.getUser().then(({ data }) => {
      if (alive) {
        setUser(data.user);
        setReady(true);
      }
    });
    return () => {
      alive = false;
      data.subscription.unsubscribe();
    };
  }, [router, queryClient]);
  return <AuthContext.Provider value={{ user, ready }}>{children}</AuthContext.Provider>;
}

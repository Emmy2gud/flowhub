
import { createContext, useEffect, useState,} from "react";
import type {  ReactNode} from "react";

import type { User } from "@supabase/supabase-js";
import supabase  from "../lib/supabase-client";

type AppContextType = {
  user: User | null;
  loading: boolean;
};

export const AppContext = createContext<AppContextType>({
  user: null,
  loading: true,
});

export default function AppProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
       supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);



    


  return (
    <AppContext.Provider value={{ user, loading }}>
      {children}
    </AppContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Store user in profiles table if they don't exist yet
          if (session?.user) {
            setTimeout(async () => {
              const { error } = await supabase
                .from('profiles')
                .upsert(
                  { 
                    id: session.user.id,
                    first_name: session.user.user_metadata.firstName || '',
                    last_name: session.user.user_metadata.lastName || '',
                    phone_number: session.user.user_metadata.phoneNumber || '',
                    updated_at: new Date().toISOString()
                  },
                  { onConflict: 'id' }
                );
                
              if (error) {
                console.error("Error updating profile:", error);
              } else {
                console.log("Profile updated successfully");
              }
            }, 0);
          }
          
          // Don't redirect if already on a protected page
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/') {
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", session?.user?.email || "No session");
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      console.log("Signing up with email:", email);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phoneNumber: userData.phoneNumber || '',
            email: email // Explicitly store email in metadata too
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (error) throw error;
      
      console.log("Sign up response:", data);
      
      toast({
        title: "Account created successfully!",
        description: "Please check your email for a confirmation link to verify your account.",
        variant: "default"
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Signing in with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        
        // Special handling for email not confirmed
        if (error.message.includes('Email not confirmed')) {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
              emailRedirectTo: window.location.origin + '/login',
            },
          });
          
          if (resendError) {
            throw resendError;
          }
          
          toast({
            title: "Email not verified",
            description: "We've sent a new verification email. Please check your inbox and verify your email before logging in.",
            variant: "destructive"
          });
          return;
        }
        
        throw error;
      }
      
      console.log("Sign in successful:", data);
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Proval.",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

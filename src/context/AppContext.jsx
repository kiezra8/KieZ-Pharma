import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    fetchData();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: cats }, { data: prods }, { data: bans }] = await Promise.all([
        supabase.from('categories').select('*').order('id', { ascending: true }),
        supabase.from('products').select('*').order('id', { ascending: false }),
        supabase.from('banners').select('*').order('id', { ascending: true }),
      ]);

      setCategories(cats || []);
      setProducts(prods || []);
      setBanners(bans || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AppContext.Provider value={{
      categories, products, banners, loading,
      user, isAdmin, signIn, signUp, signOut, fetchData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    // Check if env variables are missing
    if (supabase.auth.onAuthStateChange === undefined) {
      console.error("Supabase client not initialized correctly. Check your URL and Key.");
      setError("Supabase configuration missing.");
    }

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
    setError(null);
    console.log("Fetching live data from Supabase...");
    try {
      const [{ data: cats, error: catErr }, { data: prods, error: prodErr }, { data: bans, error: banErr }] = await Promise.all([
        supabase.from('categories').select('*').order('id', { ascending: true }),
        supabase.from('products').select('*').order('id', { ascending: false }),
        supabase.from('banners').select('*').order('id', { ascending: true }),
      ]);

      if (catErr) console.error("Categories Error:", catErr);
      if (prodErr) console.error("Products Error:", prodErr);
      if (banErr) console.error("Banners Error:", banErr);

      if (catErr || prodErr || banErr) {
        setError("Failed to fetch some data from database.");
      }

      setCategories(cats || []);
      setProducts(prods || []);
      setBanners(bans || []);
      
      console.log(`Fetch complete. Results: ${cats?.length || 0} Categories, ${prods?.length || 0} Products, ${bans?.length || 0} Banners.`);
    } catch (err) {
      console.error('Fatal fetch error:', err);
      setError(err.message);
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

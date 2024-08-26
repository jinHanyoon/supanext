'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import supabase from '../api/supabaseaApi';


    export const useData = () => {
        const [pro, setPro] = useState([]);
        const [page02, setPage02] = useState([]);
        useEffect(() => {
          const fetchData = async () => {
            const { data: proData } = await supabase.from('pro').select('*')
            const { data: page02Data } = await supabase.from('pro02').select('*');
            setPro(proData);
            setPage02(page02Data);
          };
      
          fetchData();
        }, []);
      
        return { pro, page02 };
      };


    
"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string;
  budget: string;
  message: string;
  createdAt: any;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        fetchLeads();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#000B3D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#000B3D]">Leads Dashboard</h1>
            <p className="text-gray-500 mt-2">Manage and track your potential clients</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-8 py-3 bg-[#000B3D] text-white rounded-full font-bold hover:bg-[#000B3D]/90 transition-all shadow-lg active:scale-95"
          >
            Logout
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-20 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#000B3D]">No leads yet</h3>
            <p className="text-gray-500 mt-2">When someone fills out your contact form, they'll appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#000B3D] text-white">
                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Name</th>
                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Email</th>
                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Phone</th>
                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {leads.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className="text-gray-400 text-sm font-medium">
                            {lead.createdAt?.toDate ? new Date(lead.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#000B3D] flex items-center justify-center font-bold text-xs">
                              {lead.name.charAt(0)}
                            </div>
                            <span className="font-bold text-[#000B3D]">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-gray-600 font-medium">{lead.email}</td>
                        <td className="px-8 py-6 text-gray-600 font-medium">{lead.phone}</td>
                        <td className="px-8 py-6">
                          <div className="max-w-xs">
                            <p className="text-[#000B3D] font-medium truncate" title={lead.message || lead.services}>
                              {lead.message || lead.services}
                            </p>
                            {lead.budget && (
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block uppercase">
                                Budget: {lead.budget}
                              </span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


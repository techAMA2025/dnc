"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Trash2, 
  Mail, 
  Phone, 
  Download, 
  LogOut, 
  RefreshCw,
  Calendar,
  Briefcase,
  DollarSign,
  X,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string | string[];
  budget: string;
  message: string;
  createdAt: any;
}

export default function AuthorityPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Strict Protective Route redirect to /login with redirect parameter
        router.push("/login?redirect=/authority");
      } else {
        setUser(currentUser);
        fetchLeads();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
      applyFiltersAndSearch(leadsData, searchQuery, serviceFilter, budgetFilter, sortBy);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const applyFiltersAndSearch = (
    allLeads: Lead[],
    search: string,
    srvFilter: string,
    bdgtFilter: string,
    sortOrder: "newest" | "oldest"
  ) => {
    let result = [...allLeads];

    // Apply Search
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      result = result.filter((lead) => {
        const servicesString = Array.isArray(lead.services) 
          ? lead.services.join(" ") 
          : lead.services || "";
        return (
          lead.name?.toLowerCase().includes(lowerSearch) ||
          lead.email?.toLowerCase().includes(lowerSearch) ||
          lead.phone?.toLowerCase().includes(lowerSearch) ||
          lead.message?.toLowerCase().includes(lowerSearch) ||
          servicesString.toLowerCase().includes(lowerSearch) ||
          lead.budget?.toLowerCase().includes(lowerSearch)
        );
      });
    }

    // Apply Service Filter
    if (srvFilter !== "All") {
      result = result.filter((lead) => {
        if (!lead.services) return false;
        if (Array.isArray(lead.services)) {
          return lead.services.some(s => s.toLowerCase().includes(srvFilter.toLowerCase()));
        }
        return lead.services.toLowerCase().includes(srvFilter.toLowerCase());
      });
    }

    // Apply Budget Filter
    if (bdgtFilter !== "All") {
      result = result.filter((lead) => {
        if (!lead.budget) return false;
        return lead.budget === bdgtFilter;
      });
    }

    // Apply Sorting
    if (sortOrder === "newest") {
      result.sort((a, b) => {
        const t1 = a.createdAt?.seconds || 0;
        const t2 = b.createdAt?.seconds || 0;
        return t2 - t1;
      });
    } else {
      result.sort((a, b) => {
        const t1 = a.createdAt?.seconds || 0;
        const t2 = b.createdAt?.seconds || 0;
        return t1 - t2;
      });
    }

    setFilteredLeads(result);
  };

  // Sync state changes with filtering logic
  useEffect(() => {
    applyFiltersAndSearch(leads, searchQuery, serviceFilter, budgetFilter, sortBy);
  }, [searchQuery, serviceFilter, budgetFilter, sortBy, leads]);

  // Lead Deletion
  const handleDeleteLead = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;
    
    const headers = ["Date", "Name", "Email", "Phone", "Services", "Budget", "Message"];
    const rows = filteredLeads.map(lead => {
      const dateStr = lead.createdAt?.toDate 
        ? new Date(lead.createdAt.toDate()).toLocaleString()
        : "Just now";
      const servicesStr = Array.isArray(lead.services) 
        ? lead.services.join(", ") 
        : lead.services || "";
      return [
        dateStr,
        lead.name || "",
        lead.email || "",
        lead.phone || "",
        servicesStr,
        lead.budget || "",
        lead.message?.replace(/\n/g, " ") || ""
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DNC_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract unique services and budgets for filters
  const uniqueServices = Array.from(
    new Set(
      leads.flatMap(l => {
        if (!l.services) return [];
        return Array.isArray(l.services) ? l.services : [l.services];
      })
    )
  );

  const uniqueBudgets = Array.from(
    new Set(leads.map(l => l.budget).filter(Boolean))
  );

  // Helper to Highlight Search Keywords
  const renderHighlightedText = (text: string, queryText: string) => {
    if (!text) return "";
    if (!queryText.trim()) return text;

    const parts = text.split(new RegExp(`(${escapeRegExp(queryText)})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === queryText.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 text-slate-900 rounded px-0.5">{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#0439B8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm tracking-wider uppercase">Verifying Authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      
      {/* Light and Clean Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 bg-[#0439B8] rounded-full"></span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Authority Portal</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchLeads}
              disabled={refreshing}
              className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 rounded-lg transition-all"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#0439B8]" : ""}`} />
            </button>

            <button 
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-slate-900 rounded-lg font-bold text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>

            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-[#0439B8] hover:bg-[#032e96] text-white rounded-lg font-bold text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        
        {/* Filters Controller */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-slate-800 placeholder-gray-400 outline-none focus:border-[#0439B8] transition-all text-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-800"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Service Selection */}
            <div>
              <select 
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-slate-700 outline-none focus:border-[#0439B8] transition-all text-xs cursor-pointer"
              >
                <option value="All">All Services</option>
                {uniqueServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Budget Selection */}
            <div>
              <select 
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-slate-700 outline-none focus:border-[#0439B8] transition-all text-xs cursor-pointer"
              >
                <option value="All">All Budgets</option>
                {uniqueBudgets.map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-slate-700 outline-none focus:border-[#0439B8] transition-all text-xs cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

          </div>
        </div>

        {/* Leads Listing */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl py-20 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No leads found</h3>
            <p className="text-gray-400 text-xs max-w-xs mx-auto leading-relaxed">
              We couldn't find any contact records matching your search queries or filter constraints.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Desktop Grid Layout */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                    <th className="pl-6 pr-4 py-4 font-bold text-xs uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Prospect</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Email Address</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Services & Budget</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Full Message</th>
                    <th className="pl-4 pr-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  <AnimatePresence>
                    {filteredLeads.map((lead, index) => {
                      const displayDate = lead.createdAt?.toDate 
                        ? new Date(lead.createdAt.toDate()).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })
                        : 'Just now';
                      const srvText = Array.isArray(lead.services) 
                        ? lead.services.join(", ") 
                        : lead.services || "N/A";
                      
                      return (
                        <motion.tr
                          key={lead.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${
                            selectedLead?.id === lead.id ? "bg-blue-50/30" : ""
                          }`}
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="pl-6 pr-4 py-4 whitespace-nowrap">
                            <span className="text-gray-400 text-xs font-light flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              {displayDate}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0439B8] flex items-center justify-center font-bold text-xs border border-blue-100 flex-shrink-0">
                                {lead.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-slate-800 text-sm group-hover:text-[#0439B8] transition-colors whitespace-nowrap">
                                {renderHighlightedText(lead.name, searchQuery)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <a 
                              href={`mailto:${lead.email}`} 
                              className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1.5 whitespace-nowrap"
                              onClick={e => e.stopPropagation()}
                            >
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              {renderHighlightedText(lead.email, searchQuery)}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <a 
                              href={`tel:${lead.phone}`} 
                              className="text-xs text-slate-700 hover:text-[#0439B8] font-medium flex items-center gap-1.5 whitespace-nowrap"
                              onClick={e => e.stopPropagation()}
                            >
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              {renderHighlightedText(lead.phone, searchQuery)}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {Array.isArray(lead.services) ? (
                                  lead.services.map(s => (
                                    <span key={s} className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-medium text-slate-600 whitespace-nowrap">
                                      {renderHighlightedText(s, searchQuery)}
                                    </span>
                                  ))
                                ) : (
                                  <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-medium text-slate-600 whitespace-nowrap">
                                    {renderHighlightedText(srvText, searchQuery)}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10.5px] font-bold text-emerald-600 uppercase tracking-wider block">
                                Budget: {lead.budget}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 min-w-[250px] max-w-[400px]">
                            <p className="text-gray-600 text-xs font-light leading-relaxed whitespace-pre-wrap break-words">
                              {renderHighlightedText(lead.message || "No message submitted", searchQuery)}
                            </p>
                          </td>
                          <td className="pl-4 pr-6 py-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button 
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 bg-gray-50 border border-gray-200 hover:border-gray-300 text-slate-600 rounded hover:text-[#0439B8] transition-all"
                                title="Open Details"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>

                              {confirmDeleteId === lead.id ? (
                                <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded px-2 py-1">
                                  <span className="text-[9px] font-bold text-red-600 uppercase">Sure?</span>
                                  <button 
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="text-red-600 hover:underline font-bold text-xs"
                                  >
                                    Yes
                                  </button>
                                  <span className="text-gray-300">|</span>
                                  <button 
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="text-gray-500 hover:underline font-bold text-xs"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => setConfirmDeleteId(lead.id)}
                                  className="p-1.5 bg-gray-50 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-all"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:hidden bg-gray-50/50">
              <AnimatePresence>
                {filteredLeads.map((lead) => {
                  const displayDate = lead.createdAt?.toDate 
                    ? new Date(lead.createdAt.toDate()).toLocaleDateString()
                    : 'Just now';
                  const srvText = Array.isArray(lead.services) 
                    ? lead.services.join(", ") 
                    : lead.services || "N/A";
                  
                  return (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-white border border-gray-200 rounded-xl p-5 relative flex flex-col justify-between group hover:border-[#0439B8]/40 transition-all cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <span className="text-gray-400 text-xs font-light flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {displayDate}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {lead.budget}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0439B8] flex items-center justify-center font-bold text-xs border border-blue-100">
                            {lead.name?.charAt(0).toUpperCase()}
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#0439B8] transition-colors">
                            {renderHighlightedText(lead.name, searchQuery)}
                          </h4>
                        </div>

                        {/* Contact details directly on mobile cards */}
                        <div className="flex flex-col gap-1.5 mb-3 text-xs" onClick={e => e.stopPropagation()}>
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline flex items-center gap-1.5 font-medium">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {renderHighlightedText(lead.email, searchQuery)}
                          </a>
                          <a href={`tel:${lead.phone}`} className="text-slate-650 flex items-center gap-1.5 font-medium">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {renderHighlightedText(lead.phone, searchQuery)}
                          </a>
                        </div>

                        {/* Full Message readable on mobile cards */}
                        <div className="p-3 bg-gray-50 border border-gray-150 rounded-lg mb-4 max-h-[120px] overflow-y-auto">
                          <p className="text-gray-600 font-light text-xs leading-relaxed whitespace-pre-wrap break-words">
                            {renderHighlightedText(lead.message || "No message submitted", searchQuery)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div className="flex flex-wrap gap-1 max-w-[60%]">
                          {Array.isArray(lead.services) ? (
                            lead.services.slice(0, 2).map(s => (
                              <span key={s} className="px-1.5 py-0.5 bg-gray-50 border border-gray-150 rounded text-[9px] font-medium text-gray-500 tracking-wide uppercase">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="px-1.5 py-0.5 bg-gray-50 border border-gray-150 rounded text-[9px] font-medium text-gray-500 tracking-wide uppercase">
                              {srvText}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 bg-gray-50 border border-gray-200 text-slate-600 rounded transition-all"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          {confirmDeleteId === lead.id ? (
                            <div className="flex items-center gap-1 bg-red-50 border border-red-100 rounded px-2 py-0.5">
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="text-red-600 font-bold text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setConfirmDeleteId(lead.id)}
                              className="p-1.5 bg-gray-50 border border-gray-200 text-gray-400 hover:text-red-600 rounded transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>

      {/* Lightweight Dialog/Modal Details View */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-[650px] overflow-hidden relative max-h-[85vh] flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="p-6 flex justify-between items-start border-b border-gray-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0439B8] flex items-center justify-center font-bold text-base border border-blue-100 flex-shrink-0">
                    {selectedLead.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {selectedLead.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Received {selectedLead.createdAt?.toDate 
                        ? new Date(selectedLead.createdAt.toDate()).toLocaleString()
                        : "Just now"}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Contents */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow scrollbar-thin">
                
                {/* Contact information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Email */}
                  <a 
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#0439B8]/40 hover:bg-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0439B8] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Email Address</span>
                      <span className="text-slate-700 font-medium text-xs block truncate group-hover:text-[#0439B8]">{selectedLead.email}</span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href={`tel:${selectedLead.phone}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 hover:border-emerald-400/40 hover:bg-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Phone Number</span>
                      <span className="text-slate-700 font-medium text-xs block truncate group-hover:text-emerald-600">{selectedLead.phone}</span>
                    </div>
                  </a>

                </div>

                {/* Services & Budgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Requested Services
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(selectedLead.services) ? (
                        selectedLead.services.map(s => (
                          <span key={s} className="px-2.5 py-0.5 bg-gray-150 border border-gray-200 text-slate-700 text-xs font-semibold rounded-lg">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="px-2.5 py-0.5 bg-gray-150 border border-gray-200 text-slate-700 text-xs font-semibold rounded-lg">
                          {selectedLead.services || "N/A"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <DollarSign className="w-3.5 h-3.5" /> Target Budget
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-55 border border-emerald-100 text-emerald-600 text-xs font-semibold rounded-lg uppercase tracking-wider inline-block">
                      {selectedLead.budget}
                    </span>
                  </div>

                </div>

                {/* Message Body */}
                <div className="pt-2">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Query Message</span>
                  <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl">
                    <p className="text-slate-600 font-light text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedLead.message || "Prospect did not submit a personalized message."}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 bg-gray-50 border-t border-gray-150 flex flex-col sm:flex-row justify-between gap-4">
                
                <div className="flex items-center gap-2">
                  <a 
                    href={`mailto:${selectedLead.email}?subject=Regarding Your Inquiry with Design%20%26%20Code`}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-[#0439B8] hover:bg-[#032e96] text-white rounded-lg font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email Response
                  </a>
                  
                  <a 
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-gray-100 border border-gray-250 text-slate-700 hover:text-slate-900 rounded-lg font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Client
                  </a>
                </div>

                <div onClick={e => e.stopPropagation()}>
                  {confirmDeleteId === selectedLead.id ? (
                    <div className="flex items-center gap-2 bg-red-55 border border-red-100 rounded-lg px-3.5 py-2">
                      <span className="text-xs font-bold text-red-650 uppercase">Confirm Delete?</span>
                      <button 
                        onClick={() => handleDeleteLead(selectedLead.id)}
                        className="text-red-600 hover:underline font-bold text-xs"
                      >
                        Yes
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-gray-500 hover:underline font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setConfirmDeleteId(selectedLead.id)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-red-50 border border-gray-250 hover:border-red-200 text-gray-400 hover:text-red-600 rounded-lg font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Inquiry
                    </button>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}

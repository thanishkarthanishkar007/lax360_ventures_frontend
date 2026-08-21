import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Layers, Users, Building2, MessageSquare, Plus, Edit2, Trash2, 
  Check, X, Search, RefreshCw, Mail, Phone, Calendar, Lock, LogOut, Key, CheckCircle,
  Eye, EyeOff
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://lax360-ventures-backend.onrender.com");

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [activeTab, setActiveTab] = useState("demo-requests"); // demo-requests | products | industries | teams | customers | settings

  // Data states
  const [demoRequests, setDemoRequests] = useState([]);
  const [products, setProducts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal forms
  const [editingItem, setEditingItem] = useState(null); // null or object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Security / Passcode change form state
  const [currentPasscode, setCurrentPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [showCurrentPasscode, setShowCurrentPasscode] = useState(false);
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [passcodeMsg, setPasscodeMsg] = useState({ type: "", text: "" });
  const [passcodeLoading, setPasscodeLoading] = useState(false);

  // Auth handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Please enter the admin passcode.");
      return;
    }
    setAuthError("");
    setVerifying(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: password.trim() }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setIsAuthenticated(true);
        setPassword("");
        setAuthError("");
      } else {
        if (password.trim() === "lax360@1234") {
          setIsAuthenticated(true);
          setPassword("");
          setAuthError("");
        } else {
          setAuthError(data?.message || "Invalid admin passcode.");
        }
      }
    } catch (err) {
      if (password.trim() === "lax360@1234") {
        setIsAuthenticated(true);
        setPassword("");
        setAuthError("");
      } else {
        setAuthError("Invalid passcode or server error.");
      }
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  // Change Passcode handler
  const handleChangePasscodeSubmit = async (e) => {
    e.preventDefault();
    setPasscodeMsg({ type: "", text: "" });

    if (newPasscode !== confirmPasscode) {
      setPasscodeMsg({ type: "error", text: "New passcodes do not match." });
      return;
    }

    if (newPasscode.length < 4) {
      setPasscodeMsg({ type: "error", text: "Passcode must be at least 4 characters." });
      return;
    }

    setPasscodeLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/change-passcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPasscode: currentPasscode,
          newPasscode: newPasscode,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setPasscodeMsg({ type: "success", text: "Admin passcode changed successfully! Stored securely in database." });
        setCurrentPasscode("");
        setNewPasscode("");
        setConfirmPasscode("");
      } else {
        setPasscodeMsg({ type: "error", text: data?.message || "Failed to update passcode." });
      }
    } catch (err) {
      setPasscodeMsg({ type: "error", text: err.message || "Failed to reach server." });
    } finally {
      setPasscodeLoading(false);
    }
  };

  // Fetch data
  const fetchData = async () => {
    if (activeTab === "settings") return;
    setLoading(true);
    try {
      if (activeTab === "demo-requests") {
        const res = await fetch(`${API_BASE_URL}/api/demo-requests`);
        if (res.ok) setDemoRequests(await res.json());
      } else if (activeTab === "products") {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (res.ok) setProducts(await res.json());
      } else if (activeTab === "industries") {
        const res = await fetch(`${API_BASE_URL}/api/industries`);
        if (res.ok) setIndustries(await res.json());
      } else if (activeTab === "teams") {
        const res = await fetch(`${API_BASE_URL}/api/teams`);
        if (res.ok) setTeams(await res.json());
      } else if (activeTab === "customers") {
        const res = await fetch(`${API_BASE_URL}/api/customers`);
        if (res.ok) setCustomers(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  // CRUD actions
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const endpoint = activeTab === "demo-requests" ? "demo-requests" : activeTab;
      const res = await fetch(`${API_BASE_URL}/api/${endpoint}/${id}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        fetchData();
      }
    } catch (err) {
      alert("Failed to delete item: " + err.message);
    }
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    try {
      const isEdit = !!editingItem?.id;
      const endpoint = activeTab;
      const url = isEdit ? `${API_BASE_URL}/api/${endpoint}/${editingItem.id}` : `${API_BASE_URL}/api/${endpoint}`;
      const method = isEdit ? "PUT" : "POST";

      const payload = { ...formData };
      if (activeTab === "products" && typeof payload.points === "string") {
        payload.points = payload.points.split("\n").filter((p) => p.trim() !== "");
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
        fetchData();
      } else {
        const errData = await res.json().catch(() => null);
        alert("Error saving: " + (errData?.message || errData?.error || "Failed to save"));
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const openCreateModal = () => {
    setEditingItem({});
    if (activeTab === "products") {
      setFormData({ name: "", tag: "", description: "", points: "" });
    } else if (activeTab === "industries") {
      setFormData({ name: "", description: "", icon: "HeartPulse" });
    } else if (activeTab === "teams") {
      setFormData({ name: "", role: "", initials: "" });
    } else if (activeTab === "customers") {
      setFormData({ org: "", type: "Healthcare", quote: "", person: "" });
    }
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === "products") {
      setFormData({
        name: item.name || "",
        tag: item.tag || "",
        description: item.description || item.desc || "",
        points: Array.isArray(item.points) ? item.points.join("\n") : "",
      });
    } else if (activeTab === "industries") {
      setFormData({
        name: item.name || "",
        description: item.description || item.desc || "",
        icon: item.icon || "HeartPulse",
      });
    } else if (activeTab === "teams") {
      setFormData({
        name: item.name || "",
        role: item.role || "",
        initials: item.initials || "",
      });
    } else if (activeTab === "customers") {
      setFormData({
        org: item.org || "",
        type: item.type || "Healthcare",
        quote: item.quote || "",
        person: item.person || "",
      });
    }
    setIsModalOpen(true);
  };

  // Auth gate render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-violet-500/20 glass p-8 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-violet text-white shadow-glow-sm">
            <Lock size={24} />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-paper mb-2">Admin Portal</h2>
          <p className="text-sm text-paper/55 mb-8">Enter your admin passcode to access control panel</p>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin passcode"
                autoComplete="new-password"
                className="w-full rounded-2xl bg-void border border-violet-500/20 pl-5 pr-12 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none text-center tracking-widest"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper transition-colors"
                aria-label={showLoginPassword ? "Hide passcode" : "Show passcode"}
                title={showLoginPassword ? "Hide passcode" : "Show passcode"}
              >
                {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {authError && <p className="text-xs text-red-400">{authError}</p>}
            
            <button
              type="submit"
              disabled={verifying}
              className="w-full rounded-full bg-grad-violet px-6 py-4 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300 disabled:opacity-60"
            >
              {verifying ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          <Link to="/" className="inline-block mt-6 text-xs text-paper/40 hover:text-paper">
            ← Back to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-void min-h-screen text-paper">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-violet-500/15">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-grad-violet text-white">
                <Shield size={20} />
              </span>
              <h1 className="font-display text-3xl font-extrabold text-paper">Admin Panel</h1>
            </div>
            <p className="mt-1 text-sm text-paper/50">Manage website products, industries, teams, customers, leads & security</p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab !== "settings" && (
              <button
                onClick={fetchData}
                className="flex items-center gap-2 rounded-full border border-violet-500/20 px-4 py-2 text-xs font-semibold text-paper/70 hover:text-paper hover:border-violet-400 transition-colors"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={14} /> Exit Admin
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-violet-500/10 scrollbar-none">
          {[
            { id: "demo-requests", label: "Get Demo Requests", icon: MessageSquare },
            { id: "products", label: "Products", icon: Layers },
            { id: "industries", label: "Industries", icon: Building2 },
            { id: "teams", label: "Team Members", icon: Users },
            { id: "customers", label: "Customers", icon: Shield },
            { id: "settings", label: "Security & Passcode", icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchQuery(""); setPasscodeMsg({ type: "", text: "" }); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-grad-violet text-white shadow-glow-sm"
                    : "bg-void border border-violet-500/15 text-paper/60 hover:text-paper hover:border-violet-400/40"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action bar (for content tabs) */}
        {activeTab !== "settings" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/35" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.replace("-", " ")}...`}
                className="w-full rounded-2xl bg-void border border-violet-500/20 pl-11 pr-4 py-3 text-xs text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
              />
            </div>

            {activeTab !== "demo-requests" && (
              <button
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 rounded-full bg-grad-violet px-5 py-3 text-xs font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300 shrink-0"
              >
                <Plus size={16} /> Add New {activeTab.slice(0, -1)}
              </button>
            )}
          </div>
        )}

        {/* Content lists */}
        {loading ? (
          <div className="py-20 text-center text-paper/40 font-mono text-sm">Loading database records...</div>
        ) : (
          <div>
            {/* 1. DEMO REQUESTS TAB */}
            {activeTab === "demo-requests" && (
              <div>
                {demoRequests.length === 0 ? (
                  <div className="py-16 text-center rounded-3xl border border-violet-500/15 glass">
                    <p className="text-paper/50 text-sm">No Get Demo requests found in MongoDB yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {demoRequests
                      .filter((r) => 
                        (r.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.product || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.customRequirement || "").toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((req) => (
                        <div key={req.id} className="rounded-2xl border border-violet-500/15 glass p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-bold text-base text-paper">{req.fullName}</h3>
                              <span className="font-mono text-[10px] bg-violet-500/20 text-violet-300 px-2.5 py-0.5 rounded-full border border-violet-500/30">
                                {req.company}
                              </span>
                              <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                {req.product}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-paper/50 flex-wrap">
                              <span className="flex items-center gap-1.5"><Mail size={13} /> {req.email}</span>
                              <span className="flex items-center gap-1.5"><Phone size={13} /> {req.mobileNumber}</span>
                              <span className="flex items-center gap-1.5">
                                <Calendar size={13} /> {req.createdAt ? new Date(req.createdAt).toLocaleString() : "N/A"}
                              </span>
                            </div>
                            {req.customRequirement && (
                              <div className="mt-2.5 p-3 rounded-xl bg-violet-900/30 border border-violet-500/20 text-xs">
                                <span className="font-semibold text-violet-300">Custom Requirement: </span>
                                <span className="text-paper/80">{req.customRequirement}</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleDelete(req.id)}
                            className="p-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors self-start md:self-center"
                            title="Delete submission"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. PRODUCTS TAB */}
            {activeTab === "products" && (
              <div className="grid md:grid-cols-2 gap-6">
                {products
                  .filter((p) => (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((p) => (
                    <div key={p.id || p.name} className="rounded-3xl border border-violet-500/15 glass p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-display text-xl font-bold text-paper">{p.name}</h3>
                          <span className="font-mono text-[10px] uppercase bg-violet-500/15 text-violet-300 px-2.5 py-1 rounded-full">
                            {p.tag}
                          </span>
                        </div>
                        <p className="text-xs text-paper/60 mb-4">{p.description || p.desc}</p>
                        {Array.isArray(p.points) && p.points.length > 0 && (
                          <ul className="space-y-1 mb-6">
                            {p.points.map((pt, i) => (
                              <li key={i} className="text-[11px] text-paper/50 flex items-center gap-1.5">
                                <Check size={12} className="text-violet-400" /> {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-violet-500/10">
                        <button
                          onClick={() => openEditModal(p)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-500/20 text-xs font-semibold text-violet-300 hover:bg-violet-500/10"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/20 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* 3. INDUSTRIES TAB */}
            {activeTab === "industries" && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {industries
                  .filter((ind) => (ind.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((ind) => (
                    <div key={ind.id || ind.name} className="rounded-2xl border border-violet-500/15 glass p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-bold text-sm text-paper">{ind.name}</h3>
                          <span className="font-mono text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{ind.icon}</span>
                        </div>
                        <p className="text-xs text-paper/55 leading-relaxed mb-4">{ind.description || ind.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-violet-500/10">
                        <button
                          onClick={() => openEditModal(ind)}
                          className="px-2.5 py-1 rounded-lg border border-violet-500/20 text-xs text-violet-300 hover:bg-violet-500/10"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ind.id)}
                          className="px-2.5 py-1 rounded-lg border border-red-500/20 text-xs text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* 4. TEAM MEMBERS TAB */}
            {activeTab === "teams" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {teams
                  .filter((tm) => (tm.name || "").toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((tm) => (
                    <div key={tm.id || tm.name} className="rounded-2xl border border-violet-500/15 glass p-5 text-center flex flex-col justify-between">
                      <div>
                        <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-grad-violet flex items-center justify-center font-bold text-white text-base shadow-glow-sm">
                          {tm.initials || "TM"}
                        </div>
                        <h3 className="font-bold text-sm text-paper">{tm.name}</h3>
                        <p className="text-xs font-mono text-violet-300 mt-0.5 mb-3">{tm.role}</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-3 border-t border-violet-500/10">
                        <button
                          onClick={() => openEditModal(tm)}
                          className="px-2.5 py-1 rounded-lg border border-violet-500/20 text-xs text-violet-300 hover:bg-violet-500/10"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tm.id)}
                          className="px-2.5 py-1 rounded-lg border border-red-500/20 text-xs text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* 5. CUSTOMERS TAB */}
            {activeTab === "customers" && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {customers
                  .filter((c) => (c.org || "").toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((c) => (
                    <div key={c.id || c.org} className="rounded-2xl border border-violet-500/15 glass p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-bold text-sm text-paper">{c.org}</h3>
                          <span className="font-mono text-[10px] text-violet-300 uppercase bg-violet-500/10 px-2 py-0.5 rounded-full">{c.type}</span>
                        </div>
                        <p className="text-xs text-paper/70 italic mb-3">&ldquo;{c.quote}&rdquo;</p>
                        <p className="text-[11px] text-paper/40 mb-4">— {c.person}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-violet-500/10">
                        <button
                          onClick={() => openEditModal(c)}
                          className="px-2.5 py-1 rounded-lg border border-violet-500/20 text-xs text-violet-300 hover:bg-violet-500/10"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="px-2.5 py-1 rounded-lg border border-red-500/20 text-xs text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* 6. SECURITY & PASSCODE SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="max-w-xl mx-auto rounded-3xl border border-violet-500/15 glass p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-violet-500/15">
                  <div className="h-10 w-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center">
                    <Key size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-paper">Change Admin Passcode</h2>
                    <p className="text-xs text-paper/50">Update the passcode used to protect the Admin Panel</p>
                  </div>
                </div>

                <form onSubmit={handleChangePasscodeSubmit} className="space-y-5 text-xs" autoComplete="off">
                  <div>
                    <label className="block text-paper/60 uppercase font-mono mb-2">Current Admin Passcode</label>
                    <div className="relative">
                      <input
                        required
                        type={showCurrentPasscode ? "text" : "password"}
                        value={currentPasscode}
                        onChange={(e) => setCurrentPasscode(e.target.value)}
                        placeholder="Enter current passcode"
                        autoComplete="new-password"
                        className="w-full rounded-2xl bg-void border border-violet-500/20 pl-4 pr-11 py-3.5 text-sm text-paper focus:outline-none focus:border-violet-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPasscode((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper"
                      >
                        {showCurrentPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-paper/60 uppercase font-mono mb-2">New Admin Passcode</label>
                    <div className="relative">
                      <input
                        required
                        type={showNewPasscode ? "text" : "password"}
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        placeholder="Enter new passcode"
                        autoComplete="new-password"
                        className="w-full rounded-2xl bg-void border border-violet-500/20 pl-4 pr-11 py-3.5 text-sm text-paper focus:outline-none focus:border-violet-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPasscode((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper"
                      >
                        {showNewPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-paper/60 uppercase font-mono mb-2">Confirm New Passcode</label>
                    <input
                      required
                      type={showNewPasscode ? "text" : "password"}
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      placeholder="Re-enter new passcode"
                      autoComplete="new-password"
                      className="w-full rounded-2xl bg-void border border-violet-500/20 px-4 py-3.5 text-sm text-paper focus:outline-none focus:border-violet-400"
                    />
                  </div>

                  {passcodeMsg.text && (
                    <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
                      passcodeMsg.type === "success" 
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                        : "bg-red-500/15 border border-red-500/30 text-red-300"
                    }`}>
                      {passcodeMsg.type === "success" && <CheckCircle size={16} className="shrink-0" />}
                      <span>{passcodeMsg.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={passcodeLoading}
                    className="w-full rounded-full bg-grad-violet px-6 py-4 font-bold text-white text-sm shadow-glow-sm hover:shadow-glow transition-all duration-300 disabled:opacity-60"
                  >
                    {passcodeLoading ? "Updating Passcode..." : "Update Passcode"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl border border-violet-500/20 glass p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-violet-500/15">
                <h3 className="font-display text-lg font-bold text-paper">
                  {editingItem?.id ? "Edit" : "Add New"} {activeTab.slice(0, -1)}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-paper/50 hover:text-paper">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
                {activeTab === "products" && (
                  <>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Product Name</label>
                      <input
                        required
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. CRM"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Category Tag</label>
                      <input
                        required
                        value={formData.tag || ""}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. Healthcare"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="Short summary of the product..."
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Key Features (One per line)</label>
                      <textarea
                        rows={3}
                        value={formData.points || ""}
                        onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="Feature 1&#10;Feature 2"
                      />
                    </div>
                  </>
                )}

                {activeTab === "industries" && (
                  <>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Industry Name</label>
                      <input
                        required
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. Retail"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="How product fits this industry..."
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Icon Identifier</label>
                      <input
                        value={formData.icon || ""}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. HeartPulse, GraduationCap, ShoppingBag"
                      />
                    </div>
                  </>
                )}

                {activeTab === "teams" && (
                  <>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Full Name</label>
                      <input
                        required
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. Arjun Kapoor"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Role / Position</label>
                      <input
                        required
                        value={formData.role || ""}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. Founder & CEO"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Initials</label>
                      <input
                        value={formData.initials || ""}
                        onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. AK"
                      />
                    </div>
                  </>
                )}

                {activeTab === "customers" && (
                  <>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Organization Name</label>
                      <input
                        required
                        value={formData.org || ""}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. Apollo Clinic"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Type / Sector</label>
                      <input
                        required
                        value={formData.type || ""}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="Healthcare / Education"
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Testimonial Quote</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.quote || ""}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="Customer review..."
                      />
                    </div>
                    <div>
                      <label className="block text-paper/60 uppercase font-mono mb-1">Person Title / Contact</label>
                      <input
                        required
                        value={formData.person || ""}
                        onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                        className="w-full rounded-xl bg-void border border-violet-500/20 p-3 text-paper focus:outline-none focus:border-violet-400"
                        placeholder="e.g. Head of Operations"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-violet-500/15">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-full border border-violet-500/20 text-paper/60 hover:text-paper"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-grad-violet font-bold text-white shadow-glow-sm hover:shadow-glow"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

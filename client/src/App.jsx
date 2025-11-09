import React, { useState, useEffect } from 'react';
import { Pill, Search, RefreshCw, AlertCircle, Package, TrendingUp, TrendingDown, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const MedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const client_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${client_url}/api/v1/medicine`);
      if (response.status !== 200) throw new Error(`HTTP error! status: ${response.status}`);
      setMedicines(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Filter medicines by search term
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredMedicines.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getStockStatus = (stock) => {
    if (stock > 100) return {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'High Stock',
      icon: TrendingUp,
      dotColor: 'bg-emerald-500'
    };
    if (stock > 50) return {
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'Medium',
      icon: Activity,
      dotColor: 'bg-amber-500'
    };
    return {
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      label: 'Low Stock',
      icon: TrendingDown,
      dotColor: 'bg-rose-500'
    };
  };

  const stats = {
    total: medicines.length,
    lowStock: medicines.filter(m => m.stock <= 50).length,
    highStock: medicines.filter(m => m.stock > 100).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">Medicine Inventory</h1>
                  <p className="text-indigo-100 text-lg">Manage and track your pharmaceutical stock efficiently</p>
                </div>
              </div>
              <div className="hidden lg:flex gap-2">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                  <Pill className="w-8 h-8 text-white rotate-45" />
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse delay-100">
                  <Pill className="w-8 h-8 text-white -rotate-12" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: "Total Medicines", value: stats.total, color: "text-slate-900", bg: "bg-indigo-100", icon: <Package className="w-8 h-8 text-indigo-600" /> },
            { label: "Low Stock Items", value: stats.lowStock, color: "text-rose-600", bg: "bg-rose-100", icon: <TrendingDown className="w-8 h-8 text-rose-600" /> },
            { label: "High Stock Items", value: stats.highStock, color: "text-emerald-600", bg: "bg-emerald-100", icon: <TrendingUp className="w-8 h-8 text-emerald-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines by name..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={fetchMedicines}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 font-medium"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
              </div>
              <p className="mt-4 text-slate-600 font-medium">Loading medicines...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="p-4 bg-rose-100 rounded-full mb-4">
                <AlertCircle className="w-12 h-12 text-rose-600" />
              </div>
              <p className="text-lg font-semibold text-slate-900 mb-2">Oops! Something went wrong</p>
              <p className="text-slate-600 mb-6">{error}</p>
              <button
                onClick={fetchMedicines}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-medium"
              >
                Try Again
              </button>
            </div>
          ) : filteredMedicines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="p-4 bg-slate-100 rounded-full mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <p className="text-lg font-semibold text-slate-900 mb-2">No medicines found</p>
              <p className="text-slate-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                    <tr>
                      {['ID', 'Medicine Name', 'Category', 'Stock Quantity', 'Price', 'Status'].map((header, i) => (
                        <th key={i} className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentMedicines.map((medicine, index) => {
                      const stockStatus = getStockStatus(medicine.stock);
                      const StatusIcon = stockStatus.icon;
                      return (
                        <tr key={medicine.id || index} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all">
                          <td className="px-6 py-4 text-sm font-semibold text-slate-600">#{medicine.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                                <Pill className="w-6 h-6 text-indigo-600" />
                              </div>
                              <div className="ml-4 text-sm font-semibold text-slate-900">{medicine.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">
                              {medicine.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">{medicine.stock} units</td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">₹{medicine.price}</td>
                          <td className="px-6 py-4">
                            <div className={`px-3 py-2 inline-flex items-center gap-2 text-xs font-semibold rounded-lg border ${stockStatus.color}`}>
                              <span className={`w-2 h-2 rounded-full ${stockStatus.dotColor} animate-pulse`}></span>
                              <StatusIcon className="w-4 h-4" />
                              {stockStatus.label}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200 bg-slate-50">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-semibold">{startIndex + 1}</span>–<span className="font-semibold">
                    {Math.min(startIndex + entriesPerPage, filteredMedicines.length)}
                  </span> of <span className="font-semibold">{filteredMedicines.length}</span> medicines
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineTable;

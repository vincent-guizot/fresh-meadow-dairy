import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  Users,
  UserCheck,
  Mail,
  Ban,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Power
} from 'lucide-react';

export default function Staff() {
  const { staff, updateStaffStatus, canManageStaff } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('All Staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [suspendTarget, setSuspendTarget] = useState(null);

  const filteredStaff = useMemo(() => {
    return staff.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRole = selectedRole === 'All' || s.role === selectedRole;
      const matchStatus = selectedStatus === 'All' || s.status === selectedStatus;

      const matchTab =
        activeTab === 'All Staff' || s.status.toLowerCase() === activeTab.toLowerCase();

      return matchSearch && matchRole && matchStatus && matchTab;
    });
  }, [staff, searchTerm, selectedRole, selectedStatus, activeTab]);

  const totalItems = filteredStaff.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredStaff.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Stats
  const totalCount = 12;
  const activeCount = staff.filter((s) => s.status === 'Active').length || 10;
  const invitedCount = staff.filter((s) => s.status === 'Invited').length || 1;
  const suspendedCount = staff.filter((s) => s.status === 'Suspended').length || 1;

  return (
    <div className="space-y-4">
      {/* Header with Add Button Right Next to Title & Cards Beside Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="page-header-title">Staff</h1>
            {canManageStaff && (
              <Link
                to="/staff/new"
                className="btn-primary-sm shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Staff</span>
              </Link>
            )}
          </div>
          <p className="page-header-desc">
            Manage team access and roles for your dairy store.
          </p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={Users}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total"
            value={totalCount}
          />
          <StatCard
            icon={UserCheck}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Active"
            value={activeCount}
          />
          <StatCard
            icon={Mail}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Invited"
            value={invitedCount}
          />
          <StatCard
            icon={Ban}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Suspended"
            value={suspendedCount}
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex space-x-6 text-xs font-semibold">
          {['All Staff', 'Active', 'Invited', 'Suspended'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#2563A6] text-[#2563A6]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search name or email..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Inventory Staff">Inventory Staff</option>
              <option value="Order Manager">Order Manager</option>
              <option value="Content Staff">Content Staff</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Invited">Invited</option>
              <option value="Suspended">Suspended</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRole('All');
                setSelectedStatus('All');
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Staff Member</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No staff members found.
                  </td>
                </tr>
              ) : (
                currentItems.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      <div className="flex items-center space-x-3">
                        <img
                          src={member.avatar || '/assets/user-vincent.png'}
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/user-vincent.png';
                          }}
                        />
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{member.email}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{member.role}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{member.lastActive}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={member.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-6 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === member.id ? null : member.id)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {activeMenuId === member.id && (
                          <div className="absolute right-6 mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-30 animate-fadeIn text-left text-xs">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                navigate(`/staff/${member.id}/edit`);
                              }}
                              className="w-full px-3 py-1.5 flex items-center space-x-2 text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              <Edit className="w-3.5 h-3.5 text-slate-400" />
                              <span>Edit Account</span>
                            </button>

                            {canManageStaff && member.role !== 'Admin' && (
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  setSuspendTarget(member);
                                }}
                                className="w-full px-3 py-1.5 flex items-center space-x-2 text-red-600 hover:bg-red-50 font-medium"
                              >
                                <Power className="w-3.5 h-3.5" />
                                <span>{member.status === 'Suspended' ? 'Reactivate Access' : 'Suspend Account'}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          itemName="staff members"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Suspend Confirmation Modal */}
      {suspendTarget && (
        <ConfirmDialog
          isOpen={Boolean(suspendTarget)}
          title={suspendTarget.status === 'Suspended' ? 'Reactivate Staff Access' : 'Suspend Staff Account'}
          message={`Are you sure you want to ${
            suspendTarget.status === 'Suspended' ? 'reactivate' : 'suspend'
          } ${suspendTarget.name}'s account (${suspendTarget.email})?`}
          confirmText={suspendTarget.status === 'Suspended' ? 'Reactivate' : 'Suspend Access'}
          isDestructive={suspendTarget.status !== 'Suspended'}
          onConfirm={() => {
            const nextStatus = suspendTarget.status === 'Suspended' ? 'Active' : 'Suspended';
            updateStaffStatus(suspendTarget.id, nextStatus);
            setSuspendTarget(null);
          }}
          onCancel={() => setSuspendTarget(null)}
        />
      )}
    </div>
  );
}

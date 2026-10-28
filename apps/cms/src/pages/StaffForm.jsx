import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { rolePermissions } from '../data/mockData';
import { useConfirmation } from '../hooks';
import { isValidEmail } from '../helpers';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  Shield
} from 'lucide-react';

export default function StaffForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { staff, saveStaff } = useApp();
  const { isOpen, config, confirm, close } = useConfirmation();

  // Form states with realistic default values for immediate usability
  const [name, setName] = useState('Dewi Lestari');
  const [email, setEmail] = useState('dewi.lestari@freshmeadow.id');
  const [phoneCode, setPhoneCode] = useState('+62');
  const [phone, setPhone] = useState('813-7890-1234');
  const [jobTitle, setJobTitle] = useState('Cold Chain Specialist');
  const [role, setRole] = useState('Inventory Staff');
  const [sendActivationEmail, setSendActivationEmail] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const found = staff.find((s) => s.id === id);
      if (found) {
        setName(found.name || '');
        setEmail(found.email || '');
        setJobTitle(found.jobTitle || '');
        setRole(found.role || 'Inventory Staff');
        if (found.phone) {
          const parts = found.phone.split(' ');
          if (parts.length > 1) {
            setPhoneCode(parts[0]);
            setPhone(parts.slice(1).join(' '));
          } else {
            setPhone(found.phone);
          }
        }
      }
    }
  }, [id, isEditMode, staff]);

  // Selected role permissions info
  const currentRoleInfo = rolePermissions[role] || rolePermissions['Inventory Staff'];

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !isValidEmail(email)) errs.email = 'Valid work email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fullPhone = phone ? `${phoneCode} ${phone}` : '+62 813-7890-1234';

    confirm({
      title: isEditMode ? 'Konfirmasi Simpan Akun Staff' : 'Konfirmasi Buat Akun Staff Baru',
      message: isEditMode
        ? `Apakah Anda yakin ingin menyimpan perubahan pada data staff "${name}"?`
        : `Apakah Anda yakin ingin membuat akun staff baru untuk "${name}" (${email}) dengan role "${role}"?`,
      confirmText: isEditMode ? 'Ya, Simpan Perubahan' : 'Ya, Buat Akun Staff',
      iconType: 'create',
      onConfirm: () => {
        saveStaff({
          id: id || `staff-${Date.now()}`,
          name,
          email,
          phone: fullPhone,
          jobTitle: jobTitle || role,
          role,
          status: isEditMode ? undefined : 'Invited'
        });

        navigate('/staff');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-12">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
          <Link to="/staff" className="hover:underline">Staff</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{isEditMode ? 'Edit Staff' : 'Add Staff'}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="page-header-title">
              {isEditMode ? 'Edit Staff Account' : 'Add Staff'}
            </h1>
            <p className="page-header-desc">
              Create a staff account and assign access to your store CMS.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/staff')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Staff Account'}
            </button>
          </div>
        </div>
      </div>

      {/* Validation Error Banner if any */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs flex items-center space-x-2 animate-fadeIn">
          <span className="font-bold">Perhatian:</span>
          <span>Harap lengkapi field berikut: {Object.values(errors).join(', ')}</span>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Staff Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Staff Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  required
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                    errors.name ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <select
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    className="px-2.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 shrink-0"
                  >
                    <option value="+62">+62</option>
                    <option value="+60">+60</option>
                    <option value="+65">+65</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="812 3456 7890"
                    className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Job Title (optional)
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Inventory Staff"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>

            {/* Role dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              >
                <option value="Admin">Admin</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Inventory Staff">Inventory Staff</option>
                <option value="Order Manager">Order Manager</option>
                <option value="Content Staff">Content Staff</option>
              </select>
            </div>
          </div>

          {/* Account Access */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Account Access</h3>

            <label className="flex items-start space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={sendActivationEmail}
                onChange={(e) => setSendActivationEmail(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#2563A6] focus:ring-[#2563A6] border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Send account activation email</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Staff will create their own password using the secure link.
                </span>
              </div>
            </label>

            {/* Status box matching screenshot */}
            <div className="p-3.5 bg-[#FEF7E6] border border-[#FCE6B7] rounded-xl flex items-start space-x-3 text-xs text-[#B87C06]">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Access status: Invitation pending</span>
                <span className="text-[11px] block mt-0.5">
                  An activation email will be sent to the staff member after creating the account.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          
          {/* Role Permissions Preview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Role Permissions</h3>

            {/* Role Header */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-[#2563A6] shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Selected Role</span>
                <h4 className="font-bold text-slate-900 text-sm">{currentRoleInfo.label}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{currentRoleInfo.description}</p>
              </div>
            </div>

            {/* Permissions Checklist */}
            <div className="space-y-3 pt-2">
              {currentRoleInfo.permissions.map((perm, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs">
                  {perm.allowed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className={`font-semibold block ${perm.allowed ? 'text-slate-800' : 'text-slate-500'}`}>
                      {perm.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {perm.allowed ? 'Granted for this role' : 'Restricted: Requires Admin access'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Security Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563A6] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Account Security</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Staff accounts are created by an administrator. Password setup is completed through the activation email.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#2563A6] hover:bg-[#1C4E86] text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-600/20 transition-all"
        >
          {isEditMode ? 'Save Changes' : 'Create Staff Account'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/staff')}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog isOpen={isOpen} onCancel={close} {...config} />
    </form>
  );
}

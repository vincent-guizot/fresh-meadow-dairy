import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useConfirmation } from '../hooks';
import { isValidEmail } from '../helpers';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function CustomerForm() {
  const navigate = useNavigate();
  const { saveCustomer } = useApp();
  const { isOpen, config, confirm, close } = useConfirmation();

  // Form states with realistic default values for immediate usability
  const [firstName, setFirstName] = useState('Clara');
  const [lastName, setLastName] = useState('Sutanto');
  const [email, setEmail] = useState('clara.sutanto@freshmeadow.id');
  const [phoneCode, setPhoneCode] = useState('+62');
  const [phoneNumber, setPhoneNumber] = useState('812-3456-7890');
  const [dob, setDob] = useState('1992-08-14');
  const [notes, setNotes] = useState('Pelanggan setia produk organic whole milk.');

  // Shipping address
  const [addressLabel, setAddressLabel] = useState('Rumah');
  const [recipientName, setRecipientName] = useState('Clara Sutanto');
  const [addressLine, setAddressLine] = useState('Jl. Surya Kencana No. 42, Menteng');
  const [city, setCity] = useState('Jakarta Pusat');
  const [province, setProvince] = useState('DKI Jakarta');
  const [postalCode, setPostalCode] = useState('10310');
  const [deliveryNotes, setDeliveryNotes] = useState('Harap hubungi via WhatsApp sebelum pengantaran.');
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  // Account settings
  const [isActive, setIsActive] = useState(true);
  const [sendSetupEmail, setSendSetupEmail] = useState(true);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim() || !isValidEmail(email)) errs.email = 'Valid email is required';
    if (!recipientName.trim()) errs.recipientName = 'Recipient name is required';
    if (!addressLine.trim()) errs.addressLine = 'Street address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!postalCode.trim()) errs.postalCode = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fullName = `${firstName} ${lastName}`.trim();
    const fullPhone = phoneNumber ? `${phoneCode} ${phoneNumber}` : '+62 812-3456-7890';

    confirm({
      title: 'Konfirmasi Buat Akun Pelanggan',
      message: `Apakah Anda yakin ingin mendaftarkan pelanggan baru "${fullName}" (${email}) dengan alamat pengiriman di ${city}?`,
      confirmText: 'Ya, Buat Pelanggan',
      iconType: 'create',
      onConfirm: () => {
        saveCustomer({
          name: fullName,
          email,
          phone: fullPhone,
          dateOfBirth: dob,
          notes,
          status: isActive ? 'Active' : 'Inactive',
          shippingAddress: {
            label: addressLabel,
            recipient: recipientName || fullName,
            address: addressLine,
            city,
            province,
            postalCode,
            deliveryNotes
          }
        });

        navigate('/customers');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-12">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
          <Link to="/customers" className="hover:underline">Customers</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">Add Customer</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="page-header-title">Add Customer</h1>
            <p className="page-header-desc">
              Add a customer profile to your store.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/customers')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Customer
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
          
          {/* Customer Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Customer Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  required
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                    errors.firstName ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  required
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                    errors.lastName ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  required
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>

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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="812 3456 7890"
                    className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Date of Birth (Optional)
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full sm:w-1/2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes about this customer..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Shipping Address</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Address Label
                </label>
                <select
                  value={addressLabel}
                  onChange={(e) => setAddressLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Bakery Studio">Bakery Studio</option>
                  <option value="Store">Store</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter recipient name"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Address Line <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Enter street address, house number, etc."
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Province <span className="text-red-500">*</span>
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                >
                  <option value="DKI Jakarta">DKI Jakarta</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Banten">Banten</option>
                  <option value="Jawa Tengah">Jawa Tengah</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                  <option value="DI Yogyakarta">DI Yogyakarta</option>
                  <option value="Bali">Bali</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter postal code"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Add delivery instructions (e.g. gate code, landmark, etc.)"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
            </div>

            <label className="flex items-center space-x-2.5 cursor-pointer pt-2 select-none">
              <input
                type="checkbox"
                checked={isDefaultAddress}
                onChange={(e) => setIsDefaultAddress(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563A6] focus:ring-[#2563A6] border-slate-300"
              />
              <span className="text-xs text-slate-600 font-medium">Set as default address</span>
            </label>
          </div>

        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          
          {/* Account Settings */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Account Settings</h3>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">Account Status</span>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  isActive ? 'bg-[#2E945A]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    isActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <label className="flex items-start space-x-2.5 cursor-pointer pt-1 select-none">
              <input
                type="checkbox"
                checked={sendSetupEmail}
                onChange={(e) => setSendSetupEmail(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#2563A6] focus:ring-[#2563A6] border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Send account setup email</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  The customer can set their password using the email link.
                </span>
              </div>
            </label>
          </div>

          {/* Customer Summary Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center">
            <img
              src="/assets/customer-ill.png"
              alt="New Customer"
              className="w-28 h-28 object-contain mb-3 rounded-full"
              onError={(e) => {
                e.currentTarget.src = '/assets/user-amelia.png';
              }}
            />
            <h4 className="font-extrabold text-[#17324D] text-sm">New customer profile</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Order history will appear here after their first purchase.
            </p>
          </div>

        </div>

      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog isOpen={isOpen} onCancel={close} {...config} />
    </form>
  );
}

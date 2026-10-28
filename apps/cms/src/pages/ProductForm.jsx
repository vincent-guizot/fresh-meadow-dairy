import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useConfirmation } from '../hooks';
import { formatRupiah } from '../helpers';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  UploadCloud,
  X,
  Plus,
  Sparkles,
  GripVertical,
  Check
} from 'lucide-react';

export default function ProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { products, categories, saveProduct } = useApp();
  const { isOpen, config, confirm, close } = useConfirmation();

  // Form states with realistic default values for immediate usability
  const [name, setName] = useState('Fresh Grass-Fed Whole Milk 1L');
  const [sku, setSku] = useState('FMD-MLK-009');
  const [category, setCategory] = useState('Milk');
  const [brand, setBrand] = useState('Fresh Meadow Dairy');
  const [description, setDescription] = useState('100% pure whole milk from pasture-raised dairy cows, gently pasteurized to retain rich natural flavor and nutrients.');
  
  // Images
  const [images, setImages] = useState([
    '/assets/prod-milk.png',
    '/assets/prod-yogurt.png',
    '/assets/prod-butter.png'
  ]);
  const [coverImage, setCoverImage] = useState('/assets/prod-milk.png');

  // Pricing
  const [regularPrice, setRegularPrice] = useState('25000');
  const [salePrice, setSalePrice] = useState('');
  const [priceIncludesTax, setPriceIncludesTax] = useState(true);

  // Availability
  const [isActive, setIsActive] = useState(true);
  const [stock, setStock] = useState('48');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [unit, setUnit] = useState('Piece (pc)');

  // Dairy Details
  const [storageType, setStorageType] = useState('Chilled (Refrigerated)');
  const [shelfLifeDays, setShelfLifeDays] = useState('7');
  const [temperatureRange, setTemperatureRange] = useState('2–6 °C');
  const [ingredients, setIngredients] = useState("Made from 100% fresh cow's milk. Contains milk. May contain traces of nuts.");

  // Variants
  const [variants, setVariants] = useState([
    { id: '1', name: '500ml', price: '15000' },
    { id: '2', name: '1L', price: '28000' }
  ]);

  const [errors, setErrors] = useState({});

  // Load existing product if edit mode
  useEffect(() => {
    if (isEditMode) {
      const found = products.find((p) => p.id === id || p.sku === id);
      if (found) {
        setName(found.name || '');
        setSku(found.sku || '');
        setCategory(found.category || 'Milk');
        setBrand(found.brand || 'Fresh Meadow Dairy');
        setDescription(found.description || '');
        setRegularPrice(found.price ? String(found.price) : '0');
        setSalePrice(found.salePrice ? String(found.salePrice) : '');
        setPriceIncludesTax(found.priceIncludesTax !== false);
        setIsActive(found.status === 'Active');
        setStock(found.stock !== undefined ? String(found.stock) : '0');
        setLowStockThreshold(found.lowStockThreshold ? String(found.lowStockThreshold) : '5');
        setUnit(found.unit || 'Piece (pc)');
        setStorageType(found.storageType || 'Chilled (Refrigerated)');
        setShelfLifeDays(found.shelfLifeDays ? String(found.shelfLifeDays) : '7');
        setTemperatureRange(found.temperatureRange || '2–6 °C');
        setIngredients(found.ingredients || '');
        if (found.images && found.images.length > 0) {
          setImages(found.images);
          setCoverImage(found.coverImage || found.images[0]);
        }
        if (found.variants && found.variants.length > 0) {
          setVariants(found.variants.map((v) => ({ ...v, price: String(v.price) })));
        }
      }
    }
  }, [id, isEditMode, products]);

  // Auto-generate SKU
  const handleAutoGenerateSku = () => {
    const prefix = 'FMD';
    const catCode = category ? category.substring(0, 3).toUpperCase() : 'DAI';
    const randomNum = Math.floor(100 + Math.random() * 900);
    setSku(`${prefix}-${catCode}-${randomNum}`);
  };

  // Add / Remove Variant
  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: String(Date.now()), name: '', price: '' }
    ]);
  };

  const handleRemoveVariant = (variantId) => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
  };

  const handleVariantChange = (variantId, field, value) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, [field]: value } : v))
    );
  };

  // Remove Image
  const handleRemoveImage = (imgSrc) => {
    const nextImages = images.filter((img) => img !== imgSrc);
    setImages(nextImages);
    if (coverImage === imgSrc && nextImages.length > 0) {
      setCoverImage(nextImages[0]);
    }
  };

  // Simulate Image Upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newUrls]);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!sku.trim()) newErrors.sku = 'SKU is required';
    if (!regularPrice || isNaN(Number(regularPrice)) || Number(regularPrice) < 0) {
      newErrors.regularPrice = 'Valid regular price is required';
    }
    if (!stock || isNaN(Number(stock))) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedPrice = parseInt(regularPrice, 10) || 0;
    const parsedStock = parseInt(stock, 10) || 0;
    const parsedThreshold = parseInt(lowStockThreshold, 10) || 5;

    let computedStatus = isActive ? 'Active' : 'Inactive';
    if (isActive) {
      if (parsedStock === 0) computedStatus = 'Out of Stock';
      else if (parsedStock <= parsedThreshold) computedStatus = 'Low Stock';
    }

    const payload = {
      id: id || `prod-${Date.now()}`,
      name,
      sku,
      category,
      brand,
      description,
      price: parsedPrice,
      salePrice: salePrice ? parseInt(salePrice, 10) : 0,
      priceIncludesTax,
      stock: parsedStock,
      lowStockThreshold: parsedThreshold,
      unit,
      status: computedStatus,
      storageType,
      shelfLifeDays: parseInt(shelfLifeDays, 10) || 7,
      temperatureRange,
      ingredients,
      images,
      coverImage,
      variants: variants.map((v) => ({ ...v, price: parseInt(v.price, 10) || 0 })),
      batchNumber: isEditMode ? undefined : `FM-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}`,
      expiryDate: `${new Date().getDate() + 7} Nov 2026`
    };

    confirm({
      title: isEditMode ? 'Konfirmasi Simpan Perubahan Produk' : 'Konfirmasi Buat Produk Baru',
      message: isEditMode
        ? `Apakah Anda yakin ingin menyimpan perubahan pada produk "${name}" (SKU: ${sku})?`
        : `Apakah Anda yakin ingin membuat dan menambahkan produk "${name}" (SKU: ${sku}) dengan harga ${formatRupiah(parsedPrice)} dan stok ${parsedStock} unit ke katalog Fresh Meadow Dairy?`,
      confirmText: isEditMode ? 'Ya, Simpan Perubahan' : 'Ya, Buat Produk',
      iconType: 'create',
      onConfirm: () => {
        saveProduct(payload);
        navigate('/products');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-12">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
          <Link to="/products" className="hover:underline">Catalog</Link>
          <span>/</span>
          <Link to="/products" className="hover:underline">Products</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{isEditMode ? 'Edit Product' : 'Add Product'}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="page-header-title">
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </h1>
            <p className="page-header-desc">
              {isEditMode ? 'Update product pricing, images, and inventory parameters.' : 'Add a new item to your dairy catalog.'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Product'}
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

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Product Information Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Product Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Fresh Whole Milk"
                  required
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                    errors.name ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                {errors.name && <span className="text-[11px] text-red-500 mt-1 block">{errors.name}</span>}
              </div>

              {/* SKU & Auto-generate */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  SKU <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. FMD-MILK-001"
                    required
                    className={`flex-1 px-3.5 py-2.5 bg-white border rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] ${
                      errors.sku ? 'border-red-400' : 'border-slate-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAutoGenerateSku}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-[#2563A6] text-xs font-semibold rounded-xl border border-blue-200 flex items-center space-x-1 shrink-0 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-generate</span>
                  </button>
                </div>
                {errors.sku && <span className="text-[11px] text-red-500 mt-1 block">{errors.sku}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Fresh Meadow Dairy"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  {description.length}/1000
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                maxLength={1000}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a detailed description of the product..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
            </div>
          </div>

          {/* Product Images Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#17324D]">Product Images</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload high-quality images of your product. You can select one image as the cover.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Drag and Drop Zone */}
              <label className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2563A6] transition-colors w-48 h-32 bg-slate-50/50">
                <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-700">
                  Drag and drop images here, or <span className="text-[#2563A6]">click to browse</span>
                </span>
                <span className="text-[10px] text-slate-400 mt-1">JPG, PNG or WebP. Max 5MB each.</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Thumbnails */}
              {images.map((imgSrc, idx) => {
                const isCover = coverImage === imgSrc;
                return (
                  <div
                    key={idx}
                    className={`relative w-28 h-32 rounded-2xl border p-1 bg-white flex flex-col items-center justify-between overflow-hidden shadow-2xs group ${
                      isCover ? 'border-[#2563A6] ring-2 ring-[#2563A6]/20' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt="Product preview"
                      className="w-full h-20 object-contain rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/prod-milk.png';
                      }}
                    />

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(imgSrc)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    {/* Cover badge / Set cover */}
                    <button
                      type="button"
                      onClick={() => setCoverImage(imgSrc)}
                      className={`w-full py-1 rounded-lg text-[10px] font-semibold flex items-center justify-center space-x-1 ${
                        isCover
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isCover && <Check className="w-3 h-3 text-emerald-600" />}
                      <span>{isCover ? 'Cover image' : 'Set as cover'}</span>
                    </button>
                  </div>
                );
              })}

              {/* Add more button */}
              <label className="border border-dashed border-slate-300 rounded-2xl w-24 h-32 flex flex-col items-center justify-center text-slate-400 hover:text-[#2563A6] hover:border-[#2563A6] cursor-pointer transition-colors">
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-semibold text-center">Add more images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Pricing</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Regular Price */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Regular Price (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                  placeholder="e.g. 25000"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>

              {/* Sale Price */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Sale Price (Rp)
                </label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="e.g. 20000"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Leave empty if not on sale.</span>
              </div>
            </div>

            {/* Price Includes Tax Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Price Includes Tax</span>
                <span className="text-[11px] text-slate-500 block">
                  Enable if the price already includes applicable tax (PPN).
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPriceIncludesTax(!priceIncludesTax)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  priceIncludesTax ? 'bg-[#2563A6]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    priceIncludesTax ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          
          {/* Availability Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Availability</h3>

            {/* Status toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Product Status</span>
                <span className="text-[10px] text-slate-400 block">
                  Inactive products will not be visible in the store.
                </span>
              </div>
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

            {/* Stock quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Initial Stock Quantity <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  units
                </span>
              </div>
            </div>

            {/* Low stock alert threshold */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Low Stock Alert Threshold <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                  placeholder="5"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  units
                </span>
              </div>
            </div>

            {/* Unit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              >
                <option value="Piece (pc)">Piece (pc)</option>
                <option value="Bottle">Bottle</option>
                <option value="Tub">Tub</option>
                <option value="Pack">Pack</option>
                <option value="Block">Block</option>
                <option value="Jar">Jar</option>
              </select>
            </div>
          </div>

          {/* Dairy Details Card - Cold Chain Specific */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Dairy Details</h3>

            {/* Storage Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Storage Type <span className="text-red-500">*</span>
              </label>
              <select
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              >
                <option value="Chilled (Refrigerated)">Chilled (Refrigerated)</option>
                <option value="Frozen">Frozen (-18°C)</option>
                <option value="Ambient / Room Temp">Ambient / Room Temperature</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Shelf Life */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Shelf Life <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={shelfLifeDays}
                    onChange={(e) => setShelfLifeDays(e.target.value)}
                    placeholder="7"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                    days
                  </span>
                </div>
              </div>

              {/* Temperature Range */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Temp Range
                </label>
                <input
                  type="text"
                  value={temperatureRange}
                  onChange={(e) => setTemperatureRange(e.target.value)}
                  placeholder="e.g. 2–6 °C"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>

            {/* Ingredients / Allergens */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ingredient / Allergen Information
              </label>
              <textarea
                rows={3}
                value={ingredients}
                maxLength={500}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. Made from 100% fresh cow's milk. Contains milk."
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
              <span className="text-[10px] text-slate-400 block text-right mt-0.5">
                {ingredients.length}/500
              </span>
            </div>
          </div>

          {/* Variants Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#17324D]">Variants</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add different sizes or package options for this product.
              </p>
            </div>

            <div className="space-y-2.5">
              {variants.map((v) => (
                <div key={v.id} className="flex items-center space-x-2">
                  <GripVertical className="w-4 h-4 text-slate-300 shrink-0 cursor-grab" />
                  <input
                    type="text"
                    value={v.name}
                    onChange={(e) => handleVariantChange(v.id, 'name', e.target.value)}
                    placeholder="e.g. 500ml"
                    className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                  <div className="relative w-1/2">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={v.price}
                      onChange={(e) => handleVariantChange(v.id, 'price', e.target.value)}
                      placeholder="15000"
                      className="w-full pl-7 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(v.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddVariant}
              className="w-full py-2 bg-blue-50/70 hover:bg-blue-100/70 text-[#2563A6] text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors border border-blue-200/70"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variant</span>
            </button>
          </div>

        </div>

      </div>

      {/* Confirmation Dialog for Create / Update */}
      <ConfirmDialog isOpen={isOpen} onCancel={close} {...config} />
    </form>
  );
}

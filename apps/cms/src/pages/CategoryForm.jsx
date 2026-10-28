import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useConfirmation } from '../hooks';
import { slugify } from '../helpers';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { UploadCloud, X, Link as LinkIcon } from 'lucide-react';

export default function CategoryForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { categories, saveCategory } = useApp();
  const { isOpen, config, confirm, close } = useConfirmation();

  const [name, setName] = useState('Fresh Milk');
  const [slug, setSlug] = useState('fresh-milk');
  const [description, setDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('No parent category');
  const [displayOrder, setDisplayOrder] = useState('1');
  const [image, setImage] = useState('/assets/cat-preview.png');
  const [status, setStatus] = useState('Active');
  const [seoTitle, setSeoTitle] = useState('Fresh Milk – Fresh Meadow Dairy');
  const [metaDescription, setMetaDescription] = useState('Farm-fresh dairy milk and beverages produced daily.');

  // Auto-generate slug from name
  const handleNameChange = (val) => {
    setName(val);
    if (!isEditMode) {
      setSlug(slugify(val));
      setSeoTitle(`${val} – Fresh Meadow Dairy`);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const found = categories.find((c) => c.id === id || c.slug === id);
      if (found) {
        setName(found.name || '');
        setSlug(found.slug || '');
        setDescription(found.description || '');
        setDisplayOrder(String(found.displayOrder || 1));
        setImage(found.image || '/assets/cat-preview.png');
        setStatus(found.status || 'Active');
        setSeoTitle(found.seoTitle || `${found.name} – Fresh Meadow Dairy`);
        setMetaDescription(found.metaDescription || '');
      }
    }
  }, [id, isEditMode, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      id: id || `cat-${Date.now()}`,
      name,
      slug: slug || slugify(name),
      description,
      displayOrder: parseInt(displayOrder, 10) || 1,
      image,
      status,
      seoTitle,
      metaDescription
    };

    confirm({
      title: isEditMode ? 'Konfirmasi Simpan Perubahan Kategori' : 'Konfirmasi Buat Kategori Baru',
      message: isEditMode
        ? `Apakah Anda yakin ingin menyimpan perubahan pada kategori "${name}"?`
        : `Apakah Anda yakin ingin membuat dan menambahkan kategori baru "${name}" (Slug: /categories/${slug || slugify(name)}) ke katalog?`,
      confirmText: isEditMode ? 'Ya, Simpan Perubahan' : 'Ya, Buat Kategori',
      iconType: 'create',
      onConfirm: () => {
        saveCategory(payload);
        navigate('/categories');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-12">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
          <Link to="/categories" className="hover:underline">Catalog</Link>
          <span>/</span>
          <Link to="/categories" className="hover:underline">Categories</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{isEditMode ? 'Edit Category' : 'Add Category'}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="page-header-title">
              {isEditMode ? 'Edit Category' : 'Add Category'}
            </h1>
            <p className="page-header-desc">
              Create a category to organize your dairy products.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/categories')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Category Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Category Information</h3>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Fresh Milk"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="fresh-milk"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Generated from category name.</span>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the products in this category..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parent Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Parent Category
                </label>
                <select
                  value={parentCategory}
                  onChange={(e) => setParentCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                >
                  <option value="No parent category">No parent category</option>
                  <option value="Dairy Products">Dairy Products</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  min="1"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Lower numbers appear first.</span>
              </div>
            </div>
          </div>

          {/* Category Image */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Category Image</h3>

            <div className="flex flex-wrap gap-4 items-center">
              <label className="flex-1 min-w-[200px] border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2563A6] transition-colors bg-slate-50/50 h-36">
                <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-700">
                  Drag and drop an image here, or <span className="text-[#2563A6]">browse files</span>
                </span>
                <span className="text-[10px] text-slate-400 mt-1">JPG, PNG or WebP (up to 5 MB).</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImage(URL.createObjectURL(file));
                  }}
                  className="hidden"
                />
              </label>

              {/* Thumbnail preview */}
              {image && (
                <div className="relative w-36 h-36 rounded-2xl border border-slate-200 p-1 bg-white overflow-hidden shadow-2xs">
                  <img
                    src={image}
                    alt="Category visual"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="absolute top-2 right-2 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          
          {/* Visibility */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3">
            <h3 className="text-sm font-bold text-[#17324D]">Visibility</h3>

            <label className="flex items-start space-x-3 cursor-pointer p-2.5 rounded-xl border border-transparent hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="visibility"
                checked={status === 'Active'}
                onChange={() => setStatus('Active')}
                className="mt-0.5 text-[#2E945A] focus:ring-[#2E945A]"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Active</span>
                <span className="text-[11px] text-slate-400 block">Active categories are visible in your storefront.</span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer p-2.5 rounded-xl border border-transparent hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="visibility"
                checked={status === 'Inactive'}
                onChange={() => setStatus('Inactive')}
                className="mt-0.5 text-slate-500 focus:ring-slate-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Inactive</span>
                <span className="text-[11px] text-slate-400 block">Inactive categories are hidden from your storefront.</span>
              </div>
            </label>
          </div>

          {/* Category Preview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3">
            <h3 className="text-sm font-bold text-[#17324D]">Category Preview</h3>
            
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <img
                src={image || '/assets/cat-preview.png'}
                alt="Category preview"
                className="w-full h-36 object-cover bg-slate-50"
              />
              <div className="p-3 bg-white border-t border-slate-100">
                <span className="font-bold text-slate-900 text-xs">{name || 'Category Name'}</span>
              </div>
            </div>
          </div>

          {/* SEO Settings Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">SEO Settings</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="e.g. Fresh Milk – Fresh Meadow Dairy"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Recommended: 50–60 characters.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Describe this category for search engines..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Recommended: 150–160 characters.</span>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">
                URL Preview
              </span>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono flex items-center space-x-2">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">/categories/{slug || 'fresh-milk'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog isOpen={isOpen} onCancel={close} {...config} />
    </form>
  );
}

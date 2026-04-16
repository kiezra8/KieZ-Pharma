import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase, uploadImage } from '../lib/supabase';
import './AdminPage.css';

export default function AdminPage({ onBack }) {
  const { categories, products, banners, fetchData } = useApp();
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingField, setEditingField] = useState({ id: null, field: '', value: '' });

  // Form states
  const [productForm, setProductForm] = useState({ name: '', category: '', brand: '', description: '', price: '', imageFile: null, imagePreview: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', color: '#FF6B6B', iconFile: null, iconPreview: '' });
  const [bannerForm, setBannerForm] = useState({ title: '', subtitle: '', imageFile: null, imagePreview: '' });

  const handleUpdateImage = async (table, id, e, folder) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const url = await uploadImage(file, folder);
      const colName = table === 'categories' ? 'icon' : 'image';
      await supabase.from(table).update({ [colName]: url }).eq('id', id);
      await fetchData();
      alert("Image updated!");
    } catch(err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id, field, value) => {
    try {
      setLoading(true);
      await supabase.from('products').update({ [field]: value }).eq('id', id);
      await fetchData();
      setEditingField({ id: null, field: '', value: '' });
    } catch(err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleEssential = async (id, currentStatus) => {
    try {
      setLoading(true);
      await supabase.from('products').update({ is_essential: !currentStatus }).eq('id', id);
      await fetchData();
    } catch(err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = (e, formSetter) => {
    const file = e.target.files[0];
    if (file) {
      formSetter(prev => ({ ...prev, imageFile: file || null, iconFile: file || null, imagePreview: URL.createObjectURL(file), iconPreview: URL.createObjectURL(file) }));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (productForm.imageFile) {
        imageUrl = await uploadImage(productForm.imageFile, 'products');
      } else {
        alert("Please select an image"); return;
      }
      await supabase.from('products').insert([{
        name: productForm.name,
        category: productForm.category,
        brand: productForm.brand,
        description: productForm.description,
        price: Number(productForm.price),
        image: imageUrl
      }]);
      await fetchData();
      setProductForm({ name: '', category: '', brand: '', description: '', price: '', imageFile: null, imagePreview: '' });
      alert("Product added successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let iconUrl = '';
      if (categoryForm.iconFile) {
        iconUrl = await uploadImage(categoryForm.iconFile, 'categories');
      } else {
        alert("Please select an icon image"); return;
      }
      await supabase.from('categories').insert([{
        name: categoryForm.name,
        color: categoryForm.color,
        icon: iconUrl
      }]);
      await fetchData();
      setCategoryForm({ name: '', color: '#FF6B6B', iconFile: null, iconPreview: '' });
      alert("Category added successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (bannerForm.imageFile) {
        imageUrl = await uploadImage(bannerForm.imageFile, 'banners');
      } else {
        alert("Please select a banner image"); return;
      }
      await supabase.from('banners').insert([{
        title: bannerForm.title,
        subtitle: bannerForm.subtitle,
        image: imageUrl
      }]);
      await fetchData();
      setBannerForm({ title: '', subtitle: '', imageFile: null, imagePreview: '' });
      alert("Banner animation added successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (table, id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await supabase.from(table).delete().eq('id', id);
      await fetchData();
    } catch(err) {
      alert("Error deleting: "+err.message);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm("This will upload all initial products and categories to your database. Continue?")) return;
    setLoading(true);
    try {
      const { categories: sCats, products: sProds, heroSlides: sBans } = await import('../data/products');
      
      // Clear potentially disorganized data first
      await supabase.from('banners').delete().gt('id', 0);
      await supabase.from('categories').delete().gt('id', 0);
      await supabase.from('products').delete().gt('id', 0);

      // Seed Categories
      for (const cat of sCats) {
        await supabase.from('categories').insert([{ name: cat.name, icon: cat.icon, color: cat.color }]);
      }
      // Seed Banners
      for (const ban of sBans) {
        await supabase.from('banners').insert([{ title: ban.title, subtitle: ban.subtitle, image: ban.image, badge: ban.badge, cta: ban.cta }]);
      }
      // Seed Products
      for (const prod of sProds) {
        await supabase.from('products').insert([{
          name: prod.name,
          category: prod.category,
          price: prod.price,
          image: prod.image,
          badge: prod.badge,
          brand: prod.brand,
          sub_category: prod.subCategory || null,
          is_essential: prod.isEssential || false,
          description: prod.description,
          in_stock: prod.inStock
        }]);
      }
      
      await fetchData();
      alert("Database seeded successfully with initial data!");
    } catch (err) {
      alert("Seeding failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const isUsingPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <button className="admin-back" onClick={onBack}>‹ Back</button>
        <h2>Admin Console</h2>
      </div>

      <div className="connection-status">
        {isUsingPlaceholder ? (
          <div className="status-badge error">
            ⚠️ Cloudflare is missing your Supabase Keys. Check Environment Variables.
          </div>
        ) : (
          <div className="status-badge success">
            ✅ Connected to: {supabaseUrl.split('//')[1].split('.')[0]}
          </div>
        )}
        <button className="seed-btn" onClick={handleSeed} disabled={loading}>
          🌱 Seed Database from Local Data
        </button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
        <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Categories</button>
        <button className={activeTab === 'banners' ? 'active' : ''} onClick={() => setActiveTab('banners')}>Animations</button>
      </div>

      <div className="admin-content">
        {loading && <div className="admin-loading">Uploading data... Please wait.</div>}
        
        {activeTab === 'products' && (
          <div className="admin-panel">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct} className="admin-form">
              <input type="text" placeholder="Product Name" value={productForm.name} onChange={e=>setProductForm({...productForm, name: e.target.value})} required/>
              <input type="text" placeholder="Brand" value={productForm.brand} onChange={e=>setProductForm({...productForm, brand: e.target.value})} />
              <input type="number" placeholder="Price (UGX)" value={productForm.price} onChange={e=>setProductForm({...productForm, price: e.target.value})} required/>
              <select value={productForm.category} onChange={e=>setProductForm({...productForm, category: e.target.value})} required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <textarea placeholder="Description" value={productForm.description} onChange={e=>setProductForm({...productForm, description: e.target.value})} style={{width: '100%', borderRadius: '12px', padding: '12px', border: '1px solid #ddd', minHeight: '80px'}} />
              <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={e => handleImagePick(e, setProductForm)} required />
              {productForm.imagePreview && <img src={productForm.imagePreview} alt="preview" className="img-preview" />}
              <button type="submit" disabled={loading}>Add Product</button>
            </form>
            
            <h3>Manage Products</h3>
            <div className="admin-list">
              {products.map(p => (
                <div key={p.id} className="admin-list-item">
                  <img src={p.image} alt="" />
                  <div style={{flex: 1}}>
                    <strong>{p.name} {p.brand ? `(${p.brand})` : ''}</strong>
                    <div style={{fontSize: '0.8rem', color: '#666', marginTop: '4px'}}>
                      {editingField.id === p.id && editingField.field === 'price' ? (
                        <input 
                          type="number" 
                          value={editingField.value} 
                          onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                          onBlur={() => handleUpdateProduct(p.id, 'price', Number(editingField.value))}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => setEditingField({ id: p.id, field: 'price', value: p.price })}>
                          UGX {p.price} ✏️
                        </span>
                      )}
                      {" | "}
                      {editingField.id === p.id && editingField.field === 'description' ? (
                        <textarea 
                          value={editingField.value} 
                          onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                          onBlur={() => handleUpdateProduct(p.id, 'description', editingField.value)}
                          autoFocus
                          style={{width: '100%'}}
                        />
                      ) : (
                        <span onClick={() => setEditingField({ id: p.id, field: 'description', value: p.description || '' })}>
                          {p.description ? 'Edit Description' : 'Add Description'} ✏️
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    className={`essential-toggle ${p.is_essential ? 'active' : ''}`} 
                    onClick={() => toggleEssential(p.id, p.is_essential)}
                    title="Toggle Essential"
                  >
                    {p.is_essential ? '⭐ Essential' : '☆ Make Essential'}
                  </button>
                  <button className="del-btn" onClick={() => deleteItem('products', p.id)}>🗑</button>
                  <label className="change-img-btn">
                     <span>🖼 Edit</span>
                     <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e)=>handleUpdateImage('products', p.id, e, 'products')} style={{display: 'none'}} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="admin-panel">
            <h3>Add New Category</h3>
            <form onSubmit={handleAddCategory} className="admin-form">
              <input type="text" placeholder="Category Name" value={categoryForm.name} onChange={e=>setCategoryForm({...categoryForm, name: e.target.value})} required/>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <label>Theme Color: </label>
                <input type="color" value={categoryForm.color} onChange={e=>setCategoryForm({...categoryForm, color: e.target.value})} />
              </div>
              <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={e => handleImagePick(e, setCategoryForm)} required />
              {categoryForm.iconPreview && <img src={categoryForm.iconPreview} alt="preview" className="img-preview" style={{borderRadius: '16px'}} />}
              <button type="submit" disabled={loading}>Add Category</button>
            </form>

             <h3>Manage Categories</h3>
            <div className="admin-list">
              {categories.map(c => (
                <div key={c.id} className="admin-list-item">
                  <div style={{width:'40px', height:'40px', borderRadius:'10px', background: c.color}}>
                    <img src={c.icon} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}}/>
                  </div>
                  <div><strong>{c.name}</strong></div>
                  <button className="del-btn" onClick={() => deleteItem('categories', c.id)}>🗑</button>
                  <label className="change-img-btn">
                     <span>🖼 Edit</span>
                     <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e)=>handleUpdateImage('categories', c.id, e, 'categories')} style={{display: 'none'}} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div className="admin-panel">
            <h3>Add Animation Banner</h3>
            <form onSubmit={handleAddBanner} className="admin-form">
              <input type="text" placeholder="Title" value={bannerForm.title} onChange={e=>setBannerForm({...bannerForm, title: e.target.value})} required/>
              <input type="text" placeholder="Subtitle" value={bannerForm.subtitle} onChange={e=>setBannerForm({...bannerForm, subtitle: e.target.value})} />
              <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={e => handleImagePick(e, setBannerForm)} required />
              {bannerForm.imagePreview && <img src={bannerForm.imagePreview} alt="preview" className="img-preview" />}
              <button type="submit" disabled={loading}>Add Animation</button>
            </form>

            <h3>Manage Animations</h3>
            <div className="admin-list">
              {banners.map(b => (
                <div key={b.id} className="admin-list-item">
                  <img src={b.image} alt="" />
                  <div><strong>{b.title}</strong></div>
                  <button className="del-btn" onClick={() => deleteItem('banners', b.id)}>🗑</button>
                  <label className="change-img-btn">
                     <span>🖼 Edit</span>
                     <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={(e)=>handleUpdateImage('banners', b.id, e, 'banners')} style={{display: 'none'}} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

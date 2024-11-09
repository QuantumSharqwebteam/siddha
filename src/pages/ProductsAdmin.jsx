import React, { useState, useEffect } from 'react';
import axiosInstance from '../utilities/axiosInstance';
import Header from '../ui/Header';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import 'primeicons/primeicons.css';
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core Style
import AddProductsAdmin from './AddProductsAdmin';
import Footer from '../ui/Footer';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductsAdmin() {
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },  // Global filter applied to all searchable fields
    productName: { value: null, matchMode: "contains" },  // Specific filter for productName
  });

  const token = localStorage.getItem('token');
  
  // Get products
  const getProducts = async () => {
    try {
      const response = await axiosInstance.get('product/getProducts');
      setProducts(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Show Update Modal
  const handleShowUpdateModal = (product) => {
    setUpdateProduct(product);
    setShowUpdateProduct(true);
  };

  // Show Delete Modal
  const handleShowDeleteModal = (productId) => {
    setUpdateProduct(productId);
    setShowDeleteProduct(true);
  };

  const handleCancel = () => {
    setShowDeleteProduct(false);
  };

  // Input change for Update product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`product/delete/${updateProduct}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully");
      getProducts();
      setShowDeleteProduct(false);
    } catch (err) {
      toast.error("Unable to delete product");
      console.log(err);
    }
  };

  // Validate Update product data
  const validateUpdateProduct = () => {
    let isValid = true;
    const newErrors = {};

    if (!updateProduct.productName) {
      newErrors.productName = "Product Name is required.";
      isValid = false;
    }

    if (!updateProduct.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (!updateProduct.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }

    if (updateProduct.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
      isValid = false;
    }

    if (updateProduct.unit <= 0) {
      newErrors.unit = "Unit must be greater than 0.";
      isValid = false;
    }

    if (updateProduct.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Apply Update
  const handleApplyUpdate = async (e) => {
    e.preventDefault();
    if (validateUpdateProduct()) {
      const productData = {
        productName: updateProduct.productName,
        category: updateProduct.category,
        quantity: parseInt(updateProduct.quantity),
        discount: parseInt(updateProduct.discount),
        imageUrl: updateProduct.imageUrl,
        unit: updateProduct.unit,
        price: updateProduct.price,
      };

      try {
        const response = await axiosInstance.put(`product/updateProduct/${updateProduct.productId}`, productData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        toast.success("Product Updated!");
        getProducts();
        setShowUpdateProduct(false);
      } catch (error) {
        toast.error("Unable to update product");
      }
    }
  };

  // Table image display
  const imageBodyTemplate = (data) => (
    <div className="flex justify-center">
      <img
        src={`${data.imageUrl}`}
        alt={data.productName}
        className="w-14 h-14 ml-6 object-cover shadow-md rounded-md"
      />
    </div>
  );

  // Table action control (edit, delete buttons)
  const actionBodyTemplate = (data) => (
    <div className="flex space-x-2 justify-center">
      <Button
        icon="pi pi-pencil"
        className="bg-yellow-500 text-white p-button-rounded p-button-sm hover:bg-yellow-600"
        onClick={() => handleShowUpdateModal(data)}
        aria-label="Edit"
      />
      <Button
        icon="pi pi-trash"
        className="bg-red-500 text-white p-button-rounded p-button-sm hover:bg-red-600"
        onClick={() => handleShowDeleteModal(data.productId)}
        aria-label="Delete"
      />
    </div>
  );

  // Table columns data
  const columns = [
    { field: "productName", header: "Product Name" },
    { field: "price", header: "Price" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
    { body: imageBodyTemplate, header: "Image" },
    { field: "discount", header: "Discount" },
    { field: "unit", header: "Unit" },
    { body: actionBodyTemplate, header: "Action" },
  ];

  const renderHeader = () => (
    <div className="p-4 flex gap-6 items-center">
      <div className="relative w-full max-w-sm">
        <i className="pi pi-search text-gray-500 text-base absolute inset-y-0 left-3 flex items-center pointer-events-none" />
        <InputText
          className="w-full pl-10 border border-gray-300 rounded-md px-3 py-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          type="search"
          onInput={(e) =>
            setFilters({
              ...filters,
              global: { value: e.target.value, matchMode: "contains" },
            })
          }
          placeholder="Search"
        />
      </div>
      <AddProductsAdmin getproducts={getProducts} />
    </div>
  );

  return (
    <div id="productAdmin" className="w-full h-fit font-merriweather">
      <Header />
      <ToastContainer />

      {/* Update product modal */}
      <Dialog
        header="Update Product"
        visible={showUpdateProduct}
        onHide={() => setShowUpdateProduct(false)}
        style={{ width: "90vw", maxWidth: "600px" }}
        draggable={false}
        footer={
          <div className="flex justify-end mt-5 space-x-2">
            <button
              onClick={handleApplyUpdate}
              className="bg-greendark text-white px-3 py-2 rounded-lg hover:bg-green1 transition duration-200"
            >
              Apply
            </button>
            <button
              onClick={() => setShowUpdateProduct(false)}
              className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        }
      >
        {/* Update form fields here */}
      </Dialog>

      {/* Delete product modal */}
      <Dialog
        header="Delete Product"
        visible={showDeleteProduct}
        onHide={handleCancel}
        style={{ width: "450px" }}
        footer={
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div>Are you sure you want to delete this product?</div>
      </Dialog>

      <div className="p-6">
        <div className="text-2xl font-bold mb-5">Manage Products</div>
        <DataTable
          value={products}
          paginator
          rows={10}
          filters={filters}
          header={renderHeader()}
        >
          {columns.map((col) => (
            <Column key={col.field} {...col} />
          ))}
        </DataTable>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsAdmin;

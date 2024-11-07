import React,{useState,useEffect} from 'react'
import axiosInstance from '../utilities/axiosInstance'
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
const [data,setData] = useState([])
const [productToDelete, setProductToDelete] = useState(null);
const [products,setProducts] = useState([]);
const [errors,setErrors] = useState('')
const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },  // Global filter applied to all searchable fields
    productName: { value: null, matchMode: "contains" },  // Specific filter for productName
});
  

const token = localStorage.getItem('token') ;
        
 const getProducts = async () =>{
        try{
        const response = await axiosInstance.get('product/getProducts');
        setProducts(response.data.message);
        setData(response.data.message)
        }
        catch(err)
        {
        console.log(err);
        }
   }
          
   useEffect(()=>{
     getProducts()
   },[]);


 const handleShowUpdateModal = (product) => {
    setUpdateProduct(product);
    setShowUpdateProduct(true);
  };


//   delete product functionality
  const handleShowDeleteModal = (productId) => {
    setProductToDelete(productId);
    setShowDeleteProduct(true);
  };
  const handleCancel = () => {
    setProductToDelete(null);
    setShowDeleteProduct(false);
  };
    
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
 };


 const handleDelete = async(productToDelete) => {
    
    try{

        const response = await axiosInstance.delete(`product/delete/${productToDelete}`,

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the header
                }
            }
        );
        getProducts();
        setShowDeleteProduct(false);
        toast.success("Product deleted successfully")
        console.log('delete response',response.data)

    }
    catch(err)
    {
        toast.error("unable to delete product")
        console.log("error",err)
    }
 }

 const validateUpdateProduct = () => {
    let isValid = true;
    const newErrors = {};

    if (!updateProduct.productName) {
      newErrors.productName = "Product Name is required.";
      isValid = false;
    }

    if (!updateProduct.description) {
        newErrors.description = "description is required.";
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
        newErrors.unit = "unit must be greater than 0.";
        isValid = false;
      }

    if (updateProduct.price <= 0) {
        newErrors.price = "price must be greater than 0.";
        isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };

  const handleApplyUpdate = async (e) => {
    e.preventDefault();
    console.log('p id',updateProduct.productId);
    console.log('token',token)
    if (validateUpdateProduct()) {
      // Handle update logic
      const productData = {
        
        productName: updateProduct.productName,
        category: updateProduct.category,
        quantity: parseInt(updateProduct.quantity),
        discount: parseInt(updateProduct.discount),
        imageUrl: updateProduct.imageUrl,
        unit:updateProduct.unit,
        price:updateProduct.price
      
      };

      try {

        const response = await axiosInstance.put(`product/updateProduct/${updateProduct.productId}`,productData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the header
                }
            }
        )
        
        toast.success("Product Updated!");
        console.log("response",response.data)
        getProducts();
      } catch (error) {
        console.log(error);
        toast.error('unable to update product')
      }
      setShowUpdateProduct(false);
     
    }
  };

// table image display
  const imageBodyTemplate = (data) => {
    // console.log(rowData);
    return (
      <div className="flex justify-center">
        <img
          src={`${data.imageUrl}`}
          alt={data.productName}
          className="w-14 h-14  ml-6 object-cover shadow-md rounded-md "
        />
      </div>
    );
  };

//   table action control (edit , delete button)
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


//   table columns data
const columns = [
  
    {
      field: "productName",
      header: "Product Name",
    
      bodyStyle: "bg-gray-200",
    },

    {
        field: "price",
        header: "Price",
        sortable: true,
        bodyStyle: "bg-gray-100",
      },

    { field: "category", header: "Category", bodyStyle: "bg-gray-100" },
  
    {
      field: "quantity",
      header: "Quantity",
      sortable: true,
      bodyStyle: "bg-gray-100",
    },

    {
        body: imageBodyTemplate,
        header: "Image",
        bodyStyle: "bg-gray-100",
      },
   {
      field: "discount",
      header: "Discount",
      sortable: true,
      bodyStyle: "bg-gray-100",
    },

    {
        field: "unit",
        header: "Unit",
        sortable: true,
        bodyStyle: "bg-gray-100",
      },

      { body: actionBodyTemplate, header: "Action", bodyStyle: "bg-gray-100" },

  ];

  const renderHeader = () => (
    <div className="p-4 flex gap-6 items-center ">
  
      {/* search */}
      <div className="relative w-full max-w-sm">
        <i className="pi pi-search text-gray-500 text-base absolute inset-y-0 left-3 flex items-center pointer-events-none" />
        <InputText
          className="w-full pl-10 border border-gray-300 rounded-md px-3 py-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          type="search"
          onInput={(e) =>
            setFilters({
              ...filters,
              global: { value: e.target.value, matchMode: "contains" },  // Update global filter
            })
          }
          placeholder="Search"
        />
      </div>
      {/* search */}
      <AddProductsAdmin getproducts={getProducts}/>
    </div>
  );
  



  return (
    <div id="productAdmin" className='w-full h-fit font-merriweather'>

        <Header/>
        <ToastContainer/>
      
       {/* update products */}
        <Dialog
            header="Update Product"
            visible={showUpdateProduct}
            onHide={() => setShowUpdateProduct(false)}
            style={{ width: "90vw", maxWidth: "600px" }}
            draggable={false}
            className="bg-white p-5 rounded-lg shadow-lg z-50"  // Ensure it is above the overlay
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
            <div className="space-y-6">
                {/* Product Name Field */}
                <div className="space-y-2">
                <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Product Name
                </label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={updateProduct.productName || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.productName && (
                    <small className="text-red-500">{errors.productName}</small>
                )}
                </div>

                {/* Price Field */}
                <div className="space-y-2">
                <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                >
                    Price
                </label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={updateProduct.price || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.price && (
                    <small className="text-red-500">{errors.price}</small>
                )}
                </div>

                {/* Discount Field */}
                <div className="space-y-2">
                <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700"
                >
                    Discount
                </label>
                <input
                    type="number"
                    id="discount"
                    name="discount"
                    min={0}
                    value={updateProduct.discount || 0}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.discount && (
                    <small className="text-red-500">{errors.discount}</small>
                )}
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                >
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={updateProduct.category || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.category && (
                    <small className="text-red-500">{errors.category}</small>
                )}
                </div>

                {/* Quantity Field */}
                <div className="space-y-2">
                <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                >
                    Quantity
                </label>
                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={updateProduct.quantity || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.quantity && (
                    <small className="text-red-500">{errors.quantity}</small>
                )}
                </div>

                {/* Unit Field */}
                <div className="space-y-2">
                <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700"
                >
                    Unit
                </label>
                <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={updateProduct.unit || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.unit && (
                    <small className="text-red-500">{errors.unit}</small>
                )}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Description
                  </label>
                  <textarea
                      id="description"
                      name="description"
                      value={updateProduct.description || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="4" // You can adjust the number of rows as needed
                  ></textarea>
                  {errors.description && (
                      <small className="text-red-500">{errors.description}</small>
                  )}
              </div>


            </div>
        </Dialog>

   {/* Delete Product Dialog */}
   <Dialog
      header="Delete Product"
      visible={showDeleteProduct}
      style={{ width: "50vw" }}
      onHide={() => setShowDeleteProduct(false)}
      className="p-fluid bg-white shadow-lg rounded-lg p-5 border border-gray-200 z-50"  // Ensure it is above the overlay
      footer={
        <div className="flex justify-end p-2 space-x-2">
          <button
            onClick={handleCancel}
            className="px-2 py-1 bg-gray-300 text-xs md:text-sm text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={()=>{handleDelete(productToDelete)}}
            className="px-2 py-1 bg-red-500 text-xs md:text-sm text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      }
    >
      <p className="text-gray-700 text-sm md:text-base">
        Are you sure you want to delete this product?
      </p>
    </Dialog>



{/* Mobile Screen card */}
<div className='w-full relative h-auto  p-10'>
    <h1 className='md:text-xl text-lg font-bold mb-5  text-center md:text-left'>Product Details</h1>
     <DataTable
        value={data} // product value
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={renderHeader()}
        filters={filters}  // Apply the filters to the DataTable
      globalFilterFields={['productName']}  // Specify the fields for global filtering
        className="p-datatable-responsive hidden md:block"
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            align="center"
            field={col.field}
            header={col.header}
            sortable={col.sortable}
            headerClassName=" text-lg py-2"
            bodyClassName="py-2 font-semibold w-[10%] text-base"
            // filter={col.filter}
            // filterElement={col.filterElement}
            body={col.body}
            bodyStyle={{ backgroundColor: col.bodyStyle }}
          />
        ))}
      </DataTable>

      <div className='md:hidden block'>

        <AddProductsAdmin />

      </div>
       
      <div className="block md:hidden">
        {products.map((item, i) => (
          <div
            className="max-w-sm mx-auto bg-white shadow-xl my-4 rounded-lg overflow-hidden"
            key={i}
          >
            <div className='p-3'>
              <img
                className="w-full h-20 object-contain"
                src={item.imageUrl}
                alt={item.productName}
              />
              <div className="p-4">
                <div className="flex flex-col items-center justify-between">
                  <h2 className="text-base font-bold text-gray-800">
                    {item.productName}
                  </h2>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                </div>
                <div className="space-y-2 mt-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Price: <span className='font-roboto'> ₹{item.price} </span>
                  </p>
                  
                </div>


                <div className="flex justify-center mt-2">
                  <p className="text-white text-xs bg-blue-950 rounded-full w-fit p-2">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* Action buttons for Edit and Delete */}
                <div className="flex justify-between mt-2 space-x-2">
                  <button
                    className="bg-greendark hover:bg-green1 text-white px-2 py-1 rounded "
                    onClick={() => handleShowUpdateModal(item,item.productId)}
                    aria-label="Edit"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleShowDeleteModal(item.productId)}
                    aria-label="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      </div> 
   
      <style jsx="true">
        {`
          .p-datatable thead th {
            border-bottom: 1px solid rgb(209, 213, 219);
            text-align: center;
            display: "flex";
            justify-content: "center";
          }

          .p-datatable-tbody > tr {
            border: 1px solid rgb(209, 213, 219);
          }
        `}
      </style>

      <Footer/>
      
    </div>
  )
}

export default ProductsAdmin
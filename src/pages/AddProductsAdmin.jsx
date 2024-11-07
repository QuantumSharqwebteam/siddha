import React,{useState,useEffect} from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../utilities/axiosInstance';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core Styles

// Upload image and generate link in aws
import { s3Client } from "../utilities/aws/awsconfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { FaPlus } from 'react-icons/fa6';

function AddProductsAdmin({getproducts}) {

    const [isDialogVisible, setIstDialogVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState("");
    const [formData, setFormData] = useState({
        productName: "",
        price:"",
        category: "",
        discount: "",
        quantity: "",
        imageUrl: "",
        unit:"",
        description:""


      });

      const resetForm = () => {
        setFormData({
            productName: "",
            price:"",
            category: "",
            discount: "",
            quantity: "",
            imageUrl: "",
            unit:"",
            description:""
        });
        setErrors({});
        // setHasSubmitted(false);
        setImageFiles("");
      };
     

    // store image and get Url
      async function uploadImage(file) {
        const uploadParams = {
          Bucket: "ashoktextile",
          Key: `images/${file.name}`,
          Body: file,
          ContentType: file.type,
        };
        const command = new PutObjectCommand(uploadParams);
        try {
          await s3Client.send(command);
          const imageURL = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
          return imageURL;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: parseFloat(value),
        }));
      };
    
      const handleFileChange = (e) => {
        setImageFiles(e.target.files[0]);
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.productName)
          newErrors.productName = "Product Name is required";

        if (!formData.category) newErrors.category = "Category is required";

        if (!formData.description) newErrors.description = "Description is required";

        if (!formData.unit) newErrors.unit = "Unit is required";

        if (formData.quantity <= 0)
          newErrors.quantity = "Quantity must be greater than 0";

        if (formData.price <= 0)
            newErrors.price = "Price must be greater than 0";
        
        if (!imageFiles) newErrors.imageFile = "Image File is required";

        if (formData.discount > 99)
          newErrors.discount = "Discount cannot exceed 100";
        setErrors(newErrors);

        return newErrors;
      };
    //   handlesubmit
    const HaandleAddProduct = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
      
          return;
        }

        setLoading(true)
    
        try {
          const uploadImageURL = await uploadImage(imageFiles);
          const newProduct = {
            ...formData,
            imageUrl: uploadImageURL,
            quantity: parseInt(formData.quantity),
            discount: parseInt(formData.discount),
            productName:formData.productName,
            category:formData.category,
            price:parseInt(formData.price),
            unit:formData.unit,
            description:formData.description
          };

          const response = await axiosInstance.post('product/addProduct',newProduct,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the header
                }
            }
          )
          console.log("add response",response.data)
          toast.success("Product added");
          resetForm();
          setLoading(false);
          setIstDialogVisible(false);
          getproducts()
        } 
        catch (error) {
          console.error("Error adding product locally:", error);
        //   setErrorMessage("Error: " + error.message);
          toast.error('unable to add products')
        }
      };

      const handleCancel = () => {
        resetForm();
        setIstDialogVisible(false);
      };

    //   console.log("formdata", formData)

  return (
    <div className='w-full flex justify-start mb-10 md:mb-0 md:justify-end'>
        <ToastContainer/>
        <button
            onClick={() => setIstDialogVisible(true)}
            className="flex items-center  space-x-2 text-xs bg-green1 text-white px-3 py-2 rounded-lg hover:bg-green2 hover:text-greendark transition duration-200"
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        <Dialog
          header="Add New Product"
          visible={isDialogVisible}
          onHide={handleCancel}
          style={{ width: "90vw", maxWidth: "600px" }}
          draggable={false}
          footer={
            <div className="flex justify-end space-x-2">
              {loading ? (
                <p>Adding...</p>
              ) : (
                <>
                  <button
                    onClick={HaandleAddProduct}
                    className="bg-greendark text-white px-4 py-2 rounded-lg hover:bg-green1 transition duration-200"
                  >
                    Add Product
                  </button>
                </>
              )}
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="p-field">
              <label
                htmlFor="productName"
                className="block text-sm font-medium"
              >
                Product Name
              </label>
              <input
                id="productName"
                name="productName"
                placeholder="Enter Product Name"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.productName && (
                <small className="text-red-500">{errors.productName}</small>
              )}
            </div>

            <div className="p-field">
              <label
                htmlFor="productName"
                className="block text-sm font-medium"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                placeholder="Enter Product Name"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.category && (
                <small className="text-red-500">{errors.category}</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter Price"
                name="price"
                value={formData.price}
                onChange={handleNumberChange}
                max={99}
                min={0}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.price && (
                <small className="text-red-500">{errors.price}</small>
              )}
            </div>

            <div className="p-field">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Product Name"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.description && (
                <small className="text-red-500">{errors.description}</small>
              )}
            </div>

            <div className="p-field">
              <label
                htmlFor="unit"
                className="block text-sm font-medium"
              >
                Unit
              </label>
              <input
                id="unit"
                name="unit"
                placeholder="Enter Product Name"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.unit && (
                <small className="text-red-500">{errors.unit}</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleNumberChange}
                max={99}
                min={0}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.quantity && (
                <small className="text-red-500">{errors.quantity}</small>
              )}
            </div>
         
     
            <div className="p-field">
              <label htmlFor="discount" className="block text-sm font-medium">
                Discount
              </label>
              <input
                id="discount"
                type="number"
                placeholder="Enter Discount"
                name="discount"
                value={formData.discount}
                onChange={handleNumberChange}
                max={99}
                min={0}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
              />
              {errors.discount && (
                <small className="text-red-500">{errors.discount}</small>
              )}
            </div>
        
            <div className="p-field mt-2">
              <label htmlFor="imageFile" className="block text-sm font-medium">
                Image File
              </label>
              <input
                type="file"
                accept="image/*"
                id="imageUrl"
                name="imageUrl"
                onChange={handleFileChange}
                className="w-full mt-1 border border-gray-300 p-2 rounded-md"
                required
              />
              {errors.imageFile && (
                <small className="text-red-500">{errors.imageFile}</small>
              )}
            </div>
          </div>
        </Dialog>
    </div>
  )
}

export default AddProductsAdmin
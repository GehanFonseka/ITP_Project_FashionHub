import React, { useState } from "react";
import axios from '../../utilities/axios';
import { useNavigate } from 'react-router-dom';

const C_AdminDBTMMensBlazer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sellerNo: "",
    itemNo: "",
    name: "",
    price: "",
    description: "",
    image: null
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFormData(prevData => ({ ...prevData, image: file }));
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "sellerNo":
      case "itemNo":
        newErrors[name] = !value || isNaN(value) || value.length < 1
          ? `${name.replace(/([A-Z])/g, ' $1').trim()} must be a number and not empty.`
          : "";
        break;
      case "name":
        newErrors.name = !value || value.length < 3
          ? "Name must be at least 3 characters long."
          : "";
        break;
      case "price":
        newErrors.price = !value || isNaN(value) || value <= 0
          ? "Price must be a positive number."
          : "";
        break;
      case "description":
        newErrors.description = !value || value.length < 5
          ? "Description must be at least 5 characters long."
          : "";
        break;
      case "image":
        newErrors.image = !imageFile
          ? "Image is required."
          : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sellerNo || isNaN(formData.sellerNo)) {
      newErrors.sellerNo = "Seller No must be a number and not empty.";
    }
    if (!formData.itemNo || isNaN(formData.itemNo)) {
      newErrors.itemNo = "Item No must be a number and not empty.";
    }
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (!formData.description || formData.description.length < 5) {
      newErrors.description = "Description must be at least 5 characters long.";
    }
    if (!formData.image) {
      newErrors.image = "Image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataWithImage = new FormData();
     
      formDataWithImage.append("image", imageFile);
      console.log("formDataWithImage",formDataWithImage)
      console.log("imageFile",imageFile)
      console.log("formData",formData)
      try {
        const response = await axios.post('/api/tm-mensblazers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("Response:", response); // Debugging: Log server response
        alert("Blazer item has been added successfully.");
        setFormData({
          sellerNo: "",
          itemNo: "",
          name: "",
          price: "",
          description: "",
        });
        setImageFile(null);
        setErrors({});
        navigate('/C_AdminSBTMMensBlazer'); // Redirect to a success page or list page
      } catch (error) {
        console.error("Error submitting the form:", error.response?.data || error.message);
        alert(`There was an error adding the pants item: ${error.response?.data.error || error.message}`);
      }
    }
  };

  const styles = {
    formBackground: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f7f7f7',
      padding: '20px',
    },
    container: {
      marginTop: '-150px',
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
    },
    heading: {
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px',
      textAlign: 'center',
      fontWeight: '600',
    },
    formGroup: {
      marginBottom: '15px',
    },
    inlineGroup: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    inlineInput: {
      width: '48%',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '8px',
      margin: '5px 0',
      boxSizing: 'border-box',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
    button: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.formBackground}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add New Tailor Made Mens Blazer Item</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={styles.formGroup}>
            <label style={styles.label}>Seller No:</label>
            <input
              type="text"
              name="sellerNo"
              value={formData.sellerNo}
              onChange={handleChange}
              onBlur={() => validateField('sellerNo', formData.sellerNo)}
              style={styles.input}
              required
            />
            {errors.sellerNo && <p style={styles.error}>{errors.sellerNo}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Item No:</label>
            <input
              type="text"
              name="itemNo"
              value={formData.itemNo}
              onChange={handleChange}
              onBlur={() => validateField('itemNo', formData.itemNo)}
              style={styles.input}
              required
            />
            {errors.itemNo && <p style={styles.error}>{errors.itemNo}</p>}
          </div>
          <div style={{ ...styles.formGroup, ...styles.inlineGroup }}>
            <div style={styles.inlineInput}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => validateField('name', formData.name)}
                style={styles.input}
                required
              />
              {errors.name && <p style={styles.error}>{errors.name}</p>}
            </div>
            <div style={styles.inlineInput}>
              <label style={styles.label}>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={() => validateField('price', formData.price)}
                style={styles.input}
                required
              />
              {errors.price && <p style={styles.error}>{errors.price}</p>}
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={() => validateField('description', formData.description)}
              style={styles.input}
              rows="4"
              required
            ></textarea>
            {errors.description && <p style={styles.error}>{errors.description}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
              required
            /> 
           {errors.image && <p style={styles.error}>{errors.image}</p>}
          </div>
          <button type="submit" style={styles.button}>Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default C_AdminDBTMMensBlazer;

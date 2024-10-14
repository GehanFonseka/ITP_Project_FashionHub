import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FavoritePackagesPage.css";
import jsPDF from 'jspdf';

const FavoritePackagesPage = () => {
  const [favoritePackages, setFavoritePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [comparisonItems, setComparisonItems] = useState([]);

  useEffect(() => {
    const fetchFavoritePackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/favoritePackages"
        );
        setFavoritePackages(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePackages();
  }, []);

  const deletePackage = async (packageId) => {
    const confirmed = window.confirm("Are you sure you want to delete this package?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/favoritePackages/delete/${packageId}`);
      setFavoritePackages((prevPackages) =>
        prevPackages.filter((pkg) => pkg._id !== packageId)
      );
    } catch (err) {
      console.error("Error deleting package:", err);
      setError("Error deleting package.");
    }
  };

  // Function to handle adding all items to the cart
  const addToCart = async (pkg) => {
    try {
      const addItemPromises = [];

      if (pkg.items.shirt) {
        const shirtItem = pkg.items.shirt;
        const shirtCartItem = {
          ItemsN: shirtItem.name,
          price: shirtItem.price,
          quantity: 1,
          image: shirtItem.images || [],
          sellerNo: shirtItem.sellerNo || pkg.sellerNo,
        };
        addItemPromises.push(axios.post("http://localhost:5000/api/items/cart", shirtCartItem));
      }

      if (pkg.items.trouser) {
        const trouserItem = pkg.items.trouser;
        const trouserCartItem = {
          ItemsN: trouserItem.name,
          price: trouserItem.price,
          quantity: 1,
          image: trouserItem.images || [],
          sellerNo: trouserItem.sellerNo || pkg.sellerNo,
        };
        addItemPromises.push(axios.post("http://localhost:5000/api/items/cart", trouserCartItem));
      }

      if (pkg.items.shoe) {
        const shoeItem = pkg.items.shoe;
        const shoeCartItem = {
          ItemsN: shoeItem.name,
          price: shoeItem.price,
          quantity: 1,
          image: shoeItem.images || [],
          sellerNo: shoeItem.sellerNo || pkg.sellerNo,
        };
        addItemPromises.push(axios.post("http://localhost:5000/api/items/cart", shoeCartItem));
      }

      await Promise.all(addItemPromises);
      alert("All items have been added to the cart!");
    } catch (err) {
      console.error("Error adding items to cart:", err);
      alert("Failed to add items to cart. Please try again.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add the centered title "FashionHub" in light orange
    doc.setFontSize(24);
    doc.setTextColor(255, 165, 0); // Light orange color
    doc.text("FashionHub", doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
  
    // Set the report title below the main title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Reset to black for the report title
    doc.text("Favorite Packages Report", 14, 30);
  
    // Add some space after the title
    let yPosition = 40;
  
    // Iterate through each package
    favoritePackages.forEach((pkg, index) => {
      if (pkg && pkg.items) { // Check if pkg and pkg.items are valid
        // Package name and budget
        doc.setFontSize(14);
        doc.text(`Package: ${pkg.name || 'Unnamed Package'} - Budget: Rs. ${pkg.budget || 0}`, 14, yPosition);
        yPosition += 10; // Add space after each package
  
        // Prepare table data for this package
        const tableColumn = ["Item Type", "Item Name", "Price (Rs)"];
        const tableRows = [];
  
        // Iterate through each item in the package
        Object.keys(pkg.items).forEach((itemKey) => {
          const item = pkg.items[itemKey];
          if (item) { // Check if item is valid
            const rowData = [itemKey, item.name || 'Unnamed Item', item.price || '0'];
            tableRows.push(rowData);
          }
        });
  
        // Generate table using autoTable with light orange header
        doc.autoTable({
          startY: yPosition, // Set the Y position for the table to begin
          head: [tableColumn],
          body: tableRows,
          theme: 'grid', // Customizable theme
          headStyles: { fillColor: [255, 165, 0] }, // Light orange color for the table headers
          margin: { top: 10 },
        });
  
        // Move yPosition to after the table to add space before the next package
        yPosition = doc.autoTable.previous.finalY + 20; // Adjust for spacing after the table
  
        // Check if yPosition goes beyond the page height and add a new page if necessary
        if (yPosition >= 280) {
          doc.addPage();
          yPosition = 30; // Reset Y position for the new page
        }
      }
    });
  
    // Save the generated PDF
    doc.save("favorite-packages.pdf");
  };
  
  

  const filteredPackages = favoritePackages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleComparisonToggle = (item) => {
    if (comparisonItems.includes(item._id)) {
      setComparisonItems(comparisonItems.filter((id) => id !== item._id));
    } else {
      if (comparisonItems.length < 4) {
        setComparisonItems([...comparisonItems, item._id]);
      } else {
        alert("You can only compare up to 4 items.");
      }
    }
  };

  const ComparisonTable = () => {
    if (comparisonItems.length === 0) return null;

    const itemsToCompare = favoritePackages.filter((pkg) =>
      comparisonItems.includes(pkg._id)
    );

    return (
      <div className="comparison-table">
        <h2>Item Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              {itemsToCompare.map((item) => (
                <th key={item._id}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              {itemsToCompare.map((item) => (
                <td key={item._id}>Rs. {item.budget}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="favorite-packages-container">
      <h1>Favorite Packages</h1>

      <input
        type="text"
        placeholder="Search by package name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="pdf-button-container">
          <button className="small-pdf-button" onClick={generatePDF}>
            Download PDF
          </button>
        </div>

      {filteredPackages.length === 0 ? (
        <p>No favorite packages found.</p>
      ) : (
        <div className="favorite-packages-list">
          {filteredPackages.map((pkg) => (
            <div key={pkg._id} className="package-card">
              <div className="package-header">
                <div className="package-details">
                  <h2>{pkg.name}</h2>
                  <p className="package-budget">Budget: Rs. {pkg.budget}</p>
                </div>
                <div className="package-actions">
                  <Link to={`/edit-package/${pkg._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => deletePackage(pkg._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="package-items">
                {pkg.items && // Ensure pkg.items exists
                  Object.keys(pkg.items).map((itemKey) => {
                    const item = pkg.items[itemKey];
                    if (!item) return null;

                    return (
                      <div key={item._id} className="item-card">
                        <h3>{item.name}</h3>
                        <p>Price: Rs. {item.price}</p>
                        <div className="item-images">
                          {Array.isArray(item.images) && // Ensure item.images is an array
                            item.images.map((img, index) => (
                              <img
                                key={index}
                                src={`/images/${img}`}
                                alt={`${item.name}-${index}`}
                              />
                            ))}
                        </div>
                      </div>
                    );
                  })}
              </div>


              <div className="package-actions-bottom">
                <input
                  type="checkbox"
                  checked={comparisonItems.includes(pkg._id)}
                  onChange={() => handleComparisonToggle(pkg)}
                />
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(pkg)}
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ComparisonTable />
    </div>
  );
};

export default FavoritePackagesPage;

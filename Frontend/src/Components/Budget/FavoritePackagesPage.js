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
          image: shirtItem.image || [],
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
          image: trouserItem.image || [],
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
          image: shoeItem.image || [],
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
    
    const logo = 'data:image/png;base64,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'; // Add your logo's Base64 string here
    doc.addImage(logo, 'PNG', 14, 8, 30, 10);

    let yPosition = 50;

    // Add the centered title "FashionHub" in light orange
    doc.setFontSize(24);
    doc.setTextColor(139,0,0); // Red color
    doc.text("Favorite Packages Report", doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

    // Set the report title below the main title
    doc.setFontSize(16);
    doc.setTextColor(139,0,0); // Reset to black for the report title
    

    // Add some space after the title
    yPosition += 10;

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
          headStyles: { fillColor: [139,0,0] }, // Red for the table headers
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

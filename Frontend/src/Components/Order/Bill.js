import { useEffect, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";

export default function Bill() {
 

  const [emailValidation, setEmailValidation] = useState(null);
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const shippingPrice = 200;
  const [formData, setFormData] = useState({});
  const [validation, setValidation] = useState(null);
  const [postalvalidation, setpostalcode] = useState(null);
  const [carN, setcardN] = useState(null);
  const [cvc, setcvc] = useState(null);
  const [expired, setexpired] = useState(null);
  const [cardNameValidation, setCardNameValidation] = useState(null);

  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/items/checkout/last` // Assume this endpoint returns the last added order
        );
        const data = await response.json();
        console.log(data);
  
        // Assuming that data will contain only the latest order item
        if (data && data.items && data.items.length > 0) {
          setOrderDetailsList(data.items); // Store the last order in state
        } else {
          setOrderDetailsList([]); // Set to empty array if no items
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
  
    fetchData();
  }, []);
  

 
  


  //validation

  const handleEmailChange = (e) => {
    const emailInput = e.target.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenSymbolsPattern = /[!#$%^&*()_+|~=`{}\[\]:";'<>?,\/]/;
  
    if (emailInput === "") {
      setEmailValidation("Email cannot be empty.");
    } else if (forbiddenSymbolsPattern.test(emailInput)) {
      setEmailValidation("Email cannot contain special symbols.");
    } else if (!emailPattern.test(emailInput)) {
      setEmailValidation("Please enter a valid email address.");
    } else {
      setFormData({ ...formData, email: emailInput });
      setEmailValidation(null);
    }
  };
  



  const handleCardNameChange = (e) => {
  const cardName = e.target.value.trim();
  
  // Validation for alphabetic characters and spaces only (no numbers or special characters)
  const namePattern = /^[A-Za-z\s]+$/;
  const forbiddenSymbolsPattern = /[!#$%^&*()_+|~=`{}\[\]:";'<>?,\/]/;

  if (cardName === "") {
    setCardNameValidation("Cardholder name cannot be empty.");
  } else if (forbiddenSymbolsPattern.test(cardName)) {
    setCardNameValidation("Cardholder name cannot contain special symbols.");
  } else if (!namePattern.test(cardName)) {
    setCardNameValidation("Cardholder name can only contain letters and spaces.");
  } else if (cardName.length < 3) {
    setCardNameValidation("Cardholder name must be at least 3 characters long.");
  } else {
    setFormData({ ...formData, cardName });
    setCardNameValidation(null); // Clear validation if valid
  }
};


  
const handleContactChange = (e) => {
  // Replace any non-numeric characters (letters, symbols, etc.)
  let Phone = e.target.value.replace(/\D/g, "").trim();

  // Restrict input to exactly 10 digits maximum
  if (Phone.length > 10) {
    Phone = Phone.slice(0, 10); // Allow only the first 10 digits
  }

  // Validation: Check if the input has exactly 10 digits
  const contactPattern = /^\d{10}$/;

  if (Phone === "") {
    setValidation("Contact number cannot be empty.");
  } else if (!contactPattern.test(Phone)) {
    setValidation("Contact number must be a valid 10-digit number.");
  } else {
    // Update form data and clear any validation errors
    setFormData({ ...formData, Phone });
    setValidation(null);
  }
};

  

  const handlepostlaChange = (e) => {
    const Postal = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers
    const forbiddenSymbolsPattern = /[!#$%^&*()_+|~=`{}\[\]:";'<>?,\/]/;
  
    if (Postal === "") {
      setpostalcode(null);
    } else if (!quantityPattern.test(Postal)) {
        if (isNaN(Postal)) {
          setpostalcode("Please Enter the number");
        } else {
          setpostalcode(" positive integer");
        }
    } else {
        setFormData({ ...formData, Postal });
        setpostalcode(null);
    }
  };


  const handlecartnChange = (e) => {
    const CardN = e.target.value.trim();
    const cardNumberPattern = /^\d{16}$/; // Pattern for exactly 16 digits
    
    // Check if input is empty
    if (CardN === "") {
      setcardN("Card number is required");
    } 
    // Check if input is not a number
    else if (isNaN(CardN)) {
      setcardN("Please enter only numbers");
    } 
    // Check if input is not 16 digits long
    else if (!cardNumberPattern.test(CardN)) {
      setcardN("Card number must be exactly 16 digits");
    } 
    // Valid card number
    else {
      setFormData({ ...formData, CardN });
      setcardN(null); // Clear any previous error message
    }
  };
  
  

  const handlecvcChange = (e) => {
    let cvc = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers
    const datePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format
  
    // Add auto-slash
    if (cvc.length === 2 && !cvc.includes('/')) {
      cvc = cvc + '/';
    }
  
    if (cvc === "") {
      setcvc(null);
    } else if (!quantityPattern.test(cvc) && !datePattern.test(cvc)) {
      if (isNaN(cvc)) {
        setcvc("Please Enter the number");
      } else {
        setcvc(" positive integer");
      }
    } else if (datePattern.test(cvc)) {
      const [month, year] = cvc.split('/').map(Number);
      const currentDate = new Date();
      const inputDate = new Date(`20${year}`, month - 1);
  
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 5);
  
      const minDate = new Date();
      minDate.setMonth(minDate.getMonth() + 12);
  
      if (inputDate < minDate || inputDate > maxDate) {
        setcvc("Date must be within 12 months and 5 years");
      } else {
        setFormData({ ...formData, cvc });
        setcvc(null);
      }
    } else {
      setFormData({ ...formData, cvc });
      setcvc(null);
    }
  };
  
  

 //save report in th data base
 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted!");

  try {
    // Calculate total price
    const totalItemsPrice = orderDetailsList.reduce((total, item) => {
      const itemPrice = item.price || 0; // Default to 0 if undefined
      const itemQuantity = item.quantity || 0; // Default to 0 if undefined
      return total + itemPrice * itemQuantity;
    }, 0);

    const totalPrice = totalItemsPrice + shippingPrice;

    const formDataWithItems = {
      ...formData,
      items: orderDetailsList.flatMap((order) =>
        order.items.map((item) => ({
          ItemsN: item.ItemsN,
          price: item.price,
          quantity: item.quantity,
        }))
      ),
      totalPrice,
    };

    console.log("Form Data:", formDataWithItems); // Log form data

    // Ensure all required fields are present
    if (!formDataWithItems.Phone || !formDataWithItems.totalPrice) {
      console.error("Missing required fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/items/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataWithItems),
    });
 
    
    const data = await res.json();
  
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    if (res.ok) {
      alert("Success!");
      navigate("/order");
      handleDeleteall();
    }
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
};


//if submite is success clear the cart details
const handleDeleteall = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/items/orders`, {
      method: "DELETE",
    });
       await res.json();
    if (!res.ok) {
      console.log("fail");
    } else {
      console.log("success");
      
      
    }
  } catch (error) {
    console.log(error);
  }
};



  return (
    
    <div className="min-h-screen">
      <div className="flex justify-center mt-28  items-center gap-4">
        <div>
          <div className="mb-20 text-4xl font-sans-serif ml-[5px]">
            <h1>Fashion Hub</h1>
          </div>
          <div className="flex justify-center items-center mt-3">
          <Link to={`/`}>
            <div className="text-black uppercase font sans-serif  hover:text-red-600 cursor-pointer hover:underline">
            back to your cart
            </div>
            </Link>
          
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="max-h-[550px] mt-2 overflow-y-auto scrollbar-none">
              <div>
                <h3 className="font-sans-serif text-gray-700 ml-1 text-xl">Email</h3>
                <input
                  className="bg-gray-100 border-white border-opacity-50 p-3 rounded-lg w-[750px] h-11"
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleEmailChange}
                />
                 {emailValidation && <p className="text-red-500 mt-2">{emailValidation}</p>}
              </div>
              <div className="mt-4">
                <h3 className="font-sans-serif text-gray-700 ml-2 text-xl">Delivery address</h3>
                <input
                  className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[750px] h-11"
                  type="text"
                  placeholder=""
                  id="delivery"
                  onChange={handlchange}
                />
              </div>
              <div className="flex gap-12 mt-3">
                <div>
                  <input
                    className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[350px] h-11"
                    type="text"
                    placeholder="First name"
                    id="Fname"
                    onChange={handlchange}
                  />
                </div>
                <div>
                  <input
                    className="bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[350px] h-11"
                    type="text"
                    placeholder="Last name"
                    id="Lname"
                    onChange={handlchange}
                  />
                </div>
              </div>

              <div className="mt-2">
                <input
                  className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[750px] h-11"
                  type="text"
                  placeholder="Address"
                  id="Address"
                  onChange={handlchange}
                />
              </div>
              <div className="mt-2">
                <input
                  className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[750px] h-11"
                  type="text"
                  placeholder="Apartment"
                  id="Apartment"
                  onChange={handlchange}
                />
              </div>
              <div className="flex gap-12 mt-3">
              <div>
              <select
                className="bg-gray-100 border-white border-opacity-50 p-3 rounded-lg w-[350px] h-11"
                id="City"
                onChange={handlchange}
              >
                <option value="" disabled selected>
                  Select District
                </option>
                <option value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>
              </select>
            </div>
                <div className="">
                  <input
                    className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[350px] h-11"
                    type="text"
                    placeholder="postal code"
                    id="Postal"
                    maxLength={5}
                    onChange={handlepostlaChange}
                  />
                   {postalvalidation && (
                    <p className="mt-0 text-red-600 h-0   text-sm   rounded-lg text-center ">
                      {postalvalidation}
                    </p>
                  )}
                   
                </div>
              </div>
              <div className="mt-4">
                <input
                  className=" bg-gray-100 border-white border-opacity-50 p-3 rounded-lg w-[750px] h-11"
                  type="text"
                  placeholder="phone"
                  id="Phone" // Ensure this ID matches
                  onChange={handleContactChange}
                />
                {validation && (
                    <p className="mt-0 text-red-600 h-0 text-sm     rounded-lg text-center ">
                      {validation}
                    </p>
                  )}
              </div>

              <div className="h-20 w-[750px] mt-6 rounded-3xl bg-gray-200  bg-opacity-40">
                <div className="">
                  <button className=" ml-6 mt-6 text-xl font-sans-serif opacity-50 ">
                  Delivery within standard 2-3 business Days
                  </button>
                </div>
              </div>

              <div className="ml-80">
                <div className="font sans-serif text-gray-600 text-xl mt-4">
                  Payment
                </div>
              </div>

              <img
                src="https://e7.pngegg.com/pngimages/739/826/png-clipart-logo-credit-card-payment-card-american-express-credit-card-text-display-advertising-thumbnail.png"
                alt=""
                className="w-52 h-10 mt-10 opacity-70"
              />

              <div className="mt-5"> 
                <input
                  className="bg-gray-100 border-white border-opacity-50 p-3 rounded-lg w-[750px] h-11" // Changed width to match Card Number
                  type="text"
                  placeholder="Cardholder Name"
                  onChange={handleCardNameChange}
                />
                {cardNameValidation && <p className="text-red-500 mt-2">{cardNameValidation}</p>} {/* Margin to error text */}
              </div>

              <div className="mt-4">
                <h3 className="font sans-serif text-gray-700 ml-2 text-xl">
                  Card Number
                </h3>
                <input
                  className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[750px] h-11"
                  type="text"
                  placeholder="number"
                  id="CardN"
                  maxLength={16}
                  onChange={handlecartnChange}
                />
                {carN&& (
                    <p className="mt-0 text-red-600 h-0 text-sm     rounded-lg text-center ">
                      {carN}
                    </p>
                  )}
              </div>
              <div className="flex gap-12 mt-3">
                <div>
                  <h3 className="font sans-serif text-gray-700 ml-2 text-xl">
                    Expired Date
                  </h3>
                  <input
                    className=" bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[350px] h-11"
                    type="text"
                    placeholder="mm/yy"
                    id="Exdate"
                    maxLength={5}
                    onChange={handlchange}
                  />
                 
                    <p className="mt-0 text-red-600 h-0 text-sm     rounded-lg text-center ">
                     please use this format mm/yy
                    </p>
                 
                </div>
                <div>
                  <h3 className="font sans-serif text-gray-700 ml-2 text-xl">CVC</h3>
                  <input
                    className="bg-gray-100  border-white border-opacity-50  p-3 rounded-lg w-[350px] h-11"
                    type="text"
                    placeholder="CVC"
                    id="cvc"
                    maxLength={3}
                    onChange={handlecvcChange}
                  />
                  {cvc && (
                    <p className="mt-0 text-red-600 h-0   text-sm   rounded-lg text-center  ">
                      {cvc}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              className="bg-black border-white border border-opacity-50 text-white font-serif p-2 hover:text-red-300 rounded-lg w-[200px] h-[45px] hover:opacity-90"
              type="submit"
            >
              <div className="flex items-center justify-center">
                <div className="font-serif text-xl uppercase opacity-75">CheckOut</div>
              </div>
            </button>
          </form>
        </div>

        <div className="">
          <div className="w-[400px] h-screen mt-6 ml-36 shadow-sm scrollbar-none rounded-lg bg-gray-300 overflow-auto">
            <div className="flex flex-col p-4">
               
              {orderDetailsList.map((order) => (
                <div
                  key={order._id}
                  className="mb-4 p-4 border shadow-xl border-gray-300 rounded-lg bg-white shadow-md"
                >
                   {/* Cart Image at the top */}
                   <div className="flex justify-center mb-8">
                    <img 
                      src="https://img.freepik.com/free-vector/shoppers-walking-past-fashion-outlet-window-customers-wheeling-cart-with-bags-packages-flat-vector-illustration-consumerism-purchase-concept_74855-10153.jpg?t=st=1728732153~exp=1728735753~hmac=758d3cb7ce8916b7e0a6b26fc93c6a666e09b9a479d767188f34330e7d2b33de&w=1800" // Replace with the actual image URL
                      alt="Cart"
                      className="w-76 h-56" // Adjust size as needed
                    />
                  </div>
                  <h3 className="font sans-serif break-words w-76 text-lg text-black">Your Order ID: {order._id}</h3>

                 
                  <div className="mt-2">
                    <h4 className="font sans-serif text-xl uppercase">Your Items:</h4>
                    {order.items.map((item) => (
                      <div key={item._id} className="flex justify-between mb-1">
                        <span className="truncate w-36">
                          {item.ItemsN} (x{item.quantity})
                        </span>
                        <span className="text-red-600">
                          RS. {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr  className="text-black h-2"/>
                  <div className="mt-2">
                    <strong className="uppercase">Shipping:</strong>{" "}
                    <span className="text-red-600">Rs.{shippingPrice}</span>
                  </div>
                  <div className="mt-2">
                    <strong className="uppercase">Total Price:</strong>{" "}
                    <span className="text-red-600">
                      Rs.{order.totalPrice + shippingPrice}
                    </span>
                  </div>
                  <div className="mt-1">
                    <strong className="uppercase">Date:</strong>{" "}
                    <span className="text-opacity-70">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

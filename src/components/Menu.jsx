import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

const menuData = [
  {
    category: "Filipino-Cuisine",
    dishes: [
      {
        name: "Adobo Chicken",
        image: "https://source.unsplash.com/400x300/?filipino-food",
        description:
          "Slow-cooked soy-marinated chicken with garlic and vinegar.",
        price: "$12.99",
      },
      {
        name: "Adobo Fish",
        image: "https://source.unsplash.com/400x300/?filipino-food",
        description: "Slow-cooked soy-marinated fish with garlic and vinegar.",
        price: "$12.99",
      },
      {
        name: "Sinigang na Baboy",
        image: "https://source.unsplash.com/400x300/?sinigang",
        description: "Tamarind pork soup with vegetables and rich flavor.",
        price: "$10.99",
      },
      {
        name: "Pancit Bihon",
        image: "https://source.unsplash.com/400x300/?pancit",
        description: "Stir-fried rice noodles with vegetables and pork.",
        price: "$9.99",
      },
      {
        name: "Lechon Kawali",
        image: "https://source.unsplash.com/400x300/?lechon",
        description: "Crispy fried pork belly served with liver sauce.",
        price: "$13.99",
      },
    ],
  },
  {
    category: "PuertoRican-Cuisine",
    dishes: [
      {
        name: "Mofongo",
        image: "https://source.unsplash.com/400x300/?mofongo",
        description:
          "Mashed plantains with garlic, pork cracklings, and broth.",
        price: "$11.99",
      },
      {
        name: "Arroz con Gandules",
        image: "https://source.unsplash.com/400x300/?rice",
        description: "Puerto Rican rice with pigeon peas and pork.",
        price: "$10.50",
      },
      {
        name: "Tostones",
        image: "https://source.unsplash.com/400x300/?tostones",
        description: "Twice-fried plantain slices, crispy and salty.",
        price: "$6.99",
      },
      {
        name: "Pastelón",
        image: "https://source.unsplash.com/400x300/?plantain-lasagna",
        description: "Sweet plantain lasagna with beef and cheese.",
        price: "$12.50",
      },
    ],
  },
  {
    category: "Fusion-Cuisine A la Carte",
    dishes: [
      {
        name: "Adobo Empanadas",
        image: "https://source.unsplash.com/400x300/?empanadas",
        description:
          "Fusion empanadas filled with Filipino-style adobo chicken.",
        price: "$8.99",
      },
      {
        name: "Lechon Tacos",
        image: "https://source.unsplash.com/400x300/?tacos",
        description: "Puerto Rican-style pork belly tacos with Filipino slaw.",
        price: "$10.99",
      },
      {
        name: "Ube Flan",
        image: "https://source.unsplash.com/400x300/?ube",
        description: "Velvety purple yam custard topped with caramel sauce.",
        price: "$7.99",
      },
      {
        name: "Spam Musubi w/ Mofongo",
        image: "https://source.unsplash.com/400x300/?spam",
        description: "A tropical twist on the Hawaiian favorite.",
        price: "$9.50",
      },
    ],
  },
  {
    category: "Pick Your Own",
    dishes: [
      {
        name: "Build Your Bowl",
        image: "https://source.unsplash.com/400x300/?rice-bowl",
        description: "Choose your base, protein, and toppings — your way.",
        price: "$11.99",
      },
      {
        name: "Island Skewers",
        image: "https://source.unsplash.com/400x300/?bbq-skewers",
        description: "Skewers of pork, shrimp, or tofu with island spices.",
        price: "$9.99",
      },
      {
        name: "Tropical Spring Rolls",
        image: "https://source.unsplash.com/400x300/?spring-rolls",
        description: "Fresh veggies and meats wrapped in rice paper.",
        price: "$8.49",
      },
      {
        name: "Fusion Plate Sampler",
        image: "https://source.unsplash.com/400x300/?fusion-food",
        description: "Pick any 3 small bites across cuisines.",
        price: "$14.99",
      },
    ],
  },
];

export default function Menu() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    serviceType: "delivery",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setQuantity(1); // Reset quantity to 1 when modal opens
    // Reset form data & errors on modal open
    setFormData({
      customerName: "",
      phoneNumber: "",
      email: "",
      serviceType: "delivery",
      address: "",
    });
    setFormErrors({});
  };

  const closeModal = () => {
    setSelectedDish(null);
  };

  // Helper to parse price string "$12.99" -> 12.99 (number)
  const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[^0-9.]/g, ""));

  const totalPrice = selectedDish
    ? (parsePrice(selectedDish.price) * quantity).toFixed(2)
    : "0.00";

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors on input change
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = "Customer name is required";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (
      formData.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (formData.serviceType === "delivery" && !formData.address.trim()) {
      errors.address = "Address is required for delivery";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // For now, just alert the order summary (could replace with real submission)
    alert(`Order Summary:
Dish: ${selectedDish.name}
Quantity: ${quantity}
Customer Name: ${formData.customerName}
Phone Number: ${formData.phoneNumber}
Email: ${formData.email || "N/A"}
Service Type: ${formData.serviceType}
${formData.serviceType === "delivery" ? `Address: ${formData.address}` : ""}
Total Price: $${totalPrice}
`);

    // Close modal after submit
    closeModal();
  };

  return (
    <MenuSection id="menu">
      <h1 className="title" data-aos="fade-down">
        Our Menu
      </h1>

      {menuData.map((category, idx) => (
        <div key={idx}>
          <h2 className="category" data-aos="fade-right">
            {category.category}
          </h2>
          <div className="cards">
            {category.dishes.map((dish, i) => (
              <div className="card" key={i} data-aos="zoom-in">
                <img src={dish.image} alt={dish.name} />
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <span className="price">{dish.price}</span>
                <button onClick={() => openModal(dish)}>Order Now</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedDish && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{selectedDish.name}</h2>
            <img src={selectedDish.image} alt={selectedDish.name} />
            <p>{selectedDish.description}</p>
            <strong>Price: {selectedDish.price}</strong>

            <QuantityWrapper>
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
              />
            </QuantityWrapper>

            <TotalPrice>Total: ${totalPrice}</TotalPrice>

            {/* Order Form */}
            <Form onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <label htmlFor="customerName">Customer Name*</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.customerName && (
                  <ErrorMsg>{formErrors.customerName}</ErrorMsg>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phoneNumber">Phone Number*</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.phoneNumber && (
                  <ErrorMsg>{formErrors.phoneNumber}</ErrorMsg>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <ErrorMsg>{formErrors.email}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="serviceType">Service Type*</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                >
                  <option value="delivery">Delivery</option>
                  <option value="dine-in">Dine-in</option>
                  <option value="take-out">Take-out</option>
                </select>
              </FormGroup>

              {formData.serviceType === "delivery" && (
                <FormGroup>
                  <label htmlFor="address">Address*</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.address && (
                    <ErrorMsg>{formErrors.address}</ErrorMsg>
                  )}
                </FormGroup>
              )}

              <SubmitButton type="submit">Submit Order</SubmitButton>
            </Form>

            <button onClick={closeModal}>Close</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </MenuSection>
  );
}

const MenuSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;

  .title {
    text-align: center;
    font-size: 2.5rem;
    color: #e63946;
    margin-bottom: 3rem;
  }

  .category {
    font-size: 1.8rem;
    color: #1d3557;
    margin: 2rem 0 1rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .card {
    background-color: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    /* Set a fixed height for all cards to make them uniform */
    height: 420px;

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    h3 {
      margin: 0.5rem 0;
      color: #333;
      flex-shrink: 0;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      margin: 0.5rem 0 1rem;

      /* Make description text scroll if too long */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* limit lines */
      -webkit-box-orient: vertical;
      flex-grow: 1;
    }

    .price {
      font-weight: bold;
      color: #1d3557;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    button {
      background-color: #e63946;
      color: white;
      padding: 0.5rem 1.2rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s ease;
      flex-shrink: 0;

      &:hover {
        background-color: #d62839;
      }
    }
  }

  /* Smaller screens already handled by grid auto-fit but you can customize more */
  @media (max-width: 900px) {
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }

  @media (max-width: 500px) {
    .cards {
      grid-template-columns: 1fr;
    }

    .card {
      height: auto; /* Let cards adjust height on very small screens */
      p {
        -webkit-line-clamp: unset;
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;

  img {
    width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }

  button {
    margin-top: 1rem;
    background-color: #e63946;
    color: white;
    padding: 0.5rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #d62839;
    }
  }
`;

const QuantityWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  input {
    width: 60px;
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    text-align: center;
  }

  label {
    font-weight: 600;
  }
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  margin-top: 1rem;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.4rem 0.5rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    resize: vertical;
  }
`;

const ErrorMsg = styled.div`
  color: #d62839;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background-color: #457b9d;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  margin-top: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d3557;
  }
`;

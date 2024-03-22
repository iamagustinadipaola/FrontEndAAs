// update item quantity http://localhost:3000/item/update/2
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function UpdateCartItem(props) {
  const [itemName, setItemName] = useState(""); // Name of the item 
  const [itemPrice, setItemPrice] = useState(""); // Price of the item 
  const [itemQuantity, setItemQuantity] = useState(""); // Quantity of the item
  const params = useParams(""); // Extract URL parameters 
  const navigate = useNavigate();  // Set up navigation using the useNavigate hook
  const [items, setItems] = useState([]); // Initialize an empty array for items
  const [id, setId] = useState(); // Initialize a state variable for item ID

    // Function to handle updating the cart item
  function handleClick() {
    axios
      .patch("http://localhost:8080/item/update/" + params.id, {
        itemName,
        itemPrice,
        itemQuantity, // Include the updated item quantity in the request
        
        cart: { id: params.id }, // Include the cart ID 
      })

      .then((response) => {
        setItemName("");
        setItemPrice("");
        setItemQuantity("");  // Clear the item quantity state after successful update
        navigate(-1); // Navigate back (e.g., to the previous page)
      })

      .catch((err) => console.error(err)); // Log any errors to the console
  }

  return (
    <Card
    className="col-sm-4 col-md-2 col-lg-2 m-3"
    style={{ textAlign: "center" }}>
    <div style={{ height: "400px" }}>
      <form>
        <br></br>
        <br></br>

        <strong>ITEM NAME: </strong>
        <input
          type="text"
          className="form-control"
          placeholder="Update name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <br />
        <strong>PRICE: </strong>
        <input
          type="number"
          className="form-control"
          placeholder="Update price"
          defaultValue="0.00"
          min="0"
          step="0.01"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
         <br />
        <strong> QUANTITY:</strong>
        <input
          type="number"
          className="form-control"
          min="0"
          placeholder="Update quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
<br/>
<Button
          variant="dark"
          style={{ fontFamily: "roboto, sans-serif" }}
          id="itemSubmit"
          onClick={handleClick}

          type="submit"
        >
          Submit
        </Button>
       
        <br></br>
        <br></br>
        <div>
          {/* <img
            className="text-center"
            style={{ marginLeft: "40px", width: "10%" }}
            src={basket}
          ></img> */}
        </div>
      </form>
      
    </div>
    </Card>
  );
}

export default UpdateCartItem;
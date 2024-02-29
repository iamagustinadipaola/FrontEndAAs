import axios from "axios";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DisplayCartContent from "../cart/DisplayCartContent";


function UpdateCartItem() {

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0.0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const params = useParams("");
    const navigate = useNavigate();
    const [items, setItems] = useState([]);


    function getCartItems(props) {
        axios.get("http://localhost:8080/cart/get/" + params.id)
            .then((response) => { setItems(response.data.items) })
            .catch(console.log())
            console.log( items);
    }
    useEffect(() => { getCartItems() }, [])
    // for(const item of items){

    }
   
    return (
        <div>


<form
            onSubmit={e => {

                e.preventDefault()

                axios.patch("http://localhost:8080/item/update/"+params.id, { itemName, itemPrice, itemQuantity, cart: params.id })

                    .then(response => {
                        setItemName("");
                        setItemPrice("");
                        setItemQuantity("");
                        // navigate("/cart")

                    })

                    .catch(err => console.error(err))

            }
            }
            >
                    <div label htmlFor="itemName" className="form-label">Item Name
                <input size="50"
                    id="itemName"
                    className="form-control border-3 border-primary rounded" style={{ width: "250px", height: "37px" }}
                    type="text"
                    // placeholder=""
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    
                />

            </div>

            <div label htmlFor="itemPrice" className="form-label">Item Price
                <input size="50"
                    id="itemPrice"
                    className="form-control border-3 border-primary rounded" style={{ width: "250px", height: "37px" }}
                    type="number"
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value)}
                    
                />
            </div>


            <div label htmlFor="itemQuantity" className="form-label">Item Quantity
                <input size="50"
                    id="itemQuantity"
                    className="form-control border-3 border-primary rounded" style={{ width: "250px", height: "37px" }}
                    type="number"
                    value={itemQuantity}
                    onChange={e => setItemQuantity(e.target.value)}
                    
                />

            </div>


            <button className="btn btn-primary" type="submit">Submit</button>

        </form >

        </div>
      );
}

export default UpdateCartItem ;
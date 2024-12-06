import {React , useState , useEffect} from 'react'
import '../../inventory/Inventory.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  //Hooks
  const [Product , setProduct] = useState(null);
  const [Loading ,setLoading] = useState(false);
  const {id } = useParams();
  const location = useLocation();
  const { platform_logo} = location.state||{};
  console.log("Product ID :",id);

  //Variables
  const back_icon = "../../../public/arrow-small-left.png";
  const navigate = useNavigate();
  const url = `https://dummyjson.com/products/${id}`;
  //Functions 
  const FetchSingleProduct = async () =>{
    setLoading(true);
    try{
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
      console.log("Product Data fetch :",data);
    }catch(error){
      console.log("Error in fetching product ", error);
    } finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(id){
      FetchSingleProduct();
    }
  },[id])

  if(!Product) return <div></div>
  if(Loading) return <div className='loader'></div>
  return ( 
    <>
          {/* Add Product Form */}
          <div
        className="main-add-product-back" style={{display:"block"}}
      >
        <div className="platform-logo-back">
          <img
            src={platform_logo}
            alt="platform icon image"
            className="platform-logo"
          />
          <img
            onClick={()=>navigate("/Navbar/Inventory")}
            src={back_icon}
            className="main-product-back-btn"
            alt="Back"
          />
        </div>
        <div className="add-product-form-back">
          <div className="add-product-heading">
            <h3>Update Product</h3>
          </div>
          <form className="add-product-form">
            <div className="add-product-form-half-back">
              <div className="add-product-form-half1">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  value={Product.title}
                  className="add-product-form-input"
                  placeholder="Enter product title"
                  required
                />
                <label htmlFor="description">Description</label>
                <textarea
                  value={Product.description}
                  name="body_html"
                  className="description"
                  placeholder="Enter product description"
                  required
                ></textarea>
                <label htmlFor="media">Media</label>
                <input name="media" type="file" className="add-product-image" />
              </div>
              <div className="add-product-form-half2">
                <label htmlFor="category">Category</label>
                <input
                value={Product.category}
                  name="category"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product category"
                  required
                />
                <label htmlFor="product_type">Brand</label>
                <input
                value={Product.brand}
                  name="product_type"
                  type="text"
                  className="add-product-form-input"
                  placeholder="Enter product type"
                  required
                />
                <label htmlFor="vendor">Vendor</label>
                <input
                  name="vendor"
                  type="text"
                  value="SellerPulse"
                  className="add-product-form-input"
                  placeholder="Enter product Vendor"
                  required
                />
                <label htmlFor="price">Price</label>
                <input
                  value={Product.price}
                  name="price"
                  type="number"
                  className="add-product-form-input"
                  placeholder="Enter product price"
                  required
                />
                <label htmlFor="sku">SKU (stock keeping unit)</label>
                <input
                  value={Product.stock}
                  name="sku"
                  type="number"
                  className="add-product-form-input"
                  placeholder="Enter product SKU"
                  required
                />
              </div>
            </div>
            <div className="add-product-form-btn-back">
              <button className="add-product-form-btn" type="submit">
                Update
              </button>
              <button className="add-product-form-btn" type="reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default UpdateProduct

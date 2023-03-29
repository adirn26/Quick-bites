import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Productdatatable"

const ProductList = () => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable/>
      </div>
    </div>
  )
}

export default ProductList
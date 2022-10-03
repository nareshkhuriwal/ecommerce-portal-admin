import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveProducts,
  findProductsByTitle,
  deleteAllProducts,
} from "../slices/products";
import { Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);

    this.state = {
      currentProduct: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    console.log("didmount", this.props.retrieveProducts())
    this.props.retrieveProducts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }

  setActiveProduct(Product, index) {
    this.setState({
      currentProduct: Product,
      currentIndex: index,
    });
  }

  removeAllProducts() {
    this.props
      .deleteAllProducts()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findProductsByTitle({ title: this.state.searchTitle });
  }

  render() {
    console.log("render", this.state)
    const { searchTitle, currentProduct, currentIndex } = this.state;
    console.log(this.props)
    const { Products } = this.props;

    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Products List</h4>
  
            <ul className="list-group">
              {Products &&
                Products.map((Product, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveProduct(Product, index)}
                    key={index}
                  >
                    {Product.title}
                  </li>
                ))}
            </ul>
  
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllProducts}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentProduct ? (
              <div>
                <h4>Product</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentProduct.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentProduct.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentProduct.published ? "Published" : "Pending"}
                </div>
  
                <Link
                  to={"/products/" + currentProduct.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Product...</p>
              </div>
            )}
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  console.log(state.Products)
  return {
    Products: state.products,
  };
};

export default connect(mapStateToProps, { retrieveProducts, findProductsByTitle, deleteAllProducts })(ProductsList);
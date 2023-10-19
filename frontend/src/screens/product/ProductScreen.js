import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Select from "../../components/Select";

/* Actions */
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";
import Search from "../../components/Search";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Message from "../../components/Message";

Modal.setAppElement("#root");

const ProductScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [errors, setErrors] = useState({});

  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = productCreate;

  useEffect(() => {
    if (createSuccess) {
      setName("");
      setPrice(0);
      setStock(0);
      setCategory(null);
      setImage(null);
      setModalIsOpen(false);
    }
    dispatch(listProducts(keyword, pageNumber, sortOrder));
  }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsCheck = {};

    if (!name) {
      errorsCheck.name = "Name is required";
    }
    if (!price) {
      errorsCheck.price = "Price is required";
    }

    if (!stock) {
      errorsCheck.stock = "Stock is required";
    }
    if (!category) {
      errorsCheck.category = "Category is required";
    }
    if (!image) {
      errorsCheck.image = "Image url is required";
    }

    if (Object.keys(errorsCheck).length > 0) {
      setErrors(errorsCheck);
    } else {
      setErrors({});
    }

    if (Object.keys(errorsCheck).length === 0) {
      const product = {
        name: name,
        price: price,
        stock: stock,
        categoryId: category,
        image: image,
      };

      dispatch(createProduct(product));
    }
  };

  const searchCategories = (e) => {
    dispatch(listCategories(e.target.value));
  };

  const renderCategoriesSelect = () => (
    <Select
      data={category}
      setData={setCategory}
      items={categories}
      search={searchCategories}
    />
  );

  const renderModalCreateProduct = () => (
    <>
      <ModalButton
        modal={modalIsOpen}
        setModal={setModalIsOpen}
        classes={"btn-success btn-lg mb-2"}
      />
      <Modal
        style={modalStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <LoaderHandler loading={createLoading} error={createError} />
        <h2>Create Form</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name={"name"}
            type={"text"}
            data={name}
            setData={setName}
            errors={errors}
          />
          <Input
            name={"price"}
            type={"number"}
            data={price}
            setData={setPrice}
            errors={errors}
          />
          <Input
            name={"stock"}
            type={"number"}
            data={stock}
            setData={setStock}
            errors={errors}
          />
          <Input
            name={"image"}
            type={"text"}
            data={image}
            setData={setImage}
            errors={errors}
            label="Image URL"
          />

          {renderCategoriesSelect()}
          {errors.category && (
            <Message message={errors.category} color={"warning"} />
          )}
          <hr />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <ModalButton
            modal={modalIsOpen}
            setModal={setModalIsOpen}
            classes={"btn-danger float-right"}
          />
        </form>
      </Modal>
    </>
  );
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const renderProductsTable = () => (
    <table className="table table-hover text-nowrap">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th className="d-none d-sm-table-cell">Created At</th>
          <th className="d-none d-sm-table-cell">Category</th>
          <th>Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td className="d-none d-sm-table-cell">
              {product.createdAt.slice(0, 10)}
            </td>
            <td className="d-none d-sm-table-cell">{product.category.name}</td>
            <td>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.image}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </td>
            <td>
              <Link
                to={`/product/${product.id}/edit`}
                className="btn btn-warning btn-lg"
              >
                Edit
              </Link>
              <button
                style={{ marginLeft: 10 }}
                className="btn btn-danger btn-lg"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    setPageNumber(1);

    dispatch(listProducts(keyword, 1, selectedSortOrder));
  };

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, sortOrder));
  }, [dispatch, history, userInfo, pageNumber, keyword, sortOrder]);

  return (
    <>
      <HeaderContent name={"Products"} />
      {/* Main content */}

      <section className="content">
        <div className="container-fluid">
          {renderModalCreateProduct()}

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Products table</h3>
                  <div className="card-tools">
                    <div>
                      <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                        setPage={setPageNumber}
                        setSortOrder={setSortOrder}
                        sortOrder={sortOrder}
                        handleSortChange={handleSortChange}
                      />

                      <select
                        onChange={handleSortChange}
                        className="form-control"
                        style={{ width: "auto" }}
                        value={sortOrder}
                      >
                        <option value="alphabetical">
                          Sort by Alphabetical(ASC)
                        </option>
                        <option value="alphabeticalDesc">
                          Sort by Alphabetical(DESC)
                        </option>
                        <option value="price">Sort by Price (ASC)</option>
                        <option value="priceDesc">Sort by Price (DESC)</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                  <LoaderHandler
                    loading={loading}
                    error={error}
                    loader={<DataTableLoader />}
                    render={renderProductsTable}
                  />
                </div>
                {/* /.card-body */}
              </div>
              <Pagination page={page} pages={pages} setPage={setPageNumber} />
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </>
  );
};

export default ProductScreen;

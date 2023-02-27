import {useEffect, useState} from "react";
import ProductsTable from "../components/ProductsTable.jsx";

const products = [
  {
    productId: 1,
    productName: 'Manzana',
    productCategory: 'Fruta',
    expirationDate: '12-12-2032',
    stock: 12
  },
  {
    productId: 2,
    productName: 'Pera',
    productCategory: 'Fruta',
    expirationDate: '12-02-2032',
    stock: 12
  },
  {
    productId: 3,
    productName: 'Apio',
    productCategory: 'Verdura',
    expirationDate: '12-12-2023',
    stock: 12
  },
  {
    productId: 4,
    productName: 'Palta',
    productCategory: 'Fruta',
    expirationDate: '12-05-2023',
    stock: 12
  },
];

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productEditedData, setProductEditedData] = useState({
    productId: '',
    productName: '',
    productCategory: '',
    expirationDate: '',
    stock: '',
  });

  const fetchProducts = () => {
    setProductsList([...products.map(item => ({...item}))]);
  }

  const fetchRemoveProduct = (productId) => {
    console.log('se removio el producto', productId);
  }

  const fetchSaveNewData = () => {
    console.log(`Salvando información nueva de ${productToEdit}`);
  }

  const editProduct = (productId, attribute, value) => {
    setProductEditedData({
      ...productEditedData,
      [attribute]: value
    });
  };

  const selectProductToEdit = (productId => {
    setProductEditedData({
      ...productsList.filter(item => item.productId === productId)[0]
    });
    setProductToEdit(productId);
  });

  const cancelEdition = () => {
    setProductToEdit(null);
    setProductEditedData({
      productId: '',
      productName: '',
      productCategory: '',
      expirationDate: '',
      stock: '',
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h2 className='text-center mb-4'>Productos</h2>
      <ProductsTable items={productsList} onEditMode={editProduct} editMode={productToEdit}
                     onEditClick={selectProductToEdit} valuesToEdit={productEditedData}
                     cancelEdition={cancelEdition} fetchRemoveProduct={fetchRemoveProduct}
                     fetchSaveNewData={fetchSaveNewData}/>
    </>
  );
};

export default Products;

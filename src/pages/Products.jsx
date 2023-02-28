import {useEffect, useState} from "react";
import ProductsTable from "../components/ProductsTable.jsx";
import ModalButton from "../components/ModalButton.jsx";
import ModalContainer from "../components/ModalContainer.jsx";
import FormNewProduct from "../components/FormNewProduct.jsx";

import axios from "axios";
import swal from "sweetalert";

import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  extraHeaders: {
    channel: 'product'
  }
});

const Products = () => {
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const [productsList, setProductsList] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productEditedData, setProductEditedData] = useState({
    productId: '',
    productName: '',
    productCategory: '',
    expirationDate: '',
    stock: '',
  });
  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: '',
    expirationDate: '',
    stock: '',
  });

  const fetchProducts = async () => {
    try {
      const products = await axios.get('http://localhost:3000/api/product/');
      setProductsList([...products.data.body]);
    } catch (e) {
      return swal({
        title: 'No se pudo obtener los productos',
        icon: 'warning'
      });
    }
  }

  const fetchRemoveProduct = (productId) => {
    console.log('se removio el producto', productId);
  }

  const fetchSaveNewProduct = async () => {
    try {
      const productObj = {
        ...newProduct,
        expirationDate: new Date(newProduct.expirationDate).toISOString(),
        stock: parseInt(newProduct.stock)
      };

      return await axios.post('http://localhost:3000/api/product/', productObj);
    } catch (e) {
      return null;
    }
  }

  const fetchUpdateProductData = () => {
    console.log('Salvando nuevos datos de producto editado');
  };

  const onSubmitNewProduct = async () => {
    const newProductJson = await fetchSaveNewProduct();

    if (!newProductJson){
      return swal({
        title: 'No se pudo registrar nuevo producto',
        icon: 'warning'
      });
    }

    return swal({
      title: 'Nuevo producto creado',
      icon: 'success'
    });
  };

  const editProduct = (productId, attribute, value) => {
    setProductEditedData({
      ...productEditedData,
      [attribute]: value
    });
  };

  const onCreateNewProduct = (evt) => {
    const {name, value} = evt.target;
    setNewProduct({
      ...newProduct,
      [name]: value
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

  useEffect(() => {
    socket.on('connect', () => {
      setSocketIsConnected(true);
    });

    socket.on('disconnect', () => {
      setSocketIsConnected(false);
    });

    socket.on('product', (data) => {
      fetchProducts();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('client');
    };
  }, []);

  return (
    <>
      <h2 className='text-center mb-4'>Productos</h2>
      <ModalButton label='Crear Producto' modalId='createProduct' classList='btn-primary' />
      <ProductsTable items={productsList} onEditMode={editProduct} editMode={productToEdit}
                     onEditClick={selectProductToEdit} valuesToEdit={productEditedData}
                     cancelEdition={cancelEdition} fetchRemoveProduct={fetchRemoveProduct}
                     fetchSaveNewData={fetchUpdateProductData}/>

      <ModalContainer modalId='createProduct' title='Crear nuevo Producto' onSubmit={onSubmitNewProduct} >
        <FormNewProduct onChange={onCreateNewProduct} values={newProduct} />
      </ModalContainer>
    </>
  );
};

export default Products;

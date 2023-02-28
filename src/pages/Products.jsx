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
    category: '',
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

  const fetchRemoveProduct = async (productId) => {
    try {
      const productDeleted = await axios.delete(`http://localhost:3000/api/product/${productId}`);
      if (productDeleted){
        return swal({
          title: 'Producto eliminado con éxito',
          icon: 'success'
        });
      }
    } catch (e) {
      return swal({
        title: 'No se pudo obtener los productos',
        icon: 'warning'
      });
    }
    console.log('se removio el producto', productEditedData);
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

  const fetchUpdateProductData = async () => {
    try {
      const newData = {
        ...productEditedData,
        stock: parseInt(productEditedData.stock)
      };

      return await axios.patch('http://localhost:3000/api/product/', newData);
    } catch (e) {
      return null;
    }
  };

  const onUpdateProductData = async () => {
    const updated = await fetchUpdateProductData();
    if (!updated) {
      return swal({
        title: 'No se pudo guardar los nuevos datos del producto',
        icon: 'warning'
      });
    }
    cancelEdition();
  }

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

  const onRemove = (productId) => {
    swal({
      title: 'Borrar Producto',
      text: `¿Desea borrar el Producto con ID <${productId}>?`,
      icon: 'warning',
      buttons: ['No', 'Si']
    })
      .then(answer => {
        if (answer) {
          fetchRemoveProduct(productId)
          swal({
            text: 'Producto borrado con éxito'
          });
        }
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
                     fetchSaveNewData={onUpdateProductData} onRemove={onRemove}/>

      <ModalContainer modalId='createProduct' title='Crear nuevo Producto' onSubmit={onSubmitNewProduct} >
        <FormNewProduct onChange={onCreateNewProduct} values={newProduct} />
      </ModalContainer>
    </>
  );
};

export default Products;

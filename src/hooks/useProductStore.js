import { useDispatch, useSelector } from "react-redux";
import {
  onLoadProducts,
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
  onSetActiveProduct,
} from "../store/productSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useProductStore = () => {
    const { products, activeProduct } = useSelector((state) => state.product)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const setActiveProduct = (product) => {
        dispatch(onSetActiveProduct(product))
    }

    const startSavingProduct = async(product) => {
        // console.log(product)
        try {
            if(product.id){
                console.log('Voy a actualizar')
                // console.log(product)
                await roApi.put(`/api/products/${product.id}`, product)
                dispatch(onUpdateProduct(product))
                return
            }
            console.log('voy a crear')
            // console.log(product)
            const {data} = await roApi.post(`/api/products/`, product)
            dispatch(onAddNewProduct({...product, id:data.event.id, user}))
        } catch (error) {
            console.log(error)
            Swal.fire('Error at saving ', error.response.data.msg, 'error')
        }
    }

    const startDeletingProduct = async() => {
        try {
            await roApi.delete(`api/products/${activeProduct.id}`)
            dispatch(onDeleteProduct())
        } catch (error) {
            console.log(error)
            Swal.fire('Error at dating ', error.response.data.msg, 'error')
        }
    }

    const startLoadingProducts = async() => {
        try {
            const {data} = await roApi.get('/api/products')
            // console.dir(data)
            dispatch(onLoadProducts(data.products))
        } catch (error) {
            console.log('Error loading products')
            console.log(error)
        }
    }

    return{
        // PROPERTIES
        activeProduct,
        products,
        hasProductSelected: !!activeProduct,

        // METHODS
        setActiveProduct,
        startLoadingProducts,
        startSavingProduct,
        startDeletingProduct,
    }
}
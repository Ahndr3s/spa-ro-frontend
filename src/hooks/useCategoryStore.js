import { useDispatch, useSelector } from "react-redux";
import {
  onLoadCategories,
  onAddNewCategory,
  onUpdateCategory,
  onDeleteCategory,
  onSetActiveCategory,
} from "../store/categorySlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useCategoryStore = () => {
    const { categories, activeCategory } = useSelector((state) => state.category)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const setActiveCategory = (category) => {
        dispatch(onSetActiveCategory(category))
    }

    const startSavingCategory = async(category) => {
        // console.log(category)
        try {
            if(category.id){
                console.log('voy a actualizar una categoria')
                await roApi.put(`/api/categories/${category.id}`, category)
                dispatch(onUpdateCategory(category))
                return
            }
            console.log('voy a crear una categoria')
            const {data} = await roApi.post(`/api/categories/`, category)
            dispatch(onAddNewCategory({...category, id:data.id, user}))
            // console.log(banner)
        } catch (error) {
            console.log(error)
            Swal.fire('Error at saving ', error.response.data.msg, 'error')
        }
    }

    const startDeletingCategory = async() => {
        try {
            await roApi.delete(`api/categories/${activeCategory.id}`)
            dispatch(onDeleteCategory())
        } catch (error) {
            console.log(error)
            Swal.fire('Error at dating ', error.response.data.msg, 'error')
        }
    }

    const startLoadingCategories = async() => {
        try {
            const {data} = await roApi.get('/api/categories')
            // console.dir(data)
            dispatch(onLoadCategories(data.categories))
        } catch (error) {
            console.log('Error loading banners')
            console.log(error)
        }
    }

    return{
        // PROPERTIES
        activeCategory,
        categories,
        hasCategorySelected: !!activeCategory,

        // METHODS
        setActiveCategory,
        startLoadingCategories,
        startSavingCategory,
        startDeletingCategory,
    }
}
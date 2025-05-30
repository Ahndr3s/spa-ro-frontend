import { useDispatch, useSelector } from "react-redux";
import {
  onLoadBanners,
  onAddNewBanner,
  onUpdateBanner,
  onDeleteBanner,
  onSetActiveBanner,
} from "../store/bannerSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useBannerStore = () => {
    const { banners, activeBanner } = useSelector((state) => state.banner)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const setActiveBanner = (banner) => {
        dispatch(onSetActiveBanner(banner))
    }

    const startSavingBanner = async(banner) => {
        try {
            if(banner.id){
                console.log('Voy a actualizar')
                await roApi.put(`/api/banners/${banner.id}`, banner)
                dispatch(onUpdateBanner(banner))
                return
            }
            console.log('Voy a crear')
            // console.log(banner)
            const {data} = await roApi.post(`/api/banners/`, banner)
            dispatch(onAddNewBanner({...banner, id:data.event.id, user}))
        } catch (error) {
            console.log(error)
            Swal.fire('Error at saving ', error.response.data.msg, 'error')
        }
    }

    const startDeletingBanner = async() => {
        try {
            await roApi.delete(`api/banners/${activeBanner.id}`)
            dispatch(onDeleteBanner())
        } catch (error) {
            console.log(error)
            Swal.fire('Error at dating ', error.response.data.msg, 'error')
        }
    }

    const startLoadingBanners = async() => {
        try {
            const {data} = await roApi.get('/api/banners')
            // console.dir(data)
            dispatch(onLoadBanners(data.banners))
        } catch (error) {
            console.log('Error loading banners')
            console.log(error)
        }
    }

    return{
        // PROPERTIES
        activeBanner,
        banners,
        hasBannerSelected: !!activeBanner,

        // METHODS
        setActiveBanner,
        startLoadingBanners,
        startSavingBanner,
        startDeletingBanner,
    }
}
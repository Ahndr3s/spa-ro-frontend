import { useDispatch, useSelector } from "react-redux";
import {
  onLoadCostumes,
  onAddNewCostume,
  onUpdateCostume,
  onSetActiveCostume,
  onDeleteCostume,
} from "../store/costumeSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useCostumeStore = () => {
    const { costumes, activeCostume } = useSelector((state) => state.costume)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const setActiveCostume = (costume) => {
        dispatch(onSetActiveCostume(costume))
    }

    const startSavingCostume = async(costume) => {
        try {
            if(costume.id){
                await roApi.put(`api/costumes/${costume.id}`, costume)
                dispatch(onUpdateCostume(costume))
                return
            }
            const {data} = await roApi.post(`api/costumes`, costume)
            dispatch(onAddNewCostume({...costume, id:data.event.id, user}))
        } catch (error) {
            console.log(error)
            Swal.fire('Error at saving ', error.response.data.msg, 'error')
        }
    }

    const startDeletingCostume = async() => {
        try {
            await roApi.delete(`api/costumes/${activeCostume.id}`)
            dispatch(onDeleteCostume())
        } catch (error) {
            console.log(error)
            Swal.fire('Error at dating ', error.response.data.msg, 'error')
        }
    }

    const startLoadingCostumes = async() => {
        try {
            const {data} = await roApi.get('/api/costumes')
            // console.dir(data)
            dispatch(onLoadCostumes(data.costumes))
        } catch (error) {
            console.log('Error loading costumes')
            console.log(error)
        }
    }

    return{
        // PROPERTIES
        activeCostume,
        costumes,
        hasCostumeSelected: !!activeCostume,

        // METHODS
        setActiveCostume,
        startLoadingCostumes,
        startSavingCostume,
        startDeletingCostume,
    }
}
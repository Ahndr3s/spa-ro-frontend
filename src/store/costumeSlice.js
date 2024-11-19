import { createSlice } from "@reduxjs/toolkit";

export const costumeSlice = createSlice({
  name: "costume",
  initialState: {
    isLoadingCostumes: true,
    costumes: [],
    activeCostume: null,
  },
  reducers: {
    onSetActiveCostume: (state, { payload }) => {
      state.activeCostume = payload;
    },
    onAddNewCostume: (state, { payload }) => {
      state.costumes.push(payload);
      state.activeCostume = null;
    },
    onUpdateCostume: (state, { payload }) => {
      state.costumes = state.costumes.map((costume) => {
        if (costume.id === payload.id) {
          return payload;
        }
        return costume;
      });
    },
    onUpdateCostumeSize: (state, { payload }) => {
      if (state.activeCostume) {
        state.activeCostume = {
          ...state.activeCostume,
          size: payload,
        };
      }
    },    
    onDeleteCostume: (state) => {
      if (state.activeCostume) {
        state.costumes = state.costumes.filter(
          (costume) => costume.id !== state.activeCostume.id
        );
        // console.log(state.courses[0])
        state.activeCostume = null;
      }
    },
    onLoadCostumes: (state, {payload = []}) => {
      // state.activeCourse = null;
      state.isLoadingCostumes = false
      payload.forEach(costume => {
        const exists = state.costumes.some(dbCostume => dbCostume.id === costume.id)
        if(!exists){
          state.costumes.push(costume)
        }
      });
    },
    onLogoutCostumes: (state) => {
        state.isLoadingCostumes = true,
        state.costumes = [],
        state.activeCostume = null
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveCostume,
  onAddNewCostume,
  onUpdateCostume,
  onUpdateCostumeSize,
  onDeleteCostume,
  onLoadCostumes,
  onLogoutCostumes,
} = costumeSlice.actions;

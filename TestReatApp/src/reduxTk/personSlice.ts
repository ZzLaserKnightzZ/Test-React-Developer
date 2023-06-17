import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store/store";
import { json } from "react-router-dom";

export interface IPerson {
  id: string;
  isSelected: boolean;
  isShowing: boolean;

  prefix: string;
  name: string;
  lasName: string;
  dateOfbirth: string;
  nationality: string;
  identityCard: string;
  gender: string;
  prefexCellPhone: string;
  cellPhone: string;
  passPort: string;
  saralyExpect: string;
}

interface Personstate {
  persons: IPerson[];
}

const loadData = () => {
  const data = localStorage.getItem("table");
  if (data) {
    return JSON.parse(data) as IPerson[];
  }
  return [];
};

const initialState: Personstate = {
  persons: loadData(),
};

export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<IPerson>) => {
      state.persons.push(action.payload);
    },
    deletePerson: (state, action: PayloadAction<{ id: string }>) => {
      state.persons = state.persons.filter((x) => x.id !== action.payload.id);
    },
    editPerson: (state, action: PayloadAction<IPerson>) => {
      const id = action.payload.id;
      const person = state.persons.find((x) => x.id === id);

      //assign value
      if (person) {
        const newPersonValue = action.payload;
        //update
        state.persons = state.persons.map((x) =>
          x.id === id ? { ...newPersonValue } : { ...x }
        );
      }
    },
    selectPerson: (state, action: PayloadAction<{ id: string }>) => {
      state.persons = state.persons.map((x) =>
        x.id === action.payload.id
          ? { ...x, isSelected: !x.isSelected }
          : { ...x, isSelected: x.isSelected }
      );
    },
    selectAllPerson: (state, action: PayloadAction<{ isSelect: boolean }>) => {
      if (action.payload.isSelect) {
        state.persons = state.persons.map((x) => {
          return { ...x, isSelected: true };
        });
      } else {
        state.persons = state.persons.map((x) => {
          return { ...x, isSelected: false };
        });
      }
    },
    pagination: (
      state,
      action: PayloadAction<{ indexStart: number; indexStop: number }>
    ) => {
      if (
        action.payload.indexStart >= 0 &&
        action.payload.indexStop <= state.persons.length
      ) {
        state.persons = state.persons.map((x, i) => {
          if (i >= action.payload.indexStart && i <= action.payload.indexStop) {
            return { ...x, isShowing: true };
          } else {
            return { ...x, isShowing: false };
          }
        });
      }
    },
    deleteSelectedPerson: (state, action) => {
      state.persons = state.persons.filter((x) => x.isSelected !== true);
    },
    isEditing: (state, action: PayloadAction<{ id: string }>) => {
      state.persons = state.persons.map((x) =>
        x.id === action.payload.id
          ? { ...x, isEditing: !x.isSelected }
          : { ...x, isEditing: false }
      );
    },
    saveState: (state, action) => {
      localStorage.setItem("table", JSON.stringify(state.persons));
    },
    sortByName: (state, action: PayloadAction<{ upDown: boolean }>) => {
      //select inex
      const isShowingPersons = state.persons.filter(
        (x) => x.isShowing === true
      );

      if (isShowingPersons.length === 0) return;

      const startIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[0].id
      );

      const stopIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[isShowingPersons.length - 1].id
      );

      if (action.payload.upDown) {
        //sort
        isShowingPersons.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        //sort
        isShowingPersons.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      }

      let index = 0;
      state.persons = state.persons.map((x, i) => {
        if (i >= startIndex && i <= stopIndex) {
          return { ...isShowingPersons[index++] };
        } else {
          return { ...x };
        }
      });
    },
    sortByGender: (state, action: PayloadAction<{ upDown: boolean }>) => {
      //select inex
      const isShowingPersons = state.persons.filter(
        (x) => x.isShowing === true
      );

      if (isShowingPersons.length === 0) return;

      const startIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[0].id
      );

      const stopIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[isShowingPersons.length - 1].id
      );

      if (action.payload.upDown) {
        //sort
        isShowingPersons.sort((a, b) => {
          const A = a.gender.toUpperCase();
          const B = b.gender.toUpperCase();
          if (A < B) {
            return 1;
          }
          if (A > B) {
            return -1;
          }
          return 0;
        });
      } else {
        //sort
        isShowingPersons.sort((a, b) => {
          const A = a.gender.toUpperCase();
          const B = b.gender.toUpperCase();
          if (A < B) {
            return -1;
          }
          if (A > B) {
            return 1;
          }
          return 0;
        });
      }
      let index = 0;

      state.persons = state.persons.map((x, i) => {
        if (i >= startIndex && i <= stopIndex) {
          return { ...isShowingPersons[index++] };
        } else {
          return { ...x };
        }
      });
    },
    sortByPhoneNumber: (state, action: PayloadAction<{ upDown: boolean }>) => {
      //select inex
      const isShowingPersons = state.persons.filter(
        (x) => x.isShowing === true
      );

      if (isShowingPersons.length === 0) return;

      const startIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[0].id
      );

      const stopIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[isShowingPersons.length - 1].id
      );

      if (action.payload.upDown) {
        //sort
        isShowingPersons.sort((a, b) => {
          const A = a.cellPhone.toUpperCase();
          const B = b.cellPhone.toUpperCase();
          if (A < B) {
            return 1;
          }
          if (A > B) {
            return -1;
          }
          return 0;
        });
      } else {
        //sort
        isShowingPersons.sort((a, b) => {
          const A = a.cellPhone.toUpperCase();
          const B = b.cellPhone.toUpperCase();
          if (A < B) {
            return -1;
          }
          if (A > B) {
            return 1;
          }
          return 0;
        });
      }
      let index = 0;

      state.persons = state.persons.map((x, i) => {
        if (i >= startIndex && i <= stopIndex) {
          return { ...isShowingPersons[index++] };
        } else {
          return { ...x };
        }
      });
    },
    sortByNationality: (state, action: PayloadAction<{ upDown: boolean }>) => {
      //select inex
      const isShowingPersons = state.persons.filter(
        (x) => x.isShowing === true
      );

      if (isShowingPersons.length === 0) return;

      const startIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[0].id
      );

      const stopIndex = state.persons.findIndex(
        (x) => x.id === isShowingPersons[isShowingPersons.length - 1].id
      );

      if (action.payload.upDown) {
        //sort
        isShowingPersons.sort((a, b) => {
          const A = a.nationality.toUpperCase();
          const B = b.nationality.toUpperCase();
          if (A < B) {
            return 1;
          }
          if (A > B) {
            return -1;
          }
          return 0;
        });
      } else {
        //sort
        isShowingPersons.sort((a, b) => {
          const A = a.nationality.toUpperCase();
          const B = b.nationality.toUpperCase();
          if (A < B) {
            return -1;
          }
          if (A > B) {
            return 1;
          }
          return 0;
        });
      }
      let index = 0;

      state.persons = state.persons.map((x, i) => {
        if (i >= startIndex && i <= stopIndex) {
          return { ...isShowingPersons[index++] };
        } else {
          return { ...x };
        }
      });
    },
  },
});

export const {
  addPerson,
  selectPerson,
  selectAllPerson,
  deletePerson,
  editPerson,
  saveState,
  isEditing,
  deleteSelectedPerson,
  sortByName,
  sortByGender,
  sortByNationality,
  sortByPhoneNumber,
  pagination,
} = PersonSlice.actions;
export const personSelecter = (store: RootState) => store.person.persons;

export default PersonSlice.reducer;

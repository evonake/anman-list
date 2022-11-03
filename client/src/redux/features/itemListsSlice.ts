import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TypeError from '../../types/error';
import type {
  TypeItem,
  TypeDBItem,
  TypeItemList,
  TypeDBItemList,
} from '../../types/item';
import type { ReduxSliceBase, MyCreateAsyncThunkOptions } from '../../types/redux';

import {
  handleItemListGet,
  handleItemListAdd,
  handleItemListUpdate,
  handleItemListDelete,
} from '../../api/handlers/itemListHandlers';
import {
  handleItemGet,
  handleItemAdd,
  handleItemUpdate,
  handleItemDelete,
} from '../../api/handlers/itemHandlers';

type ReduxTypeItemsList = ReduxSliceBase & {
  itemLists: TypeDBItemList[],
};

const initialError: TypeError = {
  type: '',
  message: '',
};
const initialState: ReduxTypeItemsList = {
  itemLists: [],
  error: initialError,
  reqStatus: 'idle',
};

export const itemListGetThunk = createAsyncThunk<any, string, MyCreateAsyncThunkOptions>(
  'itemLists/get',
  async (itemListId: string, { rejectWithValue }) => {
    const data = await handleItemListGet(itemListId);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const itemListAddThunk = createAsyncThunk<any, TypeItemList, MyCreateAsyncThunkOptions>(
  'itemLists/add',
  async (itemList: TypeItemList, { rejectWithValue }) => {
    const data = await handleItemListAdd(itemList);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const itemListUpdateThunk = createAsyncThunk<any, TypeDBItemList, MyCreateAsyncThunkOptions>(
  'itemLists/update',
  async (itemList: TypeDBItemList, { rejectWithValue }) => {
    const data = await handleItemListUpdate(itemList);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const itemListDeleteThunk = createAsyncThunk<any, string, MyCreateAsyncThunkOptions>(
  'itemLists/delete',
  async (itemListId: string, { rejectWithValue }) => {
    const data = await handleItemListDelete(itemListId);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);
export const itemGetThunk = createAsyncThunk<any, void, MyCreateAsyncThunkOptions>(
  'items/get',
  async (_, { rejectWithValue }) => {
    const data = await handleItemGet();

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const itemAddThunk = createAsyncThunk<any, TypeItem, MyCreateAsyncThunkOptions>(
  'items/add',
  async (item, { rejectWithValue }) => {
    const data = await handleItemAdd(item);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const itemUpdateThunk = createAsyncThunk<any, TypeDBItem, MyCreateAsyncThunkOptions>(
  'items/update',
  async (item, { rejectWithValue }) => {
    const data = await handleItemUpdate(item);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

type ItemDeleteThunk = {
  itemId: string,
  listId: string,
};
export const itemDeleteThunk = createAsyncThunk<any, ItemDeleteThunk, MyCreateAsyncThunkOptions>(
  'items/delete',
  async ({ itemId, listId }, { rejectWithValue }) => {
    const data = await handleItemDelete(itemId, listId);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

const replaceOldList = (itemLists: TypeDBItemList[], newList: TypeDBItemList) => {
  const oldIndex = itemLists.findIndex((iL) => iL._id === newList._id);
  itemLists[oldIndex] = newList;
};

export const itemsListSlice = createSlice({
  name: 'itemLists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(itemListGetThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemListGetThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemListGetThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemListAddThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemListAddThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemListAddThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemListUpdateThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemListUpdateThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemListUpdateThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemListDeleteThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemListDeleteThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemListDeleteThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemGetThunk.fulfilled, (state, action) => {
        state.itemLists = action.payload.itemLists;
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemGetThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemGetThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemAddThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemAddThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemAddThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemUpdateThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemUpdateThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemUpdateThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(itemDeleteThunk.fulfilled, (state, action) => {
        replaceOldList(state.itemLists, action.payload.itemList);
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(itemDeleteThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(itemDeleteThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      });
  },
});

export const selectItemsLists = (state: RootState) => state.itemLists.itemLists;
export const selectItemsListsError = (state: RootState) => state.itemLists.error;
export const selectItemsListsReqStatus = (state: RootState) => state.itemLists.reqStatus;

export default itemsListSlice.reducer;

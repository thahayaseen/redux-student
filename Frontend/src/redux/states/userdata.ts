import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { reduxudata } from '../../interface/user';

interface State {
    userdata: reduxudata;
    isloading: boolean;
}

interface UserPayload {
    udata: {
        name: string;
        email: string;
        role: string;
    };
    id: string;
}

const initialState: State = {
    userdata: {
        name: "",
        email: "",
        role: "",
        token: "",
        image: "",
    },
    isloading: false,
};

// Fetch user data
export const fetchdata = createAsyncThunk("refetch", async (_, { rejectWithValue }) => {
    try {
        const id = localStorage.getItem('accs');
        if (!id) {
            throw new Error("Authorization token is missing");
        }

        const response = await axios.get('http://localhost:4050/getudata', {
            headers: {
                Authorization: `Bearer ${id}`,
            },
        });

        return response.data.udata;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Upload image
export const addimg = createAsyncThunk("uploadimage", async (file: File, { rejectWithValue }) => {
    try {
        if (!file.type.startsWith('image/')) {
            throw new Error("Invalid file type. Only images are allowed.");
        }

        const formData = new FormData();
        formData.append('profile', file);

        const response = await axios.post('http://localhost:4050/upimage', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('accs')}`,
            },
        });

        return response.data.image;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice
const slices = createSlice({
    name: "userdata",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<UserPayload>) => {
            console.log(state.userdata);
            
            state.userdata.email = action.payload.udata.email;
            state.userdata.name = action.payload.udata.name;
            state.userdata.token = action.payload.id;
            state.userdata.role = action.payload.udata.role;
        },
        removestate: (state) => {
            state.userdata = {
                name: "",
                email: "",
                role: "",
                token: "",
                image: "",
            };
            state.isloading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchdata.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchdata.fulfilled, (state, action) => {
                state.isloading = false;
                state.userdata = { ...state.userdata, ...action.payload };
            })
            .addCase(fetchdata.rejected, (state, action) => {
                state.isloading = false;
                console.error("Error fetching data:", action.payload);
            })
            .addCase(addimg.pending, (state) => {
                state.isloading = true;
            })
            .addCase(addimg.fulfilled, (state, action) => {
                state.isloading = false;
                state.userdata.image = action.payload;
            })
            .addCase(addimg.rejected, (state, action) => {
                state.isloading = false;
                console.error("Error uploading image:", action.payload);
            });
    },
});

export const { setData, removestate } = slices.actions;
export default slices.reducer;

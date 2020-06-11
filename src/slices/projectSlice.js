import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {ProjectAPI} from '../services/db/models/projectAPI';

const projectAPI = new ProjectAPI();

export const projectGetById = createAsyncThunk(
    'project/projectGetById',
    async (project_id, thunkAPI) => {
        const project = await projectAPI.get(project_id)
        return project
    }
)


export const loadSelectedProject = createAsyncThunk(
    'project/loadSelectedProject',
    async ( thunkAPI) => {
        const project = await projectAPI.getActive();        
        if(!project){
            throw "No active project";
        }
        return project;
    }
)

export const loadActiveProjects = createAsyncThunk(
    'project/loadActiveProjects',
    async ( thunkAPI) => {
        const project_list = await projectAPI.listActive();        
        const projects = await project_list.toArray();
        
        return projects;
    }
)

export const setActiveProject = createAsyncThunk(
    'project/setActiveProject',
    async ( payload,thunkAPI) => {

        const active_project = await projectAPI.setActiveProject(payload.project).catch((e)=>{
            console.log(e);
        });
        
        return active_project;
    }
)

export const newProject = createAsyncThunk(
    'project/newProject',
    async ( payload,thunkAPI) => {

        const new_project = await projectAPI.new(payload.project);
        
        return new_project;
    }
)

export const addContainer = createAsyncThunk(
    'project/addContainer',
    async ( payload,thunkAPI) => {

        const updated_project = projectAPI.addContainer(payload.project,payload.container);
        await projectAPI.save(updated_project);
        return updated_project;
    }
)

export const removeContainer = createAsyncThunk(
    'project/removeContainer',
    async ( payload,thunkAPI) => {

        const updated_project = projectAPI.removeContainer(payload.project,payload.container_uuid_to_remove);
        await projectAPI.save(updated_project);
        return updated_project;
    }
)

export const updateContainer = createAsyncThunk(
    'project/removeContainer',
    async ( payload,thunkAPI) => {

        const updated_project = projectAPI.updateContainer(payload.project,payload.container_to_update);
        await projectAPI.save(updated_project);
        return updated_project;
    }
)

export const addItem = createAsyncThunk(
    'project/addItem',
    async ( payload,thunkAPI) => {

        const updated_project = projectAPI.addItem(payload.project,payload.container_uuid,payload.new_item);
        await projectAPI.save(updated_project);
        return updated_project;
    }
)

export const updateItem = createAsyncThunk(
    'project/updateItem',
    async ( payload,thunkAPI) => {

        const updated_project = projectAPI.updateItem(payload.project,payload.item_to_update);
        await projectAPI.save(updated_project);
        return updated_project;
    }
)

export const removeItem = createAsyncThunk(
    'project/removeItem',
    async ( payload,thunkAPI) => {

        const updated_project = projectAPI.removeItem(payload.project,payload.item_uuid);
        await projectAPI.save(updated_project);
        return updated_project;
    }
)


export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        project: {},
        projects: []
    },
    reducers: {        
        setProject: (state, action) => {
                                    
            state.project = action.payload;
        }
    },
    extraReducers: {
      // Add reducers for additional action types here, and handle loading state as needed
      [projectGetById.fulfilled]: (state, action) => {
        // Add user to the state array
        state.project = action.payload;
      },
      [loadActiveProjects.fulfilled]: (state, action) => {
        // Add user to the state array
        state.projects = action.payload;
      },
      [setActiveProject.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [newProject.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [addContainer.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [removeContainer.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [updateContainer.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [addItem.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [updateItem.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [removeItem.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      [loadSelectedProject.fulfilled]:(state,action)=>{
        state.project = action.payload;
      },
      
    }

});

export const {
    setProject
} = projectSlice.actions;


export const getProject = state => state.project.project;
export const getProjects = state => state.project.projects;

export default projectSlice.reducer;


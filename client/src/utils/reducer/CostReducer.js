import Types from '../actions/Types';

export const costInitState = [];

const CostReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_ALL_DATA:
            return [...action.payload];//return an array
        case Types.ADD_DATA:
            return [action.payload, ...state];//return array
        case Types.UPDATE_DATA:
            //let objIndex = state.findIndex((obj => obj.id == action.payload.id));
            //state[objIndex] = action.payload;
            state = state.map(itm => {
                if (itm.id === action.payload.id)
                    return action.payload;
                else
                    return itm;
            });
            return state;
        default:
            return state;
    }
}
export default CostReducer;


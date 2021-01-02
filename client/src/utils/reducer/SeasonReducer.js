import Types from './../actions/Types';

export const season_init_state = []
/**
 * 
 * @param {[season{
 *      id,title,start,end,active=1,0
 * }]} state 
 */
const SeasonReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_ALL_DATA:
            return [...action.payload];//return an array
        case Types.ADD_SEASON:
            return [...state, action.payload];//return [], payload {}
        case Types.CLEAR_SEASON:
            return [];//after logout
        case Types.SWITCH_SEASON:
            const arr = state.map(itm => {
                if (itm.active === 1) {
                    //update the active to zero
                    itm.active = 0;
                    return itm;
                } else if (itm.id === action.payload) {
                    //update the new itm to active to one
                    itm.active = 1;
                    return itm;
                } else {
                    return itm;
                }
            })
            return [...arr];//
        default:
            return state;
    }
}
export default SeasonReducer;
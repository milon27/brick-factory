import axios from 'axios';
import Types from './Types';
import Define from 'utils/helpers/Define';
import Utils from 'utils/helpers/Utils';

/**
 * it is an object
 */
const SeasonAction = {
    dispatch: null,
    source: null,
    getInstance: (dispatch) => {
        SeasonAction.dispatch = dispatch;
        return SeasonAction;
    },
    getSource: () => {
        SeasonAction.source = axios.CancelToken.source();
        return SeasonAction.source;
    },
    //getall season
    getAllSeason: async (table) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/get/${table}/`
                , {
                    cancelToken: SeasonAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                //console.log("milon= ", res);
                if (res.status === 200) {
                    const data = res.data.response;
                    //dispatch the global state
                    SeasonAction.dispatch({
                        type: Types.GET_ALL_DATA,
                        payload: data//an array
                    });
                    resolve({ message, data });
                } else {
                    reject({ message });
                }
            })
                .catch(e => {
                    if (axios.isCancel(e)) {
                        reject({ message: "canceled the request" });
                    } else {
                        reject(e);
                    }
                });
        });
    },
    //add season
    addSeason: (url, newdata) => {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem(Define.USERINFO_LOCAL));

            axios.post(url, newdata, {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`
                },
            }).then((res) => {
                if (res.status === 200) {
                    const season_obj = res.data.response.new_object
                    //save into offline
                    localStorage.setItem(Define.SEASONINFO_LOCAL, JSON.stringify(season_obj));
                    //dispatch the global state
                    SeasonAction.dispatch({
                        type: Types.ADD_SEASON,
                        payload: season_obj//an object
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    },//clear while logout
    startSeason: (url, newdata) => {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem(Define.USERINFO_LOCAL));

            axios.post(url, newdata, {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`
                },
            }).then((res) => {
                if (res.status === 200) {
                    const season_obj = res.data.response.new_object
                    //save into offline
                    localStorage.setItem(Define.SEASONINFO_LOCAL, JSON.stringify(season_obj));
                    //dispatch the global state
                    SeasonAction.dispatch({
                        type: Types.ADD_SEASON,
                        payload: season_obj//an object
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    },
    SwitchSeason: (season_obj) => {
        // http://localhost:2727/api/v1/switchseason/4/1
        //v1/switchseason/${seaon_old_ID}/${new_id}

        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem(Define.USERINFO_LOCAL));
            const new_id = season_obj.id
            const seaon_old_ID = Utils.getCurrentSeason().id;

            axios.put(`v1/switchseason/${seaon_old_ID}/${new_id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`
                },
            }).then((res) => {
                //console.log("my response ", res);
                if (res.status === 200) {
                    //update local storage
                    season_obj.active = 1;
                    localStorage.setItem(Define.SEASONINFO_LOCAL, JSON.stringify(season_obj));
                    //update the ui
                    SeasonAction.dispatch({
                        type: Types.SWITCH_SEASON,
                        payload: new_id
                    });
                    resolve({ message: res.data.message });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });


    },
    Clear: () => {
        //local storage change
        localStorage.removeItem(Define.SEASONINFO_LOCAL);
        //change global state
        SeasonAction.dispatch({ type: Types.CLEAR_SEASON });
    }
}

export default SeasonAction;
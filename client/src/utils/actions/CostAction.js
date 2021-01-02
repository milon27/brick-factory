import axios from 'axios';
import Types from './Types';
import Define from 'utils/helpers/Define';

/**
 * it is an object
 */
const CostAction = {
    dispatch: null,
    source: null,
    getInstance: (dispatch) => {
        CostAction.dispatch = dispatch;
        return CostAction;
    },
    getSource: () => {
        CostAction.source = axios.CancelToken.source();
        return CostAction.source;
    },
    //get all data without range without season
    //v1/get/${table}/
    getAll: async (table) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/get/${table}/`
                , {
                    cancelToken: CostAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                if (res.status === 200) {
                    const data = res.data.response;
                    //dispatch the global state
                    CostAction.dispatch({
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
    //get all data without range
    //v1/get/${table}/${season_id}
    getAllData: async (table, season_id) => {
        //console.log("my test season: ", season_id);
        return new Promise((resolve, reject) => {
            axios.get(`v1/get/${table}/${season_id}`
                , {
                    cancelToken: CostAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                if (res.status === 200) {
                    const data = res.data.response;
                    //dispatch the global state
                    CostAction.dispatch({
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
    //get paginate data 
    //v1/get/${table}/${season_id}/${page_no}
    getPaginateData: async (table, season_id, page_no) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/get/${table}/${season_id}/${page_no}`
                , {
                    cancelToken: CostAction.source.token
                }
            ).then(res => {
                const message = res.data.message;
                if (res.status === 200) {
                    const data = res.data.response;
                    //dispatch the global state
                    CostAction.dispatch({
                        type: Types.GET_ALL_DATA,
                        payload: data//an array
                    });
                    resolve({ message, data });
                } else {
                    reject({ message: message });
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
    //get all data in range(filter using transaction date)
    //`v1/get/${table}/transaction_date/${start}/${end}`
    getAllDataInRange: async (table, start, end) => {
        return new Promise((resolve, reject) => {
            //axios.get('v1/get/coal_cost_table')
            axios.get(`v1/get/${table}/transaction_date/${start}/${end}`
                , {
                    cancelToken: CostAction.source.token
                }
            )
                .then(res => {
                    const message = res.data.message;
                    if (res.status === 200) {
                        const data = res.data.response;
                        //dispatch the global state
                        CostAction.dispatch({
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
    //get all data with join (only two table)
    getAllJoinData: async (main_table, main_id, join_table, join_id, start, end) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/getjoin/${main_table}/${main_id}/${join_table}/${join_id}/transaction_date/${start}/${end}`
                , {
                    cancelToken: CostAction.source.token
                }
            )
                .then(res => {
                    const message = res.data.message;
                    if (res.status === 200) {
                        const data = res.data.response;
                        //dispatch the global state
                        CostAction.dispatch({
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
    //filer by season
    getByJoinData: async (main_table, main_id, join_table, join_id, s_id) => {
        return new Promise((resolve, reject) => {
            axios.get(`v1/getjoin/${main_table}/${main_id}/${join_table}/${join_id}/${s_id}`
                , {
                    cancelToken: CostAction.source.token
                }
            )
                .then(res => {
                    const message = res.data.message;
                    if (res.status === 200) {
                        const data = res.data.response;
                        //dispatch the global state
                        CostAction.dispatch({
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
    getBrickBuiltCost: (type, s_id) => {
        return new Promise((resolve, reject) => {
            //axios.get('v1/get/coal_cost_table')
            axios.get(`v1/brickbuiltcost/${type}/${s_id}`
                , {
                    cancelToken: CostAction.source.token
                }
            )
                .then(res => {
                    const message = res.data.message;
                    if (res.status === 200) {
                        const data = res.data.response;
                        //dispatch the global state
                        CostAction.dispatch({
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
    //add data
    addData: (url, newdata) => {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem(Define.USERINFO_LOCAL));
            newdata.created_by_uid = user.id;
            newdata.updated_by_uid = user.id;

            axios.post(url, newdata, {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`
                },
            }).then((res) => {
                if (res.status === 200) {
                    //dispatch the global state
                    CostAction.dispatch({
                        type: Types.ADD_DATA,
                        payload: res.data.response.new_object//an array
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
    updateData: (url, updateData, payload) => {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem(Define.USERINFO_LOCAL));
            updateData.updated_by_uid = user.id;

            axios.put(url, updateData, {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`
                },
            }).then((res) => {
                console.log("my response ", res);
                if (res.status === 200) {
                    //dispatch the global state
                    CostAction.dispatch({
                        type: Types.UPDATE_DATA,
                        payload: payload
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
    }

}
export default CostAction;

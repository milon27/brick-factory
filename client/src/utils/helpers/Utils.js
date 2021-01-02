import Define from './Define';

const Utils = {
    getCurrentSeason: () => {
        if (localStorage.getItem(Define.SEASONINFO_LOCAL) !== null) {
            return JSON.parse(localStorage.getItem(Define.SEASONINFO_LOCAL));
        } else {
            return {}
        }
    },
}

export default Utils;

const SET_POSITON = "SET_POSITON";
const SET_POSITON_NEW_LOAD = "SET_POSITON_NEW_LOAD";

export function actionSetPosition(position: any) {
    return {
        type: SET_POSITON,
        position,
    };
}
export function actionSetPositionNewLoad(status: any) {
    return {
        type: SET_POSITON_NEW_LOAD,
        new_load: status,
    };
}

const initialState = {
    position: [],
    new_load: true,
};

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_POSITON:
            return { ...state, position: action.position, new_load: false };

        case SET_POSITON_NEW_LOAD:
            return { ...state, new_load: action.new_load };
    }
    return state;
}

export default reducer;

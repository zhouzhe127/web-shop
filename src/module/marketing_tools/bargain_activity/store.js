import Vuex from 'vuex';
// import s from "src/manager/store";
let store = {
	state: {
		activityListChange: false,
		selectedActivity: null,
		selectedGoods: null,
	},
	getters: {
		getActivity: state => {
			return state.selectedActivity;
		},
		getGoods: state => {
			return state.selectedGoods;
		},

	},
	mutations: {
		selectActivity(state, activity) {
			state.selectedActivity = activity;
		},
		selectGoods(state, goods) {
			state.selectedGoods = goods;
		},
		createdActivity(state, virtualActivity) {
			state.selectedActivity = virtualActivity;
			state.activityListChange = true;
		}
	},
	// 其实可以不要，因为并用不到全局的store
	// modules: { 
	//   global: s
	// }
};
export default new Vuex.Store(store);
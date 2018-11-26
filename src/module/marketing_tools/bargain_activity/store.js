import Vuex from 'vuex';
// import s from "src/manager/store";
export let activityStore = {
	state: {
		activityListChange: false,
		selectedActivity: null,
		selectedActivityChange: false,
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
		},
		changeActivityList(state,bool){
			state.activityListChange = !!bool;
		},
		changeActivity(state,bool){
			state.selectedActivityChange = !!bool;
		}
	},
	// 其实可以不要，因为并用不到全局的store
	// modules: { 
	//   global: s
	// }
};
export default new Vuex.Store(activityStore);
/* eslint-disable */
import {
    s,
    w,
    b,
    p
} from "src/config/host_var";

export default {
    AssigntaskAdd: {
        url: s + "Assigntask/add",
        method:'post'
    },
    AssignGetlist:{
        url: s+ 'Assigntask/getList',
        method:'get'
    },
    AssigntaskUpdate:{
        url: s+'Assigntask/update',
        method:'post'
    },
    AssigntaskPublish:{
        url: s +'Assigntask/publish',
        method:'get'
    },
    AssigntaskGetDetail:{
        url:s +'Assigntask/get',
        method:'get'
    },
    getAssignError:{
        url:s +'/Assigntask/getAssignError',
        method:'get'
    }

}
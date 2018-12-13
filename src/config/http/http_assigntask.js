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
    }

}
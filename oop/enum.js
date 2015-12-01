/**
 * Created by james on 2015/12/1.
 */
var Status = {  // 定义枚举值
    finish : {
        name : "完成",
        val : 1
    },
    deal : {
        name : "处理中",
        val : 2
    },
    wait : {
        name : "等待",
        val : 3
    }
};

function Order () {
    this.status = null;
}
Order.prototype = {
    save : function() {
        console.log(this.status.val);
        console.log("I am saving...");
    }
};

var order = new Order();
order.status = Status.finish;
order.save();
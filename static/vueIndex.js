var todoStorage = {
    fetch: function (STORAGE_KEY) {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(function (todo, index) {
            todo.id = index;
        });
        // todoStorage.id = todos.length;
        return todos;
    },
    save: function (STORAGE_KEY,todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};
var items = todoStorage.fetch("todos-vue");//到localStorage中取数据
//实例化一个对象来实现过滤逻辑
var filters = {
    all: function (items) {
        return items;
    },
    finished: function (items) {
        return items.filter(function (item) {
            return item.isChecked;
        });
    },
    unfinished: function (items) {
        return items.filter(function (item) {
            return !item.isChecked;
        });
    }
};
var todoApp = new Vue({
    el: '#todoApp',
    data: {
        items:items,//直接从localstroage拿数据
        inputValue:'',
        visibility:'all',
        checkAll:false,
        editingIndex:-1
    },
    watch: {
        items:{
            handler: function () {
                todoStorage.save("todos-vue",this.items);//进行监听，添加监听模块
            },
            deep:true
        }
    },
    computed: {
        noCheckedLength: function () {
            return filters.unfinished(this.items).length;
        },
        filteredList: function () {
            //找到了过滤函数就返回过滤后的数据，如果没有则返回所有数据
            return filters[this.visibility] ? filters[this.visibility](items) : items;
        },
    },
    methods:{
        addTodo: function () {
            var len = this.inputValue.replace(/^\s+|\s+$/g,"").length;
            console.log(len);
            if(len>0){
                this.items.push({text: this.inputValue, isChecked: false});//注意看看这里的push的数据
                this.inputValue = '';
            }
        },
        removeTodo: function (todo) {
            this.items.splice(this.items.indexOf(todo), 1)
        },
        clearCompleted: function (todo) {
            //this.items = filters.unfinished(this.items);
            var Tlist = document.getElementsByClassName('toggle');
            console.log(Tlist);
            for(var i = Tlist.length-1; i >=0 ; i--){
                if(Tlist[i].checked == true){
                    this.items.splice(i,1);
                    Tlist[i].checked = false;
                }
            }
        },
        selectAll: function () {
            var checkbox = document.getElementsByClassName('toggle');
            this.checkAll = !this.checkAll;
            for (var i = 0; i < checkbox.length; i++) {
               if(this.checkAll){
                    this.items[i].isChecked = true;
               }else{
                    this.items[i].isChecked = false;
               }
            }
        },
        editItem: function (index){
            this.editingIndex = index;
        },
        saveItem: function () {
            this.editingIndex = -1;
        }
    }
});
function watchHashChange(){
    var hash = window.location.hash.slice(1);
    todoApp.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);

		
		